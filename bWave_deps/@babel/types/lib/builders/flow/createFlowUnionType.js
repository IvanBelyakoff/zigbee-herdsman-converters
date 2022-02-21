"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = createFlowUnionType;

import _generated from '../generated';
import _removeTypeDuplicates from '../../modifications/flow/removeTypeDuplicates';

function createFlowUnionType(types) {
  const flattened = (0, _removeTypeDuplicates.default)(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return (0, _generated.unionTypeAnnotation)(flattened);
  }
}