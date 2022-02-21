"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _pluginSyntaxLogicalAssignmentOperators from '@babel/plugin-syntax-logical-assignment-operators';
import _core from '@babel/core';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "proposal-logical-assignment-operators",
    inherits: _pluginSyntaxLogicalAssignmentOperators.default,
    visitor: {
      AssignmentExpression(path) {
        const {
          node,
          scope
        } = path;
        const {
          operator,
          left,
          right
        } = node;
        const operatorTrunc = operator.slice(0, -1);

        if (!_core.types.LOGICAL_OPERATORS.includes(operatorTrunc)) {
          return;
        }

        const lhs = _core.types.cloneNode(left);

        if (_core.types.isMemberExpression(left)) {
          const {
            object,
            property,
            computed
          } = left;
          const memo = scope.maybeGenerateMemoised(object);

          if (memo) {
            left.object = memo;
            lhs.object = _core.types.assignmentExpression("=", _core.types.cloneNode(memo), object);
          }

          if (computed) {
            const memo = scope.maybeGenerateMemoised(property);

            if (memo) {
              left.property = memo;
              lhs.property = _core.types.assignmentExpression("=", _core.types.cloneNode(memo), property);
            }
          }
        }

        path.replaceWith(_core.types.logicalExpression(operatorTrunc, lhs, _core.types.assignmentExpression("=", left, right)));
      }

    }
  };
});

export const default = _default;