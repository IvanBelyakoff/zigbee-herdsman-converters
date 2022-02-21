"use strict";

export const __esModule = true;
export const default = void 0;

import _utils from '../utils';

var _default = callProvider => ({
  ImportDeclaration(path) {
    const source = (0, _utils.getImportSource)(path);
    if (!source) return;
    callProvider({
      kind: "import",
      source
    }, path);
  },

  Program(path) {
    path.get("body").forEach(bodyPath => {
      const source = (0, _utils.getRequireSource)(bodyPath);
      if (!source) return;
      callProvider({
        kind: "import",
        source
      }, bodyPath);
    });
  }

});

export const default = _default;