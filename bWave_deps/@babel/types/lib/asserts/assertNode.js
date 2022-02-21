"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = assertNode;

import _isNode from '../validators/isNode';

function assertNode(node) {
  if (!(0, _isNode.default)(node)) {
    var _node$type;

    const type = (_node$type = node == null ? void 0 : node.type) != null ? _node$type : JSON.stringify(node);
    throw new TypeError(`Not a valid node of type "${type}"`);
  }
}