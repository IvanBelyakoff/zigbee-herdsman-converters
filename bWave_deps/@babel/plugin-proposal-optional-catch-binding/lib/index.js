"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _pluginSyntaxOptionalCatchBinding from '@babel/plugin-syntax-optional-catch-binding';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "proposal-optional-catch-binding",
    inherits: _pluginSyntaxOptionalCatchBinding.default,
    visitor: {
      CatchClause(path) {
        if (!path.node.param) {
          const uid = path.scope.generateUidIdentifier("unused");
          const paramPath = path.get("param");
          paramPath.replaceWith(uid);
        }
      }

    }
  };
});

export const default = _default;