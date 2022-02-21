"use strict";

export const __esModule = true;
export { resolve, has, logMissing, laterLogMissing };

function resolve(dirname, moduleName, absoluteImports) {
  if (absoluteImports === false) return moduleName;
  throw new Error(`"absoluteImports" is not supported in bundles prepared for the browser.`);
} // eslint-disable-next-line no-unused-vars


function has(basedir, name) {
  return true;
} // eslint-disable-next-line no-unused-vars


function logMissing(missingDeps) {} // eslint-disable-next-line no-unused-vars


function laterLogMissing(missingDeps) {}