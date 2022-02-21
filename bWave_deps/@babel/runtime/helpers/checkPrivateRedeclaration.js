function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

export default _checkPrivateRedeclaration;
module.exports["default"] = module.exports, module.exports.__esModule = true;