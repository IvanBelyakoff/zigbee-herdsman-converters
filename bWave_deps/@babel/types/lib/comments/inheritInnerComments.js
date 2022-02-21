"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = inheritInnerComments;

import _inherit from '../utils/inherit';

function inheritInnerComments(child, parent) {
  (0, _inherit.default)("innerComments", child, parent);
}