"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = prependToMemberExpression;

import _generated from '../builders/generated';

function prependToMemberExpression(member, prepend) {
  member.object = (0, _generated.memberExpression)(prepend, member.object);
  return member;
}