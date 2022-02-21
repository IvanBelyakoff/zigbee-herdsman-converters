import classApplyDescriptorSet from "./classApplyDescriptorSet.mjs";
import classCheckPrivateStaticAccess from "./classCheckPrivateStaticAccess.mjs";
import classCheckPrivateStaticFieldDescriptor from "./classCheckPrivateStaticFieldDescriptor.mjs";
export default function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
  classCheckPrivateStaticAccess(receiver, classConstructor);
  classCheckPrivateStaticFieldDescriptor(descriptor, "set");
  classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}