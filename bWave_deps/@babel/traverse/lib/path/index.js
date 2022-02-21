"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = exports.SHOULD_SKIP = exports.SHOULD_STOP = exports.REMOVED = void 0;

import virtualTypes from './lib/virtual-types';
import _debug from 'debug';
import _index from '../index';
import _scope from '../scope';
import _t from '@babel/types';

var t = _t;

import _cache from '../cache';
import _generator from '@babel/generator';
import NodePath_ancestry from './ancestry';
import NodePath_inference from './inference';
import NodePath_replacement from './replacement';
import NodePath_evaluation from './evaluation';
import NodePath_conversion from './conversion';
import NodePath_introspection from './introspection';
import NodePath_context from './context';
import NodePath_removal from './removal';
import NodePath_modification from './modification';
import NodePath_family from './family';
import NodePath_comments from './comments';

const {
  validate
} = _t;

const debug = _debug("babel");

const REMOVED = 1 << 0;
const SHOULD_STOP = 1 << 1;
const SHOULD_SKIP = 1 << 2;
export { REMOVED, SHOULD_STOP, SHOULD_SKIP };

class NodePath {
  constructor(hub, parent) {
    this.contexts = [];
    this.state = null;
    this.opts = null;
    this._traverseFlags = 0;
    this.skipKeys = null;
    this.parentPath = null;
    this.container = null;
    this.listKey = null;
    this.key = null;
    this.node = null;
    this.type = null;
    this.parent = parent;
    this.hub = hub;
    this.data = null;
    this.context = null;
    this.scope = null;
  }

  static get({
    hub,
    parentPath,
    parent,
    container,
    listKey,
    key
  }) {
    if (!hub && parentPath) {
      hub = parentPath.hub;
    }

    if (!parent) {
      throw new Error("To get a node path the parent needs to exist");
    }

    const targetNode = container[key];

    let paths = _cache.path.get(parent);

    if (!paths) {
      paths = new Map();

      _cache.path.set(parent, paths);
    }

    let path = paths.get(targetNode);

    if (!path) {
      path = new NodePath(hub, parent);
      if (targetNode) paths.set(targetNode, path);
    }

    path.setup(parentPath, container, listKey, key);
    return path;
  }

  getScope(scope) {
    return this.isScope() ? new _scope.default(this) : scope;
  }

  setData(key, val) {
    if (this.data == null) {
      this.data = Object.create(null);
    }

    return this.data[key] = val;
  }

  getData(key, def) {
    if (this.data == null) {
      this.data = Object.create(null);
    }

    let val = this.data[key];
    if (val === undefined && def !== undefined) val = this.data[key] = def;
    return val;
  }

  buildCodeFrameError(msg, Error = SyntaxError) {
    return this.hub.buildError(this.node, msg, Error);
  }

  traverse(visitor, state) {
    (0, _index.default)(this.node, visitor, this.scope, state, this);
  }

  set(key, node) {
    validate(this.node, key, node);
    this.node[key] = node;
  }

  getPathLocation() {
    const parts = [];
    let path = this;

    do {
      let key = path.key;
      if (path.inList) key = `${path.listKey}[${key}]`;
      parts.unshift(key);
    } while (path = path.parentPath);

    return parts.join(".");
  }

  debug(message) {
    if (!debug.enabled) return;
    debug(`${this.getPathLocation()} ${this.type}: ${message}`);
  }

  toString() {
    return (0, _generator.default)(this.node).code;
  }

  get inList() {
    return !!this.listKey;
  }

  set inList(inList) {
    if (!inList) {
      this.listKey = null;
    }
  }

  get parentKey() {
    return this.listKey || this.key;
  }

  get shouldSkip() {
    return !!(this._traverseFlags & SHOULD_SKIP);
  }

  set shouldSkip(v) {
    if (v) {
      this._traverseFlags |= SHOULD_SKIP;
    } else {
      this._traverseFlags &= ~SHOULD_SKIP;
    }
  }

  get shouldStop() {
    return !!(this._traverseFlags & SHOULD_STOP);
  }

  set shouldStop(v) {
    if (v) {
      this._traverseFlags |= SHOULD_STOP;
    } else {
      this._traverseFlags &= ~SHOULD_STOP;
    }
  }

  get removed() {
    return !!(this._traverseFlags & REMOVED);
  }

  set removed(v) {
    if (v) {
      this._traverseFlags |= REMOVED;
    } else {
      this._traverseFlags &= ~REMOVED;
    }
  }

}

Object.assign(NodePath.prototype, NodePath_ancestry, NodePath_inference, NodePath_replacement, NodePath_evaluation, NodePath_conversion, NodePath_introspection, NodePath_context, NodePath_removal, NodePath_modification, NodePath_family, NodePath_comments);

for (const type of t.TYPES) {
  const typeKey = `is${type}`;
  const fn = t[typeKey];

  NodePath.prototype[typeKey] = function (opts) {
    return fn(this.node, opts);
  };

  NodePath.prototype[`assert${type}`] = function (opts) {
    if (!fn(this.node, opts)) {
      throw new TypeError(`Expected node path of type ${type}`);
    }
  };
}

for (const type of Object.keys(virtualTypes)) {
  if (type[0] === "_") continue;
  if (t.TYPES.indexOf(type) < 0) t.TYPES.push(type);
  const virtualType = virtualTypes[type];

  NodePath.prototype[`is${type}`] = function (opts) {
    return virtualType.checkPath(this, opts);
  };
}

var _default = NodePath;
export const default = _default;