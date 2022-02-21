"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = createTSUnionType;

import _generated from '../generated';
import _removeTypeDuplicates from '../../modifications/typescript/removeTypeDuplicates';

function createTSUnionType(typeAnnotations) {
  const types = typeAnnotations.map(type => type.typeAnnotation);
  const flattened = (0, _removeTypeDuplicates.default)(types);

  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return (0, _generated.tsUnionType)(flattened);
  }
}