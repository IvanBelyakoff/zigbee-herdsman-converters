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
    name: "transform-property-literals",
    visitor: {
      ObjectProperty: {
        exit({
          node
        }) {
          const key = node.key;

          if (!node.computed && _core.types.isIdentifier(key) && !_core.types.isValidES3Identifier(key.name)) {
            node.key = _core.types.stringLiteral(key.name);
          }
        }

      }
    }
  };
});

export const default = _default;