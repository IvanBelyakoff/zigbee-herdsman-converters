"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = is;

import _shallowEqual from '../utils/shallowEqual';
import _isType from './isType';
import _isPlaceholderType from './isPlaceholderType';
import _definitions from '../definitions';

function is(type, node, opts) {
  if (!node) return false;
  const matches = (0, _isType.default)(node.type, type);

  if (!matches) {
    if (!opts && node.type === "Placeholder" && type in _definitions.FLIPPED_ALIAS_KEYS) {
      return (0, _isPlaceholderType.default)(node.expectedNode, type);
    }

    return false;
  }

  if (typeof opts === "undefined") {
    return true;
  } else {
    return (0, _shallowEqual.default)(node, opts);
  }
}