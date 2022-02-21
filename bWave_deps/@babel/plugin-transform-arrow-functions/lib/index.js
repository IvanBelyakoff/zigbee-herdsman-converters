"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  var _api$assumption;

  api.assertVersion(7);
  const noNewArrows = (_api$assumption = api.assumption("noNewArrows")) != null ? _api$assumption : !options.spec;
  return {
    name: "transform-arrow-functions",
    visitor: {
      ArrowFunctionExpression(path) {
        if (!path.isArrowFunctionExpression()) return;
        path.arrowFunctionToExpression({
          allowInsertArrow: false,
          noNewArrows,
          specCompliant: !noNewArrows
        });
      }

    }
  };
});

export const default = _default;