"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = isCompatTag;

function isCompatTag(tagName) {
  return !!tagName && /^[a-z]/.test(tagName);
}