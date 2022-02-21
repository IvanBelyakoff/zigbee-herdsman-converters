import classApplyDescriptorDestructureSet from "./classApplyDescriptorDestructureSet.mjs";
import classExtractFieldDescriptor from "./classExtractFieldDescriptor.mjs";
export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "set");
  return classApplyDescriptorDestructureSet(receiver, descriptor);
}