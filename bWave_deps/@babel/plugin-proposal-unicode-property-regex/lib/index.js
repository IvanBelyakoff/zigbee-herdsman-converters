"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperCreateRegexpFeaturesPlugin from '@babel/helper-create-regexp-features-plugin';
import _helperPluginUtils from '@babel/helper-plugin-utils';

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  api.assertVersion(7);
  const {
    useUnicodeFlag = true
  } = options;

  if (typeof useUnicodeFlag !== "boolean") {
    throw new Error(".useUnicodeFlag must be a boolean, or undefined");
  }

  return (0, _helperCreateRegexpFeaturesPlugin.createRegExpFeaturePlugin)({
    name: "proposal-unicode-property-regex",
    feature: "unicodePropertyEscape",
    options: {
      useUnicodeFlag
    }
  });
});

export const default = _default;