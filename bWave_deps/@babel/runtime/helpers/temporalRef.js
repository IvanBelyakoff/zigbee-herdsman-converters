import temporalUndefined from './temporalUndefined.js';
import tdz from './tdz.js';

function _temporalRef(val, name) {
  return val === temporalUndefined ? tdz(name) : val;
}

export default _temporalRef;
module.exports["default"] = module.exports, module.exports.__esModule = true;