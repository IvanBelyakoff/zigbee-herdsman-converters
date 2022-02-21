"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const PLACEHOLDERS_FLIPPED_ALIAS = exports.PLACEHOLDERS_ALIAS = exports.PLACEHOLDERS = void 0;

import _utils from './utils';

const PLACEHOLDERS = ["Identifier", "StringLiteral", "Expression", "Statement", "Declaration", "BlockStatement", "ClassBody", "Pattern"];
const PLACEHOLDERS_ALIAS = {
  Declaration: ["Statement"],
  Pattern: ["PatternLike", "LVal"]
};

for (const type of PLACEHOLDERS) {
  const alias = _utils.ALIAS_KEYS[type];
  if (alias != null && alias.length) PLACEHOLDERS_ALIAS[type] = alias;
}

const PLACEHOLDERS_FLIPPED_ALIAS = {};
export { PLACEHOLDERS, PLACEHOLDERS_ALIAS, PLACEHOLDERS_FLIPPED_ALIAS };
Object.keys(PLACEHOLDERS_ALIAS).forEach(type => {
  PLACEHOLDERS_ALIAS[type].forEach(alias => {
    if (!Object.hasOwnProperty.call(PLACEHOLDERS_FLIPPED_ALIAS, alias)) {
      PLACEHOLDERS_FLIPPED_ALIAS[alias] = [];
    }

    PLACEHOLDERS_FLIPPED_ALIAS[alias].push(type);
  });
});