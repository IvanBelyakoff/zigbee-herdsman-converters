"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const default = void 0;

import _helperPluginUtils from '@babel/helper-plugin-utils';
import _pluginSyntaxClassStaticBlock from '@babel/plugin-syntax-class-static-block';
import _helperCreateClassFeaturesPlugin from '@babel/helper-create-class-features-plugin';

function generateUid(scope, denyList) {
  const name = "";
  let uid;
  let i = 1;

  do {
    uid = scope._generateUid(name, i);
    i++;
  } while (denyList.has(uid));

  return uid;
}

var _default = (0, _helperPluginUtils.declare)(({
  types: t,
  template,
  assertVersion
}) => {
  assertVersion("^7.12.0");
  return {
    name: "proposal-class-static-block",
    inherits: _pluginSyntaxClassStaticBlock.default,

    pre() {
      (0, _helperCreateClassFeaturesPlugin.enableFeature)(this.file, _helperCreateClassFeaturesPlugin.FEATURES.staticBlocks, false);
    },

    visitor: {
      ClassBody(classBody) {
        const {
          scope
        } = classBody;
        const privateNames = new Set();
        const body = classBody.get("body");

        for (const path of body) {
          if (path.isPrivate()) {
            privateNames.add(path.get("key.id").node.name);
          }
        }

        for (const path of body) {
          if (!path.isStaticBlock()) continue;
          const staticBlockPrivateId = generateUid(scope, privateNames);
          privateNames.add(staticBlockPrivateId);
          const staticBlockRef = t.privateName(t.identifier(staticBlockPrivateId));
          path.replaceWith(t.classPrivateProperty(staticBlockRef, template.expression.ast`(() => { ${path.node.body} })()`, [], true));
        }
      }

    }
  };
});

export const default = _default;