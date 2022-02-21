function _skipFirstGeneratorNext(fn) {
  return function () {
    var it = fn.apply(this, arguments);
    it.next();
    return it;
  };
}

export default _skipFirstGeneratorNext;
module.exports["default"] = module.exports, module.exports.__esModule = true;