"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _helperRemapAsyncToGenerator from '@babel/helper-remap-async-to-generator';
import _pluginSyntaxAsyncGenerators from '@babel/plugin-syntax-async-generators';
import _core from '@babel/core';
import _forAwait from './for-await';

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  const yieldStarVisitor = {
    Function(path) {
      path.skip();
    },

    YieldExpression({
      node
    }, state) {
      if (!node.delegate) return;
      const callee = state.addHelper("asyncGeneratorDelegate");
      node.argument = _core.types.callExpression(callee, [_core.types.callExpression(state.addHelper("asyncIterator"), [node.argument]), state.addHelper("awaitAsyncGenerator")]);
    }

  };
  const forAwaitVisitor = {
    Function(path) {
      path.skip();
    },

    ForOfStatement(path, {
      file
    }) {
      const {
        node
      } = path;
      if (!node.await) return;
      const build = (0, _forAwait.default)(path, {
        getAsyncIterator: file.addHelper("asyncIterator")
      });
      const {
        declar,
        loop
      } = build;
      const block = loop.body;
      path.ensureBlock();

      if (declar) {
        block.body.push(declar);
      }

      block.body.push(...node.body.body);

      _core.types.inherits(loop, node);

      _core.types.inherits(loop.body, node.body);

      if (build.replaceParent) {
        path.parentPath.replaceWithMultiple(build.node);
      } else {
        path.replaceWithMultiple(build.node);
      }
    }

  };
  const visitor = {
    Function(path, state) {
      if (!path.node.async) return;
      path.traverse(forAwaitVisitor, state);
      if (!path.node.generator) return;
      path.traverse(yieldStarVisitor, state);
      (0, _helperRemapAsyncToGenerator.default)(path, {
        wrapAsync: state.addHelper("wrapAsyncGenerator"),
        wrapAwait: state.addHelper("awaitAsyncGenerator")
      });
    }

  };
  return {
    name: "proposal-async-generator-functions",
    inherits: _pluginSyntaxAsyncGenerators.default,
    visitor: {
      Program(path, state) {
        path.traverse(visitor, state);
      }

    }
  };
});

export const default = _default;