import classApplyDescriptorGet from './classApplyDescriptorGet.js';
import classExtractFieldDescriptor from './classExtractFieldDescriptor.js';

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}

export default _classPrivateFieldGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;