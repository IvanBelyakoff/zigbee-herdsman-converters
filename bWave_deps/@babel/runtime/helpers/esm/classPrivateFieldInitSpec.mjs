import checkPrivateRedeclaration from "./checkPrivateRedeclaration.mjs";
export default function _classPrivateFieldInitSpec(obj, privateMap, value) {
  checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}