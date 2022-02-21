"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = rewriteThis;

import _helperReplaceSupers from '@babel/helper-replace-supers';
import _traverse from '@babel/traverse';
import _t from '@babel/types';

const {
  numericLiteral,
  unaryExpression
} = _t;

function rewriteThis(programPath) {
  (0, _traverse.default)(programPath.node, Object.assign({}, rewriteThisVisitor, {
    noScope: true
  }));
}

const rewriteThisVisitor = _traverse.default.visitors.merge([_helperReplaceSupers.environmentVisitor, {
  ThisExpression(path) {
    path.replaceWith(unaryExpression("void", numericLiteral(0), true));
  }

}]);