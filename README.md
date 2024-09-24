A repo used to test https://github.com/nodejs/node/pull/51977

To run the tests:

```
$ wget https://raw.githubusercontent.com/wooorm/npm-esm-vs-cjs/main/data/2024-08-28.json -O type.json
$ npm install
$ # node install.js can be used to install only certain types of packages.
$ MODULE_TYPE=esm NODE_NO_WARNINGS=1 node --experimental-require-module try2.cjs
```
