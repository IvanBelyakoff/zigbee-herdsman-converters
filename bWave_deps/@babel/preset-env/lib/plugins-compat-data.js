"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export const pluginsBugfixes = exports.plugins = void 0;

import _plugins from '@babel/compat-data/plugins';
import _pluginBugfixes from '@babel/compat-data/plugin-bugfixes';
import _availablePlugins from './available-plugins';

const pluginsFiltered = {};
export const plugins = pluginsFiltered;
const bugfixPluginsFiltered = {};
export const pluginsBugfixes = bugfixPluginsFiltered;

for (const plugin of Object.keys(_plugins)) {
  if (Object.hasOwnProperty.call(_availablePlugins.default, plugin)) {
    pluginsFiltered[plugin] = _plugins[plugin];
  }
}

for (const plugin of Object.keys(_pluginBugfixes)) {
  if (Object.hasOwnProperty.call(_availablePlugins.default, plugin)) {
    bugfixPluginsFiltered[plugin] = _pluginBugfixes[plugin];
  }
}

pluginsFiltered["proposal-class-properties"] = pluginsFiltered["proposal-private-methods"];