import classApplyDescriptorDestructureSet from './classApplyDescriptorDestructureSet.js';
import classCheckPrivateStaticAccess from './classCheckPrivateStaticAccess.js';
import classCheckPrivateStaticFieldDescriptor from './classCheckPrivateStaticFieldDescriptor.js';

function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
  classCheckPrivateStaticAccess(receiver, classConstructor);
  classCheckPrivateStaticFieldDescriptor(descriptor, "set");
  return classApplyDescriptorDestructureSet(receiver, descriptor);
}

export default _classStaticPrivateFieldDestructureSet;
module.exports["default"] = module.exports, module.exports.__esModule = true;