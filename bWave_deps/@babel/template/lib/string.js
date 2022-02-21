"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = stringTemplate;

import _options from './options';
import _parse from './parse';
import _populate from './populate';

function stringTemplate(formatter, code, opts) {
  code = formatter.code(code);
  let metadata;
  return arg => {
    const replacements = (0, _options.normalizeReplacements)(arg);
    if (!metadata) metadata = (0, _parse.default)(formatter, code, opts);
    return formatter.unwrap((0, _populate.default)(metadata, replacements));
  };
}