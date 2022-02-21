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
    name: "transform-reserved-words",
    visitor: {
      "BindingIdentifier|ReferencedIdentifier"(path) {
        if (!_core.types.isValidES3Identifier(path.node.name)) {
          path.scope.rename(path.node.name);
        }
      }

    }
  };
});

export const default = _default;