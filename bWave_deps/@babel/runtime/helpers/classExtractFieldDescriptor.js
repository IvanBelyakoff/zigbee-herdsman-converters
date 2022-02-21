function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

export default _classExtractFieldDescriptor;
module.exports["default"] = module.exports, module.exports.__esModule = true;