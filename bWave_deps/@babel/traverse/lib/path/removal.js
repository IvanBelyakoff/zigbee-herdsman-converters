"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export { remove, _removeFromScope, _callRemovalHooks, _remove, _markRemoved, _assertUnremoved };

import _removalHooks from './lib/removal-hooks';
import _cache from '../cache';
import _index from './index';

function remove() {
  var _this$opts;

  this._assertUnremoved();

  this.resync();

  if (!((_this$opts = this.opts) != null && _this$opts.noScope)) {
    this._removeFromScope();
  }

  if (this._callRemovalHooks()) {
    this._markRemoved();

    return;
  }

  this.shareCommentsWithSiblings();

  this._remove();

  this._markRemoved();
}

function _removeFromScope() {
  const bindings = this.getBindingIdentifiers();
  Object.keys(bindings).forEach(name => this.scope.removeBinding(name));
}

function _callRemovalHooks() {
  for (const fn of _removalHooks.hooks) {
    if (fn(this, this.parentPath)) return true;
  }
}

function _remove() {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key, 1);
    this.updateSiblingKeys(this.key, -1);
  } else {
    this._replaceWith(null);
  }
}

function _markRemoved() {
  this._traverseFlags |= _index.SHOULD_SKIP | _index.REMOVED;
  if (this.parent) _cache.path.get(this.parent).delete(this.node);
  this.node = null;
}

function _assertUnremoved() {
  if (this.removed) {
    throw this.buildCodeFrameError("NodePath has been removed so is read-only.");
  }
}