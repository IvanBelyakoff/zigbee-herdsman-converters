import classApplyDescriptorSet from './classApplyDescriptorSet.js';
import classExtractFieldDescriptor from './classExtractFieldDescriptor.js';

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
  classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}

export default _classPrivateFieldSet;
module.exports["default"] = module.exports, module.exports.__esModule = true;