"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = isSpecifierDefault;

import _generated from './generated';

function isSpecifierDefault(specifier) {
  return (0, _generated.isImportDefaultSpecifier)(specifier) || (0, _generated.isIdentifier)(specifier.imported || specifier.exported, {
    name: "default"
  });
}