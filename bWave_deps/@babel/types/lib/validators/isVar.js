"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = isVar;

import _generated from './generated';
import _constants from '../constants';

function isVar(node) {
  return (0, _generated.isVariableDeclaration)(node, {
    kind: "var"
  }) && !node[_constants.BLOCK_SCOPED_SYMBOL];
}