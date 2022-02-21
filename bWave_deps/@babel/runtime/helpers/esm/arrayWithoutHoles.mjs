import arrayLikeToArray from "./arrayLikeToArray.mjs";
export default function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}