"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';

function removePlugin(plugins, name) {
  const indices = [];
  plugins.forEach((plugin, i) => {
    const n = Array.isArray(plugin) ? plugin[0] : plugin;

    if (n === name) {
      indices.unshift(i);
    }
  });

  for (const i of indices) {
    plugins.splice(i, 1);
  }
}

var _default = (0, _helperPluginUtils.declare)((api, {
  isTSX
}) => {
  api.assertVersion(7);
  return {
    name: "syntax-typescript",

    manipulateOptions(opts, parserOpts) {
      const {
        plugins
      } = parserOpts;
      removePlugin(plugins, "flow");
      removePlugin(plugins, "jsx");
      parserOpts.plugins.push("typescript", "classProperties");
      {
        parserOpts.plugins.push("objectRestSpread");
      }

      if (isTSX) {
        parserOpts.plugins.push("jsx");
      }
    }

  };
});

export const default = _default;