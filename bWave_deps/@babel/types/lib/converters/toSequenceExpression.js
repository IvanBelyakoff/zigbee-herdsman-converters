"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = toSequenceExpression;

import _gatherSequenceExpressions from './gatherSequenceExpressions';

function toSequenceExpression(nodes, scope) {
  if (!(nodes != null && nodes.length)) return;
  const declars = [];
  const result = (0, _gatherSequenceExpressions.default)(nodes, scope, declars);
  if (!result) return;

  for (const declar of declars) {
    scope.push(declar);
  }

  return result;
}