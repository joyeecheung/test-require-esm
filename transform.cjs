'use strict';
const babel = require("@babel/core");
console.log(babel.transformSync("foo;", {
  configFile: false,
  plugins: [["babel-plugin-polyfill-corejs3", { method: "usage-global" }]],
}));
