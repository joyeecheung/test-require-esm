'use strict';
const babel = require("@babel/core");
console.log(babel.transformSync("foo;", {
  configFile: false,
  plugins: [["./my-plugin.js", {}]]
}));