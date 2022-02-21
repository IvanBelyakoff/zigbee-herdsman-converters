"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _core from '@babel/core';

function getName(key) {
  if (_core.types.isIdentifier(key)) {
    return key.name;
  }

  return key.value.toString();
}

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-duplicate-keys",
    visitor: {
      ObjectExpression(path) {
        const {
          node
        } = path;
        const plainProps = node.properties.filter(prop => !_core.types.isSpreadElement(prop) && !prop.computed);
        const alreadySeenData = Object.create(null);
        const alreadySeenGetters = Object.create(null);
        const alreadySeenSetters = Object.create(null);

        for (const prop of plainProps) {
          const name = getName(prop.key);
          let isDuplicate = false;

          switch (prop.kind) {
            case "get":
              if (alreadySeenData[name] || alreadySeenGetters[name]) {
                isDuplicate = true;
              }

              alreadySeenGetters[name] = true;
              break;

            case "set":
              if (alreadySeenData[name] || alreadySeenSetters[name]) {
                isDuplicate = true;
              }

              alreadySeenSetters[name] = true;
              break;

            default:
              if (alreadySeenData[name] || alreadySeenGetters[name] || alreadySeenSetters[name]) {
                isDuplicate = true;
              }

              alreadySeenData[name] = true;
          }

          if (isDuplicate) {
            prop.computed = true;
            prop.key = _core.types.stringLiteral(name);
          }
        }
      }

    }
  };
});

export const default = _default;