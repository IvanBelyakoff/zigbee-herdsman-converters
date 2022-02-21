"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
export { hasMinVersion };

import _semver from 'semver';

function hasMinVersion(minVersion, runtimeVersion) {
  if (!runtimeVersion) return true;
  if (_semver.valid(runtimeVersion)) runtimeVersion = `^${runtimeVersion}`;
  return !_semver.intersects(`<${minVersion}`, runtimeVersion) && !_semver.intersects(`>=8.0.0`, runtimeVersion);
}