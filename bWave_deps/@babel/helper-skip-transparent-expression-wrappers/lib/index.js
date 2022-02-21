"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export { isTransparentExprWrapper, skipTransparentExprWrappers };

import _t from '@babel/types';

const {
  isParenthesizedExpression,
  isTSAsExpression,
  isTSNonNullExpression,
  isTSTypeAssertion,
  isTypeCastExpression
} = _t;

function isTransparentExprWrapper(node) {
  return isTSAsExpression(node) || isTSTypeAssertion(node) || isTSNonNullExpression(node) || isTypeCastExpression(node) || isParenthesizedExpression(node);
}

function skipTransparentExprWrappers(path) {
  while (isTransparentExprWrapper(path.node)) {
    path = path.get("expression");
  }

  return path;
}