"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperCreateRegexpFeaturesPlugin from '@babel/helper-create-regexp-features-plugin';
import _helperPluginUtils from '@babel/helper-plugin-utils';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return (0, _helperCreateRegexpFeaturesPlugin.createRegExpFeaturePlugin)({
    name: "transform-dotall-regex",
    feature: "dotAllFlag"
  });
});

export const default = _default;