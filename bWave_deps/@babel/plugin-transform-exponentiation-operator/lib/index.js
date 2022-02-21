"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _helperBuilderBinaryAssignmentOperatorVisitor from '@babel/helper-builder-binary-assignment-operator-visitor';
import _core from '@babel/core';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-exponentiation-operator",
    visitor: (0, _helperBuilderBinaryAssignmentOperatorVisitor.default)({
      operator: "**",

      build(left, right) {
        return _core.types.callExpression(_core.types.memberExpression(_core.types.identifier("Math"), _core.types.identifier("pow")), [left, right]);
      }

    })
  };
});

export const default = _default;