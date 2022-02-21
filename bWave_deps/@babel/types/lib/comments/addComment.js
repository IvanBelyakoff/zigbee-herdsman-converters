"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = addComment;

import _addComments from './addComments';

function addComment(node, type, content, line) {
  return (0, _addComments.default)(node, type, [{
    type: line ? "CommentLine" : "CommentBlock",
    value: content
  }]);
}