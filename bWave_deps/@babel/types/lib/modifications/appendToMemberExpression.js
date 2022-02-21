"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = appendToMemberExpression;

import _generated from '../builders/generated';

function appendToMemberExpression(member, append, computed = false) {
  member.object = (0, _generated.memberExpression)(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}