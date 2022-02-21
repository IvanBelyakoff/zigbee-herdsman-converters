import classApplyDescriptorGet from './classApplyDescriptorGet.js';
import classCheckPrivateStaticAccess from './classCheckPrivateStaticAccess.js';
import classCheckPrivateStaticFieldDescriptor from './classCheckPrivateStaticFieldDescriptor.js';

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  classCheckPrivateStaticAccess(receiver, classConstructor);
  classCheckPrivateStaticFieldDescriptor(descriptor, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}

export default _classStaticPrivateFieldSpecGet;
module.exports["default"] = module.exports, module.exports.__esModule = true;