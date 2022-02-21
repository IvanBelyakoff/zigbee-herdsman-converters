"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

class Hub {
  getCode() {}

  getScope() {}

  addHelper() {
    throw new Error("Helpers are not supported by the default hub.");
  }

  buildError(node, msg, Error = TypeError) {
    return new Error(msg);
  }

}

export const default = Hub;