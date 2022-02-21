"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = _default;
const defaultExcludesForLooseMode = ["transform-typeof-symbol"];

function _default({
  loose
}) {
  return loose ? defaultExcludesForLooseMode : null;
}