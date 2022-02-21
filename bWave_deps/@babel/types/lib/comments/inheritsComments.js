"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = inheritsComments;

import _inheritTrailingComments from './inheritTrailingComments';
import _inheritLeadingComments from './inheritLeadingComments';
import _inheritInnerComments from './inheritInnerComments';

function inheritsComments(child, parent) {
  (0, _inheritTrailingComments.default)(child, parent);
  (0, _inheritLeadingComments.default)(child, parent);
  (0, _inheritInnerComments.default)(child, parent);
  return child;
}