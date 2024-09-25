'use strict';
import fs from 'node:fs';
import { Worker } from 'worker_threads';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const types = JSON.parse(fs.readFileSync('./type.json', 'utf-8'));
const pjson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const deps = Object.keys(pjson.dependencies);

const disallowlist = [ 'serve', 'quill', 'node-releases', 'jest-watch-typeahead', '@semantic-release/npm', 'zone.js', '@storybook/ui', 'bootstrap', '@storybook/testing-library' ];
const type = process.env.MODULE_TYPE || 'esm';
let packages = deps.filter(i => types[i] === type);
packages = packages.filter(i => !disallowlist.includes(i) && !i.includes('@types') && !i.includes('angular') && !i.includes('workbox'));

const failures = [];
const singleDefault = [];
const defaultAndMarker = [];
const defaultAndNamed= [];
const noDefault = [];

async function tryImport(p) {
    try {
      const result = await import(p);
      if (!result.default) { noDefault.push(p); return; }
      const keys = Object.keys(result);
      if (keys.length === 1) { singleDefault.push(p); return; }
      if (keys.length === 2 && result.__esModule) { defaultAndMarker.push(p); return; }
      defaultAndNamed.push(p);
    } catch (e) { failures.push({p, e: e.code||e.name})}
}

for (let i = 0; i < packages.length; ++i) {
  const p = packages[i];
    await tryImport(p);
}

console.log('tried', packages.length, type);
console.log('failures', failures.length);
console.log('singleDefault', singleDefault.length, (singleDefault.length/packages.length*100)+'%');
console.log('defaultAndMarker', defaultAndMarker.length, (defaultAndMarker.length/packages.length*100)+'%');
console.log('defaultAndNamed', defaultAndNamed.length, (defaultAndNamed.length/packages.length*100)+'%');
console.log('noDefault', noDefault.length, (noDefault.length/packages.length*100)+'%');
