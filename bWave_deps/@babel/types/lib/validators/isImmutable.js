"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = isImmutable;

import _isType from './isType';
import _generated from './generated';

function isImmutable(node) {
  if ((0, _isType.default)(node.type, "Immutable")) return true;

  if ((0, _generated.isIdentifier)(node)) {
    if (node.name === "undefined") {
      return true;
    } else {
      return false;
    }
  }

  return false;
}