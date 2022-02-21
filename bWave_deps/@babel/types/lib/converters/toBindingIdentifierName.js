"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = toBindingIdentifierName;

import _toIdentifier from './toIdentifier';

function toBindingIdentifierName(name) {
  name = (0, _toIdentifier.default)(name);
  if (name === "eval" || name === "arguments") name = "_" + name;
  return name;
}