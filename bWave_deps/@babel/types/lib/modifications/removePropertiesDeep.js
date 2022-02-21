"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = removePropertiesDeep;

import _traverseFast from '../traverse/traverseFast';
import _removeProperties from './removeProperties';

function removePropertiesDeep(tree, opts) {
  (0, _traverseFast.default)(tree, _removeProperties.default, opts);
  return tree;
}