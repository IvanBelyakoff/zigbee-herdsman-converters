"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const scope = exports.path = void 0;
let path = new WeakMap();
let scope = new WeakMap();
export { clear, clearPath, clearScope, path, scope };

function clear() {
  clearPath();
  clearScope();
}

function clearPath() {
  export const path = path = new WeakMap();
}

function clearScope() {
  export const scope = scope = new WeakMap();
}