"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = inherit;

function inherit(key, child, parent) {
  if (child && parent) {
    child[key] = Array.from(new Set([].concat(child[key], parent[key]).filter(Boolean)));
  }
}