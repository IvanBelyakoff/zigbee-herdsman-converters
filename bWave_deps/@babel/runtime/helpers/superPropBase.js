import getPrototypeOf from './getPrototypeOf.js';

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

export default _superPropBase;
module.exports["default"] = module.exports, module.exports.__esModule = true;