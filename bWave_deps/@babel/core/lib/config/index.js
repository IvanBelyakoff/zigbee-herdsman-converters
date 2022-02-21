"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _full.default;
  }
});
export const createConfigItemAsync = exports.createConfigItemSync = exports.loadOptionsAsync = exports.loadOptionsSync = exports.loadOptions = exports.loadPartialConfigAsync = exports.loadPartialConfigSync = exports.loadPartialConfig = void 0;

function _gensync() {
  const data = require("gensync");

  _gensync = function () {
    return data;
  };

  return data;
}

import _full from './full';
import _partial from './partial';
import _item from './item';

const loadOptionsRunner = _gensync()(function* (opts) {
  var _config$options;

  const config = yield* (0, _full.default)(opts);
  return (_config$options = config == null ? void 0 : config.options) != null ? _config$options : null;
});

const createConfigItemRunner = _gensync()(_item.createConfigItem);

const maybeErrback = runner => (opts, callback) => {
  if (callback === undefined && typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  return callback ? runner.errback(opts, callback) : runner.sync(opts);
};

const loadPartialConfig = maybeErrback(_partial.loadPartialConfig);
const loadPartialConfigSync = _partial.loadPartialConfig.sync;
const loadPartialConfigAsync = _partial.loadPartialConfig.async;
const loadOptions = maybeErrback(loadOptionsRunner);
const loadOptionsSync = loadOptionsRunner.sync;
const loadOptionsAsync = loadOptionsRunner.async;
const createConfigItemSync = createConfigItemRunner.sync;
const createConfigItemAsync = createConfigItemRunner.async;
export { createConfigItem, loadPartialConfig, loadPartialConfigSync, loadPartialConfigAsync, loadOptions, loadOptionsSync, loadOptionsAsync, createConfigItemSync, createConfigItemAsync };

function createConfigItem(target, options, callback) {
  if (callback !== undefined) {
    return createConfigItemRunner.errback(target, options, callback);
  } else if (typeof options === "function") {
    return createConfigItemRunner.errback(target, undefined, callback);
  } else {
    return createConfigItemRunner.sync(target, options);
  }
}