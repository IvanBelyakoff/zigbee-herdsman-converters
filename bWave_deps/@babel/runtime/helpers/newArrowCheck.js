function _newArrowCheck(innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
}

export default _newArrowCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;