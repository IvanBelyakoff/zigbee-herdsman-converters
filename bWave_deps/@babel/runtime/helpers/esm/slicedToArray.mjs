import arrayWithHoles from "./arrayWithHoles.mjs";
import iterableToArrayLimit from "./iterableToArrayLimit.mjs";
import unsupportedIterableToArray from "./unsupportedIterableToArray.mjs";
import nonIterableRest from "./nonIterableRest.mjs";
export default function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}