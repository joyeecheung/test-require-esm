
'use strict';

const { register } = require('ts-node');
const { RegExpParser } = require('@eslint-community/regexpp');
const generator = require('babel-plugin-polyfill-regenerator');
const { __classPrivateFieldGet } = require('tslib');
const fs = require('fs-extra');
const releases = require('node-releases/data/processed/envs.json');
const { isCancel, AxiosError } = require('axios');
const { parse } = require('parse5');
const { escape } = require('html-escaper');
const structuredClone = require('@ungap/structured-clone');
const hash = require('@emotion/hash');
const createCache = require('@emotion/cache');
const { StyleSheet } = require('@emotion/sheet');
const weakMemoize = require('@emotion/weak-memoize');
const { _jsx } = require('@swc/helpers');
const { platform } = require('@floating-ui/dom');
const { cssDeclarationSorter } = require('css-declaration-sorter');
const { autoPlacement } = require("@floating-ui/core");
const { marked } = require('marked');
const { createStore, applyMiddleware } = require('redux');
const Router = require('react-easy-router');
const adaptor = require('parse5-htmlparser2-tree-adapter');
const { parse, stringify } = require('@adobe/css-tools');
const { getTsconfig } = require('get-tsconfig');
