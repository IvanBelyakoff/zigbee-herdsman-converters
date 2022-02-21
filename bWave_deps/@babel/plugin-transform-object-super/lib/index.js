"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _helperReplaceSupers from '@babel/helper-replace-supers';
import _core from '@babel/core';

function replacePropertySuper(path, getObjectRef, file) {
  const replaceSupers = new _helperReplaceSupers.default({
    getObjectRef: getObjectRef,
    methodPath: path,
    file: file
  });
  replaceSupers.replace();
}

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-object-super",
    visitor: {
      ObjectExpression(path, state) {
        let objectRef;

        const getObjectRef = () => objectRef = objectRef || path.scope.generateUidIdentifier("obj");

        path.get("properties").forEach(propPath => {
          if (!propPath.isMethod()) return;
          replacePropertySuper(propPath, getObjectRef, state);
        });

        if (objectRef) {
          path.scope.push({
            id: _core.types.cloneNode(objectRef)
          });
          path.replaceWith(_core.types.assignmentExpression("=", _core.types.cloneNode(objectRef), path.node));
        }
      }

    }
  };
});

export const default = _default;