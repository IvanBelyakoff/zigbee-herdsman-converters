"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = _default;

import _t from '@babel/types';

const {
  isAssignmentPattern,
  isRestElement
} = _t;

function _default(node) {
  const params = node.params;

  for (let i = 0; i < params.length; i++) {
    const param = params[i];

    if (isAssignmentPattern(param) || isRestElement(param)) {
      return i;
    }
  }

  return params.length;
}