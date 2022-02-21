"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export { getEnv };

function getEnv(defaultValue = "development") {
  return process.env.BABEL_ENV || process.env.NODE_ENV || defaultValue;
}