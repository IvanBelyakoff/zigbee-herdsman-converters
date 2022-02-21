"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = cloneWithoutLoc;

import _cloneNode from './cloneNode';

function cloneWithoutLoc(node) {
  return (0, _cloneNode.default)(node, false, true);
}