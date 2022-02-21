"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = isNode;

import _definitions from '../definitions';

function isNode(node) {
  return !!(node && _definitions.VISITOR_KEYS[node.type]);
}