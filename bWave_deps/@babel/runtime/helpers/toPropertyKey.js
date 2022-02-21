import _typeof from '@babel/runtime/helpers/typeof';
import toPrimitive from './toPrimitive.js';

function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

export default _toPropertyKey;
module.exports["default"] = module.exports, module.exports.__esModule = true;