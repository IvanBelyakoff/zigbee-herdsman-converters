import arrayWithHoles from "./arrayWithHoles.mjs";
import iterableToArray from "./iterableToArray.mjs";
import unsupportedIterableToArray from "./unsupportedIterableToArray.mjs";
import nonIterableRest from "./nonIterableRest.mjs";
export default function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}