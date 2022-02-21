"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _core from '@babel/core';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-member-expression-literals",
    visitor: {
      MemberExpression: {
        exit({
          node
        }) {
          const prop = node.property;

          if (!node.computed && _core.types.isIdentifier(prop) && !_core.types.isValidES3Identifier(prop.name)) {
            node.property = _core.types.stringLiteral(prop.name);
            node.computed = true;
          }
        }

      }
    }
  };
});

export const default = _default;