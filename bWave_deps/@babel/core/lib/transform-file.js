"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const transformFileAsync = exports.transformFileSync = exports.transformFile = void 0;

function _gensync() {
  const data = require("gensync");

  _gensync = function () {
    return data;
  };

  return data;
}

import _config from './config';
import _transformation from './transformation';
import fs from './gensync-utils/fs';

({});

const transformFileRunner = _gensync()(function* (filename, opts) {
  const options = Object.assign({}, opts, {
    filename
  });
  const config = yield* (0, _config.default)(options);
  if (config === null) return null;
  const code = yield* fs.readFile(filename, "utf8");
  return yield* (0, _transformation.run)(config, code);
});

const transformFile = transformFileRunner.errback;
const transformFileSync = transformFileRunner.sync;
const transformFileAsync = transformFileRunner.async;
export { transformFile, transformFileSync, transformFileAsync };