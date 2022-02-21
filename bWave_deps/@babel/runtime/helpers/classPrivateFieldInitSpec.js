import checkPrivateRedeclaration from './checkPrivateRedeclaration.js';

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

export default _classPrivateFieldInitSpec;
module.exports["default"] = module.exports, module.exports.__esModule = true;