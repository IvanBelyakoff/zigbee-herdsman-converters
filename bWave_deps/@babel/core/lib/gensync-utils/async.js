"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const waitFor = exports.onFirstPause = exports.isAsync = void 0;

function _gensync() {
  const data = require("gensync");

  _gensync = function () {
    return data;
  };

  return data;
}

const id = x => x;

const runGenerator = _gensync()(function* (item) {
  return yield* item;
});

const isAsync = _gensync()({
  sync: () => false,
  errback: cb => cb(null, true)
});

function maybeAsync(fn, message) {
  return _gensync()({
    sync(...args) {
      const result = fn.apply(this, args);
      if (isThenable(result)) throw new Error(message);
      return result;
    },

    async(...args) {
      return Promise.resolve(fn.apply(this, args));
    }

  });
}

const withKind = _gensync()({
  sync: cb => cb("sync"),
  async: cb => cb("async")
});

function forwardAsync(action, cb) {
  const g = _gensync()(action);

  return withKind(kind => {
    const adapted = g[kind];
    return cb(adapted);
  });
}

const onFirstPause = _gensync()({
  name: "onFirstPause",
  arity: 2,
  sync: function (item) {
    return runGenerator.sync(item);
  },
  errback: function (item, firstPause, cb) {
    let completed = false;
    runGenerator.errback(item, (err, value) => {
      completed = true;
      cb(err, value);
    });

    if (!completed) {
      firstPause();
    }
  }
});

const waitFor = _gensync()({
  sync: id,
  async: id
});

export { maybeAsync, forwardAsync, isThenable, isAsync, onFirstPause, waitFor };

function isThenable(val) {
  return !!val && (typeof val === "object" || typeof val === "function") && !!val.then && typeof val.then === "function";
}