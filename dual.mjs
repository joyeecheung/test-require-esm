'use strict';

import { register } from 'ts-node';
import { RegExpParser } from '@eslint-community/regexpp';
import generator from 'babel-plugin-polyfill-regenerator';
import { __classPrivateFieldGet } from 'tslib';
import fs from 'fs-extra';
import releases from 'node-releases/data/processed/envs.json' with { type: "json" };
import { isCancel, AxiosError } from 'axios';
import { parse } from 'parse5';
import { escape } from 'html-escaper';
import structuredClone from '@ungap/structured-clone';
import hash from '@emotion/hash';
import createCache from '@emotion/cache';
import { StyleSheet } from '@emotion/sheet';
import weakMemoize from '@emotion/weak-memoize';
import { _jsx } from '@swc/helpers';
import { platform } from '@floating-ui/dom';
import { cssDeclarationSorter } from 'css-declaration-sorter';
import { autoPlacement } from "@floating-ui/core";
import { marked } from 'marked';
import { createStore, applyMiddleware } from 'redux';
import Router from 'react-easy-router';
import { adapter } from 'parse5-htmlparser2-tree-adapter';
import { stringify } from '@adobe/css-tools'
import { getTsconfig } from 'get-tsconfig'
import { Trie } from '@wry/trie';
import { Slot } from '@wry/context';
import { spy } from 'tinyspy';

// d3-array: browser..
