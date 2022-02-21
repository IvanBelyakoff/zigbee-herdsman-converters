"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const runtimeKey = exports.featuresKey = exports.FEATURES = void 0;
const FEATURES = Object.freeze({
  unicodeFlag: 1 << 0,
  dotAllFlag: 1 << 1,
  unicodePropertyEscape: 1 << 2,
  namedCaptureGroups: 1 << 3
});
const featuresKey = "@babel/plugin-regexp-features/featuresKey";
const runtimeKey = "@babel/plugin-regexp-features/runtimeKey";
export { enableFeature, hasFeature, FEATURES, featuresKey, runtimeKey };

function enableFeature(features, feature) {
  return features | feature;
}

function hasFeature(features, feature) {
  return !!(features & feature);
}