"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = isBlockScoped;

import _generated from './generated';
import _isLet from './isLet';

function isBlockScoped(node) {
  return (0, _generated.isFunctionDeclaration)(node) || (0, _generated.isClassDeclaration)(node) || (0, _isLet.default)(node);
}