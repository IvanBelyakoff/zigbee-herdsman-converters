"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = buildMatchMemberExpression;

import _matchesPattern from './matchesPattern';

function buildMatchMemberExpression(match, allowPartial) {
  const parts = match.split(".");
  return member => (0, _matchesPattern.default)(member, parts, allowPartial);
}