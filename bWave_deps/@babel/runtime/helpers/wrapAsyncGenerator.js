import AsyncGenerator from './AsyncGenerator.js';

function _wrapAsyncGenerator(fn) {
  return function () {
    return new AsyncGenerator(fn.apply(this, arguments));
  };
}

export default _wrapAsyncGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;