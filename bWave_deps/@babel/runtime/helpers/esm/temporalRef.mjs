import undef from "./temporalUndefined.mjs";
import err from "./tdz.mjs";
export default function _temporalRef(val, name) {
  return val === undef ? err(name) : val;
}