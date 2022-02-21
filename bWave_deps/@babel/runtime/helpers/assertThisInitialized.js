function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

export default _assertThisInitialized;
module.exports["default"] = module.exports, module.exports.__esModule = true;