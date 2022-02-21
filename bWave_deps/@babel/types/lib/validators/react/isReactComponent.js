"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _buildMatchMemberExpression from '../buildMatchMemberExpression';

const isReactComponent = (0, _buildMatchMemberExpression.default)("React.Component");
var _default = isReactComponent;
export const default = _default;