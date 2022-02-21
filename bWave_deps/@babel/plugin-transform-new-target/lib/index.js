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
    name: "transform-new-target",
    visitor: {
      MetaProperty(path) {
        const meta = path.get("meta");
        const property = path.get("property");
        const {
          scope
        } = path;

        if (meta.isIdentifier({
          name: "new"
        }) && property.isIdentifier({
          name: "target"
        })) {
          const func = path.findParent(path => {
            if (path.isClass()) return true;

            if (path.isFunction() && !path.isArrowFunctionExpression()) {
              if (path.isClassMethod({
                kind: "constructor"
              })) {
                return false;
              }

              return true;
            }

            return false;
          });

          if (!func) {
            throw path.buildCodeFrameError("new.target must be under a (non-arrow) function or a class.");
          }

          const {
            node
          } = func;

          if (!node.id) {
            if (func.isMethod()) {
              path.replaceWith(scope.buildUndefinedNode());
              return;
            }

            node.id = scope.generateUidIdentifier("target");
          }

          const constructor = _core.types.memberExpression(_core.types.thisExpression(), _core.types.identifier("constructor"));

          if (func.isClass()) {
            path.replaceWith(constructor);
            return;
          }

          path.replaceWith(_core.types.conditionalExpression(_core.types.binaryExpression("instanceof", _core.types.thisExpression(), _core.types.cloneNode(node.id)), constructor, scope.buildUndefinedNode()));
        }
      }

    }
  };
});

export const default = _default;