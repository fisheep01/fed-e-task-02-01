#!/usr/bin/env node
'use strict';
const meow = require('meow');
const n = require('./');

const cli = meow(`
Usage
  $ n [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ n
  unicorns
  $ n rainbows
  unicorns & rainbows
`);
