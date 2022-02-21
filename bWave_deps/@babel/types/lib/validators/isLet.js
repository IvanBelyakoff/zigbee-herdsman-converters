"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = isLet;

import _generated from './generated';
import _constants from '../constants';

function isLet(node) {
  return (0, _generated.isVariableDeclaration)(node) && (node.kind !== "var" || node[_constants.BLOCK_SCOPED_SYMBOL]);
}