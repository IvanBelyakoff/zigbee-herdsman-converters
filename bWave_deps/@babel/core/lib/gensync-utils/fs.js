"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const stat = exports.readFile = void 0;

function _fs() {
  const data = require("fs");

  _fs = function () {
    return data;
  };

  return data;
}

function _gensync() {
  const data = require("gensync");

  _gensync = function () {
    return data;
  };

  return data;
}

const readFile = _gensync()({
  sync: _fs().readFileSync,
  errback: _fs().readFile
});

const stat = _gensync()({
  sync: _fs().statSync,
  errback: _fs().stat
});

export { readFile, stat };