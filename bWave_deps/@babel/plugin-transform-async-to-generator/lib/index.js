"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _helperRemapAsyncToGenerator from '@babel/helper-remap-async-to-generator';
import _helperModuleImports from '@babel/helper-module-imports';
import _core from '@babel/core';

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  api.assertVersion(7);
  const {
    method,
    module
  } = options;
  const noNewArrows = api.assumption("noNewArrows");

  if (method && module) {
    return {
      name: "transform-async-to-generator",
      visitor: {
        Function(path, state) {
          if (!path.node.async || path.node.generator) return;
          let wrapAsync = state.methodWrapper;

          if (wrapAsync) {
            wrapAsync = _core.types.cloneNode(wrapAsync);
          } else {
            wrapAsync = state.methodWrapper = (0, _helperModuleImports.addNamed)(path, method, module);
          }

          (0, _helperRemapAsyncToGenerator.default)(path, {
            wrapAsync
          }, noNewArrows);
        }

      }
    };
  }

  return {
    name: "transform-async-to-generator",
    visitor: {
      Function(path, state) {
        if (!path.node.async || path.node.generator) return;
        (0, _helperRemapAsyncToGenerator.default)(path, {
          wrapAsync: state.addHelper("asyncToGenerator")
        }, noNewArrows);
      }

    }
  };
});

export const default = _default;