import setPrototypeOf from './setPrototypeOf.js';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}

export default _inheritsLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;