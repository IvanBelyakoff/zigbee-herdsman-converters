"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = ensureBlock;

import _toBlock from './toBlock';

function ensureBlock(node, key = "body") {
  return node[key] = (0, _toBlock.default)(node[key], node);
}