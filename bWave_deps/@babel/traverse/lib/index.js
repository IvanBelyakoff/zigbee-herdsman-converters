"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NodePath", {
  enumerable: true,
  get: function () {
    return _path.default;
  }
});
Object.defineProperty(exports, "Scope", {
  enumerable: true,
  get: function () {
    return _scope.default;
  }
});
Object.defineProperty(exports, "Hub", {
  enumerable: true,
  get: function () {
    return _hub.default;
  }
});
export const visitors = exports.default = void 0;

import _context from './context';
import visitors from './visitors';

export { visitors };

import _t from '@babel/types';
import cache from './cache';
import _path from './path';
import _scope from './scope';
import _hub from './hub';

const {
  VISITOR_KEYS,
  removeProperties,
  traverseFast
} = _t;

function traverse(parent, opts = {}, scope, state, parentPath) {
  if (!parent) return;

  if (!opts.noScope && !scope) {
    if (parent.type !== "Program" && parent.type !== "File") {
      throw new Error("You must pass a scope and parentPath unless traversing a Program/File. " + `Instead of that you tried to traverse a ${parent.type} node without ` + "passing scope and parentPath.");
    }
  }

  if (!VISITOR_KEYS[parent.type]) {
    return;
  }

  visitors.explode(opts);
  traverse.node(parent, opts, scope, state, parentPath);
}

var _default = traverse;
export const default = _default;
traverse.visitors = visitors;
traverse.verify = visitors.verify;
traverse.explode = visitors.explode;

traverse.cheap = function (node, enter) {
  return traverseFast(node, enter);
};

traverse.node = function (node, opts, scope, state, parentPath, skipKeys) {
  const keys = VISITOR_KEYS[node.type];
  if (!keys) return;
  const context = new _context.default(scope, opts, state, parentPath);

  for (const key of keys) {
    if (skipKeys && skipKeys[key]) continue;
    if (context.visit(node, key)) return;
  }
};

traverse.clearNode = function (node, opts) {
  removeProperties(node, opts);
  cache.path.delete(node);
};

traverse.removeProperties = function (tree, opts) {
  traverseFast(tree, traverse.clearNode, opts);
  return tree;
};

function hasDenylistedType(path, state) {
  if (path.node.type === state.type) {
    state.has = true;
    path.stop();
  }
}

traverse.hasType = function (tree, type, denylistTypes) {
  if (denylistTypes != null && denylistTypes.includes(tree.type)) return false;
  if (tree.type === type) return true;
  const state = {
    has: false,
    type: type
  };
  traverse(tree, {
    noScope: true,
    denylist: denylistTypes,
    enter: hasDenylistedType
  }, null, state);
  return state.has;
};

traverse.cache = cache;