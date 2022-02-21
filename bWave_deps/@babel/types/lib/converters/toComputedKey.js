"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = toComputedKey;

import _generated from '../validators/generated';
import _generated2 from '../builders/generated';

function toComputedKey(node, key = node.key || node.property) {
  if (!node.computed && (0, _generated.isIdentifier)(key)) key = (0, _generated2.stringLiteral)(key.name);
  return key;
}