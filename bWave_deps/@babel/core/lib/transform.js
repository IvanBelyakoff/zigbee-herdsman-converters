"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const transformAsync = exports.transformSync = exports.transform = void 0;

function _gensync() {
  const data = require("gensync");

  _gensync = function () {
    return data;
  };

  return data;
}

import _config from './config';
import _transformation from './transformation';

const transformRunner = _gensync()(function* transform(code, opts) {
  const config = yield* (0, _config.default)(opts);
  if (config === null) return null;
  return yield* (0, _transformation.run)(config, code);
});

const transform = function transform(code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) return transformRunner.sync(code, opts);
  transformRunner.errback(code, opts, callback);
};

const transformSync = transformRunner.sync;
const transformAsync = transformRunner.async;
export { transform, transformSync, transformAsync };