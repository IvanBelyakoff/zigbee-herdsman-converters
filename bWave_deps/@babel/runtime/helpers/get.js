import superPropBase from './superPropBase.js';

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    export default _get = Reflect.get;
    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    export default _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _get(target, property, receiver || target);
}

export default _get;
module.exports["default"] = module.exports, module.exports.__esModule = true;