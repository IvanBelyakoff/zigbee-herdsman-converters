import classApplyDescriptorSet from "./classApplyDescriptorSet.mjs";
import classExtractFieldDescriptor from "./classExtractFieldDescriptor.mjs";
export default function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
  classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}