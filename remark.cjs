'use strict';

const { default: rehypeDocument } = require('rehype-document');
const { default: rehypeFormat } = require('rehype-format');
const { default: rehypeStringify } = require('rehype-stringify');
const { default: remarkParse } = require('remark-parse');
const { default: remarkRehype } = require('remark-rehype');
const {read} = require('to-vfile');
const {unified} = require('unified');
const {reporter} = require('vfile-reporter');

(async () => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(await read('./README.md'))

  console.error(reporter(file))
  console.log(String(file))
})();
