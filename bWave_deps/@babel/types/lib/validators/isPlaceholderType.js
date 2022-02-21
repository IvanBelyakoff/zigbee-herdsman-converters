"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = isPlaceholderType;

import _definitions from '../definitions';

function isPlaceholderType(placeholderType, targetType) {
  if (placeholderType === targetType) return true;
  const aliases = _definitions.PLACEHOLDERS_ALIAS[placeholderType];

  if (aliases) {
    for (const alias of aliases) {
      if (targetType === alias) return true;
    }
  }

  return false;
}