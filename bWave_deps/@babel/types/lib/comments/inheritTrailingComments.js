"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = inheritTrailingComments;

import _inherit from '../utils/inherit';

function inheritTrailingComments(child, parent) {
  (0, _inherit.default)("trailingComments", child, parent);
}