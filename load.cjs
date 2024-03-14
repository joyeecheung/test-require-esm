'use strict';
const { assert } = require('chai');
const { default: chalk } = require('chalk');
const { execa } = require('execa');
const { globby } = require('globby');
const { default: mime } = require('mime');
const { default: fetch } = require('node-fetch');
const { default: inquirer } = require('inquirer');
const { default: once } = require('@tootallnate/once');
const { default: open } = require('open');
const { nanoid } = require('nanoid');
const { default: ora } = require('ora');
const { escape } = require('html-escaper');
// const { walk } = require('estree-walker');  // "exports" only have "import"
const { default: meow } = require('meow');
const { default: timer } = require('@szmarczak/http-timer');
const { gateway4async, gateway4sync, gateway6async, gateway6sync } = require('default-gateway');
const { unified } = require('unified');
const { VFile } = require('vfile');
const { groupBy } = require('lodash-es');
const { characterEntities } = require('character-entities');
const { xdgData, xdgConfig, xdgDataDirectories } = require('xdg-basedir');
const { default: Configstore } = require('configstore');
const { fromMarkdown } = require('mdast-util-from-markdown');
const { definitions} = require('mdast-util-definitions');
const { inspect } = require('loupe');
const { parseEntities } = require('parse-entities');
const { trough } = require('trough');
const { default: remarkParse } = require('remark-parse');
