"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _pluginSyntaxNumericSeparator from '@babel/plugin-syntax-numeric-separator';

function remover({
  node
}) {
  var _extra$raw;

  const {
    extra
  } = node;

  if (extra != null && (_extra$raw = extra.raw) != null && _extra$raw.includes("_")) {
    extra.raw = extra.raw.replace(/_/g, "");
  }
}

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "proposal-numeric-separator",
    inherits: _pluginSyntaxNumericSeparator.default,
    visitor: {
      NumericLiteral: remover,
      BigIntLiteral: remover
    }
  };
});

export const default = _default;