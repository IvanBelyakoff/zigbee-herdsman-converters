import arrayWithoutHoles from './arrayWithoutHoles.js';
import iterableToArray from './iterableToArray.js';
import unsupportedIterableToArray from './unsupportedIterableToArray.js';
import nonIterableSpread from './nonIterableSpread.js';

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

export default _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;