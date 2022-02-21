"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const ForAwaitStatement = exports.NumericLiteralTypeAnnotation = exports.ExistentialTypeParam = exports.SpreadProperty = exports.RestProperty = exports.Flow = exports.Pure = exports.Generated = exports.User = exports.Var = exports.BlockScoped = exports.Referenced = exports.Scope = exports.Expression = exports.Statement = exports.BindingIdentifier = exports.ReferencedMemberExpression = exports.ReferencedIdentifier = void 0;

import _t from '@babel/types';

const {
  isBinding,
  isBlockScoped,
  isExportDeclaration,
  isExpression,
  isFlow,
  isForStatement,
  isForXStatement,
  isIdentifier,
  isImportDeclaration,
  isImportSpecifier,
  isJSXIdentifier,
  isJSXMemberExpression,
  isMemberExpression,
  isReferenced,
  isScope,
  isStatement,
  isVar,
  isVariableDeclaration,
  react
} = _t;
const {
  isCompatTag
} = react;
const ReferencedIdentifier = {
  types: ["Identifier", "JSXIdentifier"],

  checkPath(path, opts) {
    const {
      node,
      parent
    } = path;

    if (!isIdentifier(node, opts) && !isJSXMemberExpression(parent, opts)) {
      if (isJSXIdentifier(node, opts)) {
        if (isCompatTag(node.name)) return false;
      } else {
        return false;
      }
    }

    return isReferenced(node, parent, path.parentPath.parent);
  }

};
const ReferencedMemberExpression = {
  types: ["MemberExpression"],

  checkPath({
    node,
    parent
  }) {
    return isMemberExpression(node) && isReferenced(node, parent);
  }

};
const BindingIdentifier = {
  types: ["Identifier"],

  checkPath(path) {
    const {
      node,
      parent
    } = path;
    const grandparent = path.parentPath.parent;
    return isIdentifier(node) && isBinding(node, parent, grandparent);
  }

};
const Statement = {
  types: ["Statement"],

  checkPath({
    node,
    parent
  }) {
    if (isStatement(node)) {
      if (isVariableDeclaration(node)) {
        if (isForXStatement(parent, {
          left: node
        })) return false;
        if (isForStatement(parent, {
          init: node
        })) return false;
      }

      return true;
    } else {
      return false;
    }
  }

};
const Expression = {
  types: ["Expression"],

  checkPath(path) {
    if (path.isIdentifier()) {
      return path.isReferencedIdentifier();
    } else {
      return isExpression(path.node);
    }
  }

};
const Scope = {
  types: ["Scopable", "Pattern"],

  checkPath(path) {
    return isScope(path.node, path.parent);
  }

};
const Referenced = {
  checkPath(path) {
    return isReferenced(path.node, path.parent);
  }

};
const BlockScoped = {
  checkPath(path) {
    return isBlockScoped(path.node);
  }

};
const Var = {
  types: ["VariableDeclaration"],

  checkPath(path) {
    return isVar(path.node);
  }

};
const User = {
  checkPath(path) {
    return path.node && !!path.node.loc;
  }

};
const Generated = {
  checkPath(path) {
    return !path.isUser();
  }

};
const Pure = {
  checkPath(path, opts) {
    return path.scope.isPure(path.node, opts);
  }

};
const Flow = {
  types: ["Flow", "ImportDeclaration", "ExportDeclaration", "ImportSpecifier"],

  checkPath({
    node
  }) {
    if (isFlow(node)) {
      return true;
    } else if (isImportDeclaration(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else if (isExportDeclaration(node)) {
      return node.exportKind === "type";
    } else if (isImportSpecifier(node)) {
      return node.importKind === "type" || node.importKind === "typeof";
    } else {
      return false;
    }
  }

};
const RestProperty = {
  types: ["RestElement"],

  checkPath(path) {
    return path.parentPath && path.parentPath.isObjectPattern();
  }

};
const SpreadProperty = {
  types: ["RestElement"],

  checkPath(path) {
    return path.parentPath && path.parentPath.isObjectExpression();
  }

};
const ExistentialTypeParam = {
  types: ["ExistsTypeAnnotation"]
};
const NumericLiteralTypeAnnotation = {
  types: ["NumberLiteralTypeAnnotation"]
};
const ForAwaitStatement = {
  types: ["ForOfStatement"],

  checkPath({
    node
  }) {
    return node.await === true;
  }

};
export { ReferencedIdentifier, ReferencedMemberExpression, BindingIdentifier, Statement, Expression, Scope, Referenced, BlockScoped, Var, User, Generated, Pure, Flow, RestProperty, SpreadProperty, ExistentialTypeParam, NumericLiteralTypeAnnotation, ForAwaitStatement };