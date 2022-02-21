import classApplyDescriptorDestructureSet from "./classApplyDescriptorDestructureSet.mjs";
import classCheckPrivateStaticAccess from "./classCheckPrivateStaticAccess.mjs";
import classCheckPrivateStaticFieldDescriptor from "./classCheckPrivateStaticFieldDescriptor.mjs";
export default function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
  classCheckPrivateStaticAccess(receiver, classConstructor);
  classCheckPrivateStaticFieldDescriptor(descriptor, "set");
  return classApplyDescriptorDestructureSet(receiver, descriptor);
}