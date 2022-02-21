import arrayWithHoles from "./arrayWithHoles.mjs";
import iterableToArrayLimitLoose from "./iterableToArrayLimitLoose.mjs";
import unsupportedIterableToArray from "./unsupportedIterableToArray.mjs";
import nonIterableRest from "./nonIterableRest.mjs";
export default function _slicedToArrayLoose(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimitLoose(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}