"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _pluginSyntaxJsonStrings from '@babel/plugin-syntax-json-strings';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  const regex = /(\\*)([\u2028\u2029])/g;

  function replace(match, escapes, separator) {
    const isEscaped = escapes.length % 2 === 1;
    if (isEscaped) return match;
    return `${escapes}\\u${separator.charCodeAt(0).toString(16)}`;
  }

  return {
    name: "proposal-json-strings",
    inherits: _pluginSyntaxJsonStrings.default,
    visitor: {
      "DirectiveLiteral|StringLiteral"({
        node
      }) {
        const {
          extra
        } = node;
        if (!(extra != null && extra.raw)) return;
        extra.raw = extra.raw.replace(regex, replace);
      }

    }
  };
});

export const default = _default;