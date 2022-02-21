"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = _default;

import _helperWrapFunction from '@babel/helper-wrap-function';
import _helperAnnotateAsPure from '@babel/helper-annotate-as-pure';
import _t from '@babel/types';

const {
  callExpression,
  cloneNode,
  isIdentifier,
  isThisExpression,
  yieldExpression
} = _t;
const awaitVisitor = {
  Function(path) {
    path.skip();
  },

  AwaitExpression(path, {
    wrapAwait
  }) {
    const argument = path.get("argument");

    if (path.parentPath.isYieldExpression()) {
      path.replaceWith(argument.node);
      return;
    }

    path.replaceWith(yieldExpression(wrapAwait ? callExpression(cloneNode(wrapAwait), [argument.node]) : argument.node));
  }

};

function _default(path, helpers, noNewArrows) {
  path.traverse(awaitVisitor, {
    wrapAwait: helpers.wrapAwait
  });
  const isIIFE = checkIsIIFE(path);
  path.node.async = false;
  path.node.generator = true;
  (0, _helperWrapFunction.default)(path, cloneNode(helpers.wrapAsync), noNewArrows);
  const isProperty = path.isObjectMethod() || path.isClassMethod() || path.parentPath.isObjectProperty() || path.parentPath.isClassProperty();

  if (!isProperty && !isIIFE && path.isExpression()) {
    (0, _helperAnnotateAsPure.default)(path);
  }

  function checkIsIIFE(path) {
    if (path.parentPath.isCallExpression({
      callee: path.node
    })) {
      return true;
    }

    const {
      parentPath
    } = path;

    if (parentPath.isMemberExpression() && isIdentifier(parentPath.node.property, {
      name: "bind"
    })) {
      const {
        parentPath: bindCall
      } = parentPath;
      return bindCall.isCallExpression() && bindCall.node.arguments.length === 1 && isThisExpression(bindCall.node.arguments[0]) && bindCall.parentPath.isCallExpression({
        callee: bindCall.node
      });
    }

    return false;
  }
}