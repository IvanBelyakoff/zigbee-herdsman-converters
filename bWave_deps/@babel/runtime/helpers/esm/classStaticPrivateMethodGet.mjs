import classCheckPrivateStaticAccess from "./classCheckPrivateStaticAccess.mjs";
export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
  classCheckPrivateStaticAccess(receiver, classConstructor);
  return method;
}