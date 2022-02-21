import classApplyDescriptorGet from "./classApplyDescriptorGet.mjs";
import classExtractFieldDescriptor from "./classExtractFieldDescriptor.mjs";
export default function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = classExtractFieldDescriptor(receiver, privateMap, "get");
  return classApplyDescriptorGet(receiver, descriptor);
}