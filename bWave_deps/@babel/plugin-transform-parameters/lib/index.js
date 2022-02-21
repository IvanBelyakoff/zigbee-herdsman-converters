"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "convertFunctionParams", {
  enumerable: true,
  get: function () {
    return _params.default;
  }
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _params from './params';
import _rest from './rest';

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  var _api$assumption;

  api.assertVersion(7);
  const ignoreFunctionLength = (_api$assumption = api.assumption("ignoreFunctionLength")) != null ? _api$assumption : options.loose;
  const noNewArrows = api.assumption("noNewArrows");
  return {
    name: "transform-parameters",
    visitor: {
      Function(path) {
        if (path.isArrowFunctionExpression() && path.get("params").some(param => param.isRestElement() || param.isAssignmentPattern())) {
          path.arrowFunctionToExpression({
            noNewArrows
          });
        }

        const convertedRest = (0, _rest.default)(path);
        const convertedParams = (0, _params.default)(path, ignoreFunctionLength);

        if (convertedRest || convertedParams) {
          path.scope.crawl();
        }
      }

    }
  };
});

export const default = _default;