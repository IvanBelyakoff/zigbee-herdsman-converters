#!/usr/bin/env node
"use strict";

import _options from './options';
import _dir from './dir';
import _file from './file';

const opts = (0, _options.default)(process.argv);

if (opts) {
  const fn = opts.cliOptions.outDir ? _dir.default : _file.default;
  fn(opts).catch(err => {
    console.error(err);
    process.exitCode = 1;
  });
} else {
  process.exitCode = 2;
}