import getPrototypeOf from './getPrototypeOf.js';
import isNativeReflectConstruct from './isNativeReflectConstruct.js';
import possibleConstructorReturn from './possibleConstructorReturn.js';

function _createSuper(Derived) {
  var hasNativeReflectConstruct = isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return possibleConstructorReturn(this, result);
  };
}

export default _createSuper;
module.exports["default"] = module.exports, module.exports.__esModule = true;