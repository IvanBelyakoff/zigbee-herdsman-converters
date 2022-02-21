import classCheckPrivateStaticAccess from './classCheckPrivateStaticAccess.js';

function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
  classCheckPrivateStaticAccess(receiver, classConstructor);
  return method;
}

export default _classStaticPrivateMethodGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;