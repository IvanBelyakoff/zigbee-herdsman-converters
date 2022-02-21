"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = cloneDeep;

import _cloneNode from './cloneNode';

function cloneDeep(node) {
  return (0, _cloneNode.default)(node);
}