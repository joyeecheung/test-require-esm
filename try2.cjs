'use strict';
const types = require('./type.json');
const pjson = require('./package.json');
const { Worker } = require('worker_threads');
const deps = Object.keys(pjson.dependencies);

const disallowlist = [ 'serve', 'quill', 'node-releases', 'jest-watch-typeahead', '@semantic-release/npm', 'zone.js' ];
const type = process.env.MODULE_TYPE || 'esm';
const packages = deps.filter(i => types[i] === type && !disallowlist.includes(i) && !i.includes('@types') && !i.includes('angular'));
const failures = [];
const passed = [];
for (let i = 0; i < packages.length; ++i) {
  const p = packages[i];
  try {
    require(p);
    passed.push(p)
  } catch(e) {
    failures.push({p, e});
  }
}

const groups = {};
for (const {p, e} of failures) {
  groups[e.code || e.name] ||= [];
  groups[e.code || e.name].push(p);
}

let counter = 0;
const retried = {};
const toRetry = failures.filter(i => i.e.code !== 'ERR_REQUIRE_ASYNC_MODULE');
const toFinish = new Set(toRetry.map(i => i.p));

function replace(p, oldKey, newKey) {
  retried[p] = `${oldKey} => ${newKey}`;
  groups[oldKey] = groups[oldKey].filter(i => i !== p);  // Remove it
  groups[newKey] ||= [];
  groups[newKey].push(p);
}

function checkAndLog(p) {
    toFinish.delete(p);
    if (toFinish.size === 0) {
      console.log(`Tried ${packages.length} ${type} packages, failed ${failures.length}`);
      console.log(groups);
      console.log('Retried');
      console.log(retried);
      console.log(passed.length, 'can be required');
    }
}
for (const { p, e } of toRetry) {
  const worker = new Worker(
    `try { require("${p}") } catch(e) { console.log(JSON.stringify({p: "${p}", e: e.code || e.name})) }`,
    { eval: true, stdout: true, }
  );
  const key = e.code || e.name;
  worker.on('error', (e) => {
    replace(p, key, e.code || e.name);
    checkAndLog(p);
  });
  worker.on('exit', () => {
    const stdout = worker.stdout.read();
    if (stdout) {
      const result = JSON.parse(stdout);
      if (p === result.p) {
        if (result.e !== key) {
          replace(p, key, result.e);
        }
      }
    } else {
      groups[key] = groups[key].filter(i => i !== p);  // Remove it
      retried[p] = `${key} => success`;
      passed.push(p);
    }
    checkAndLog(p);
  });
}
