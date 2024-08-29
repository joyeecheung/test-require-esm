'use strict';
const types = require('./type.json');
const pjson = require('./package.json');
const deps = Object.keys(pjson.dependencies);

const disallowlist = [ '@types/html-minifier-terser', 'node-releases', 'jest-watch-typeahead', '@semantic-release/npm' ];
const esm = deps.filter(i => types[i] === 'esm' && !disallowlist.includes(i));
const failures = [];
const passed = [];
for (let i = 0; i < esm.length; ++i) {
  const p = esm[i];
  try {
    require(p);
    passed.push(p)
  } catch(e) {
    failures.push({p, e});
  }
}

const groups = {};
for (const {p, e} of failures) {
  groups[e.code] ||= [];
  groups[e.code].push(p);
}
console.log(`Tried ${esm.length} esm packages, failed ${failures.length}`);
console.log(groups);
console.log(passed.length, 'can be required');
