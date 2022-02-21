"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "syntax-optional-catch-binding",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push("optionalCatchBinding");
    }

  };
});

export const default = _default;