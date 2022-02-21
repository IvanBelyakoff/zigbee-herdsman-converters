import classApplyDescriptorDestructureSet from './classApplyDescriptorDestructureSet.js';
import classExtractFieldDescriptor from './classExtractFieldDescriptor.js';

function _classPrivateFieldDestructureSet(receiver, privateMap) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
  return classApplyDescriptorDestructureSet(receiver, descriptor);
}

export default _classPrivateFieldDestructureSet;
module.exports["default"] = module.exports, module.exports.__esModule = true;