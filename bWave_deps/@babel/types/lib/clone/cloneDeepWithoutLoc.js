"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = cloneDeepWithoutLoc;

import _cloneNode from './cloneNode';

function cloneDeepWithoutLoc(node) {
  return (0, _cloneNode.default)(node, true, true);
}