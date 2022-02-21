"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _pluginSyntaxNullishCoalescingOperator from '@babel/plugin-syntax-nullish-coalescing-operator';
import _core from '@babel/core';

var _default = (0, _helperPluginUtils.declare)((api, {
  loose = false
}) => {
  var _api$assumption;

  api.assertVersion(7);
  const noDocumentAll = (_api$assumption = api.assumption("noDocumentAll")) != null ? _api$assumption : loose;
  return {
    name: "proposal-nullish-coalescing-operator",
    inherits: _pluginSyntaxNullishCoalescingOperator.default,
    visitor: {
      LogicalExpression(path) {
        const {
          node,
          scope
        } = path;

        if (node.operator !== "??") {
          return;
        }

        let ref;
        let assignment;

        if (scope.isStatic(node.left)) {
          ref = node.left;
          assignment = _core.types.cloneNode(node.left);
        } else if (scope.path.isPattern()) {
          path.replaceWith(_core.template.ast`(() => ${path.node})()`);
          return;
        } else {
          ref = scope.generateUidIdentifierBasedOnNode(node.left);
          scope.push({
            id: _core.types.cloneNode(ref)
          });
          assignment = _core.types.assignmentExpression("=", ref, node.left);
        }

        path.replaceWith(_core.types.conditionalExpression(noDocumentAll ? _core.types.binaryExpression("!=", assignment, _core.types.nullLiteral()) : _core.types.logicalExpression("&&", _core.types.binaryExpression("!==", assignment, _core.types.nullLiteral()), _core.types.binaryExpression("!==", _core.types.cloneNode(ref), scope.buildUndefinedNode())), _core.types.cloneNode(ref), node.right));
      }

    }
  };
});

export const default = _default;