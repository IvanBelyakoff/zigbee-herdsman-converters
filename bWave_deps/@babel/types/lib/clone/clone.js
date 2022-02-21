"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = clone;

import _cloneNode from './cloneNode';

function clone(node) {
  return (0, _cloneNode.default)(node, false);
}