"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export { addDefault, addNamed, addNamespace, addSideEffect };
Object.defineProperty(exports, "ImportInjector", {
  enumerable: true,
  get: function () {
    return _importInjector.default;
  }
});
Object.defineProperty(exports, "isModule", {
  enumerable: true,
  get: function () {
    return _isModule.default;
  }
});

import _importInjector from './import-injector';
import _isModule from './is-module';

function addDefault(path, importedSource, opts) {
  return new _importInjector.default(path).addDefault(importedSource, opts);
}

function addNamed(path, name, importedSource, opts) {
  return new _importInjector.default(path).addNamed(name, importedSource, opts);
}

function addNamespace(path, importedSource, opts) {
  return new _importInjector.default(path).addNamespace(importedSource, opts);
}

function addSideEffect(path, importedSource, opts) {
  return new _importInjector.default(path).addSideEffect(importedSource, opts);
}