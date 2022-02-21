import checkPrivateRedeclaration from "./checkPrivateRedeclaration.mjs";
export default function _classPrivateMethodInitSpec(obj, privateSet) {
  checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}