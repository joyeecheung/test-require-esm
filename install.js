import {npmHighImpact} from 'npm-high-impact';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';

const disallow = ['fsevents'];
const pjson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const types = JSON.parse(fs.readFileSync('./type.json', 'utf8'));
const deps = pjson.dependencies || {};
const installed = {};
const type = process.env.MODULE_TYPE || 'esm';
const list = npmHighImpact.slice(0, 5000).filter(
  p => types[p] === type && (deps[p] === '*' || !deps[p]) && !disallow.includes(p)
);

console.log(list.length, `${type} packages to install`);
const batch = 10;
for (let i = 0; i < list.length; i += batch) {
  const toInstall = [];
	for (let j = 0; j < batch; ++j) {
		const p = list[i + j];
    toInstall.push(p);
  }

	if (toInstall.length > 0) {
		let installed = false;
		try {
        const packages = toInstall.join(' ');
			  console.log(`${i}...${i + batch} npm install --save ${packages}`);
  			const { stdout } = spawnSync('npm', ['install', '--save', ...toInstall]);
  			console.log(stdout.toString());
  			installed = true;
		} catch(e) {
			console.log('failed to install', toInstall.join(' '), e);
		}
	}
}
