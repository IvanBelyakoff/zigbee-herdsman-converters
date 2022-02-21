"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "syntax-logical-assignment-operators",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("logicalAssignment");
    }

  };
});

export const default = _default;