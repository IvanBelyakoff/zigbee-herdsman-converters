function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

export default _classPrivateMethodGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;