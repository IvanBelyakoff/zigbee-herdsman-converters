"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = _default;

import _helperExplodeAssignableExpression from '@babel/helper-explode-assignable-expression';
import _t from '@babel/types';

const {
  assignmentExpression,
  sequenceExpression
} = _t;

function _default(opts) {
  const {
    build,
    operator
  } = opts;
  return {
    AssignmentExpression(path) {
      const {
        node,
        scope
      } = path;
      if (node.operator !== operator + "=") return;
      const nodes = [];
      const exploded = (0, _helperExplodeAssignableExpression.default)(node.left, nodes, this, scope);
      nodes.push(assignmentExpression("=", exploded.ref, build(exploded.uid, node.right)));
      path.replaceWith(sequenceExpression(nodes));
    },

    BinaryExpression(path) {
      const {
        node
      } = path;

      if (node.operator === operator) {
        path.replaceWith(build(node.left, node.right));
      }
    }

  };
}