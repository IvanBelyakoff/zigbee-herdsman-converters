"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _getBindingIdentifiers from './getBindingIdentifiers';

var _default = getOuterBindingIdentifiers;
export const default = _default;

function getOuterBindingIdentifiers(node, duplicates) {
  return (0, _getBindingIdentifiers.default)(node, duplicates, true);
}