"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _helperFunctionName from '@babel/helper-function-name';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-function-name",
    visitor: {
      FunctionExpression: {
        exit(path) {
          if (path.key !== "value" && !path.parentPath.isObjectProperty()) {
            const replacement = (0, _helperFunctionName.default)(path);
            if (replacement) path.replaceWith(replacement);
          }
        }

      },

      ObjectProperty(path) {
        const value = path.get("value");

        if (value.isFunction()) {
          const newNode = (0, _helperFunctionName.default)(value);
          if (newNode) value.replaceWith(newNode);
        }
      }

    }
  };
});

export const default = _default;