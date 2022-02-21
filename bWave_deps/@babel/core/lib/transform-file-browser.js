"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const transformFile = void 0;

const transformFile = function transformFile(filename, opts, callback) {
  if (typeof opts === "function") {
    callback = opts;
  }

  callback(new Error("Transforming files is not supported in browsers"), null);
};

export { transformFileSync, transformFileAsync, transformFile };

function transformFileSync() {
  throw new Error("Transforming files is not supported in browsers");
}

function transformFileAsync() {
  return Promise.reject(new Error("Transforming files is not supported in browsers"));
}