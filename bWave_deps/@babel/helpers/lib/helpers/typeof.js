"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = _typeof;

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    export const default = _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    export const default = _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}