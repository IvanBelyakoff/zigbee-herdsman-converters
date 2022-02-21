"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = _default;

function _v() {
  const data = require("v8");

  _v = function () {
    return data;
  };

  return data;
}

import _cloneDeepBrowser from './clone-deep-browser';

function _default(value) {
  if (_v().deserialize && _v().serialize) {
    return _v().deserialize(_v().serialize(value));
  }

  return (0, _cloneDeepBrowser.default)(value);
}