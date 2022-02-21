"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const transformFromAstAsync = exports.transformFromAstSync = exports.transformFromAst = void 0;

function _gensync() {
  const data = require("gensync");

  _gensync = function () {
    return data;
  };

  return data;
}

import _config from './config';
import _transformation from './transformation';

const transformFromAstRunner = _gensync()(function* (ast, code, opts) {
  const config = yield* (0, _config.default)(opts);
  if (config === null) return null;
  if (!ast) throw new Error("No AST given");
  return yield* (0, _transformation.run)(config, code, ast);
});

const transformFromAst = function transformFromAst(ast, code, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
    opts = undefined;
  }

  if (callback === undefined) {
    return transformFromAstRunner.sync(ast, code, opts);
  }

  transformFromAstRunner.errback(ast, code, opts, callback);
};

const transformFromAstSync = transformFromAstRunner.sync;
const transformFromAstAsync = transformFromAstRunner.async;
export { transformFromAst, transformFromAstSync, transformFromAstAsync };