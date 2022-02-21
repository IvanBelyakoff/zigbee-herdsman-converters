import arrayWithoutHoles from "./arrayWithoutHoles.mjs";
import iterableToArray from "./iterableToArray.mjs";
import unsupportedIterableToArray from "./unsupportedIterableToArray.mjs";
import nonIterableSpread from "./nonIterableSpread.mjs";
export default function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}