"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = exports.program = exports.expression = exports.statements = exports.statement = exports.smart = void 0;

import formatters from './formatters';
import _builder from './builder';

const smart = (0, _builder.default)(formatters.smart);
const statement = (0, _builder.default)(formatters.statement);
const statements = (0, _builder.default)(formatters.statements);
const expression = (0, _builder.default)(formatters.expression);
const program = (0, _builder.default)(formatters.program);
export { smart, statement, statements, expression, program };

var _default = Object.assign(smart.bind(undefined), {
  smart,
  statement,
  statements,
  expression,
  program,
  ast: smart.ast
});

export const default = _default;