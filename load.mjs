import { assert } from 'chai';
import chalk from 'chalk';
import { execa } from 'execa';
import { globby } from 'globby';
import mime from 'mime';
import fetch from 'node-fetch';
import inquirer from 'inquirer';
import once from '@tootallnate/once';
import open from 'open';
import { nanoid } from 'nanoid';
import ora from 'ora';
import { escape } from 'html-escaper';
// import { walk } from 'estree-walker';   // "exports" only have "import"
import meow from 'meow';
import timer from '@szmarczak/http-timer';
import { gateway4async, gateway4sync, gateway6async, gateway6sync } from "default-gateway";
import { unified } from 'unified';
import { VFile } from 'vfile';
import { groupBy } from 'lodash-es';
import {characterEntities} from 'character-entities'
import { xdgData, xdgConfig, xdgDataDirectories } from 'xdg-basedir';
import Configstore from 'configstore';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { definitions } from 'mdast-util-definitions';
import { inspect } from 'loupe';
import { parseEntities } from 'parse-entities';
import { trough } from 'trough';
import remarkParse from 'remark-parse'
