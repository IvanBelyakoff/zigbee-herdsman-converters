import classApplyDescriptorGet from "./classApplyDescriptorGet.mjs";
import classCheckPrivateStaticAccess from "./classCheckPrivateStaticAccess.mjs";
import classCheckPrivateStaticFieldDescriptor from "./classCheckPrivateStaticFieldDescriptor.mjs";
export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  classCheckPrivateStaticAccess(receiver, classConstructor);
  classCheckPrivateStaticFieldDescriptor(descriptor, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}