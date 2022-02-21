"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _helperAnnotateAsPure from '@babel/helper-annotate-as-pure';
import _helperFunctionName from '@babel/helper-function-name';
import _helperSplitExportDeclaration from '@babel/helper-split-export-declaration';
import _core from '@babel/core';
import _globals from 'globals';
import _transformClass from './transformClass';

const getBuiltinClasses = category => Object.keys(_globals[category]).filter(name => /^[A-Z]/.test(name));

const builtinClasses = new Set([...getBuiltinClasses("builtin"), ...getBuiltinClasses("browser")]);

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  var _api$assumption, _api$assumption2, _api$assumption3, _api$assumption4;

  api.assertVersion(7);
  const {
    loose
  } = options;
  const setClassMethods = (_api$assumption = api.assumption("setClassMethods")) != null ? _api$assumption : options.loose;
  const constantSuper = (_api$assumption2 = api.assumption("constantSuper")) != null ? _api$assumption2 : options.loose;
  const superIsCallableConstructor = (_api$assumption3 = api.assumption("superIsCallableConstructor")) != null ? _api$assumption3 : options.loose;
  const noClassCalls = (_api$assumption4 = api.assumption("noClassCalls")) != null ? _api$assumption4 : options.loose;
  const VISITED = Symbol();
  return {
    name: "transform-classes",
    visitor: {
      ExportDefaultDeclaration(path) {
        if (!path.get("declaration").isClassDeclaration()) return;
        (0, _helperSplitExportDeclaration.default)(path);
      },

      ClassDeclaration(path) {
        const {
          node
        } = path;
        const ref = node.id || path.scope.generateUidIdentifier("class");
        path.replaceWith(_core.types.variableDeclaration("let", [_core.types.variableDeclarator(ref, _core.types.toExpression(node))]));
      },

      ClassExpression(path, state) {
        const {
          node
        } = path;
        if (node[VISITED]) return;
        const inferred = (0, _helperFunctionName.default)(path);

        if (inferred && inferred !== node) {
          path.replaceWith(inferred);
          return;
        }

        node[VISITED] = true;
        path.replaceWith((0, _transformClass.default)(path, state.file, builtinClasses, loose, {
          setClassMethods,
          constantSuper,
          superIsCallableConstructor,
          noClassCalls
        }));

        if (path.isCallExpression()) {
          (0, _helperAnnotateAsPure.default)(path);
          const callee = path.get("callee");

          if (callee.isArrowFunctionExpression()) {
            callee.arrowFunctionToExpression();
          }
        }
      }

    }
  };
});

export const default = _default;