function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

export default _taggedTemplateLiteral;
module.exports["default"] = module.exports, module.exports.__esModule = true;