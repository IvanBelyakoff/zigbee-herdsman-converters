"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const NOT_LOCAL_BINDING = exports.BLOCK_SCOPED_SYMBOL = exports.INHERIT_KEYS = exports.UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = exports.NUMBER_UNARY_OPERATORS = exports.BOOLEAN_UNARY_OPERATORS = exports.ASSIGNMENT_OPERATORS = exports.BINARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = exports.EQUALITY_BINARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = exports.UPDATE_OPERATORS = exports.LOGICAL_OPERATORS = exports.COMMENT_KEYS = exports.FOR_INIT_KEYS = exports.FLATTENABLE_KEYS = exports.STATEMENT_OR_BLOCK_KEYS = void 0;
const STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
const FLATTENABLE_KEYS = ["body", "expressions"];
const FOR_INIT_KEYS = ["left", "init"];
const COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"];
const LOGICAL_OPERATORS = ["||", "&&", "??"];
const UPDATE_OPERATORS = ["++", "--"];
const BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
const EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="];
const COMPARISON_BINARY_OPERATORS = [...EQUALITY_BINARY_OPERATORS, "in", "instanceof"];
const BOOLEAN_BINARY_OPERATORS = [...COMPARISON_BINARY_OPERATORS, ...BOOLEAN_NUMBER_BINARY_OPERATORS];
const NUMBER_BINARY_OPERATORS = ["-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];
const BINARY_OPERATORS = ["+", ...NUMBER_BINARY_OPERATORS, ...BOOLEAN_BINARY_OPERATORS];
const ASSIGNMENT_OPERATORS = ["=", "+=", ...NUMBER_BINARY_OPERATORS.map(op => op + "="), ...LOGICAL_OPERATORS.map(op => op + "=")];
const BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
const NUMBER_UNARY_OPERATORS = ["+", "-", "~"];
const STRING_UNARY_OPERATORS = ["typeof"];
const UNARY_OPERATORS = ["void", "throw", ...BOOLEAN_UNARY_OPERATORS, ...NUMBER_UNARY_OPERATORS, ...STRING_UNARY_OPERATORS];
const INHERIT_KEYS = {
  optional: ["typeAnnotation", "typeParameters", "returnType"],
  force: ["start", "loc", "end"]
};
const BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
const NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding");
export { STATEMENT_OR_BLOCK_KEYS, FLATTENABLE_KEYS, FOR_INIT_KEYS, COMMENT_KEYS, LOGICAL_OPERATORS, UPDATE_OPERATORS, BOOLEAN_NUMBER_BINARY_OPERATORS, EQUALITY_BINARY_OPERATORS, COMPARISON_BINARY_OPERATORS, BOOLEAN_BINARY_OPERATORS, NUMBER_BINARY_OPERATORS, BINARY_OPERATORS, ASSIGNMENT_OPERATORS, BOOLEAN_UNARY_OPERATORS, NUMBER_UNARY_OPERATORS, STRING_UNARY_OPERATORS, UNARY_OPERATORS, INHERIT_KEYS, BLOCK_SCOPED_SYMBOL, NOT_LOCAL_BINDING };