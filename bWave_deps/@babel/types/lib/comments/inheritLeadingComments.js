"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = inheritLeadingComments;

import _inherit from '../utils/inherit';

function inheritLeadingComments(child, parent) {
  (0, _inherit.default)("leadingComments", child, parent);
}