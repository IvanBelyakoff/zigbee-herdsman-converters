"use strict";

export const __esModule = true;
export const presetEnvSilentDebugHeader = void 0;

import _helperCompilationTargets from '@babel/helper-compilation-targets';

const presetEnvSilentDebugHeader = "#__secret_key__@babel/preset-env__don't_log_debug_header_and_resolved_targets";
export { stringifyTargetsMultiline, stringifyTargets, presetEnvSilentDebugHeader };

function stringifyTargetsMultiline(targets) {
  return JSON.stringify((0, _helperCompilationTargets.prettifyTargets)(targets), null, 2);
}

function stringifyTargets(targets) {
  return JSON.stringify(targets).replace(/,/g, ", ").replace(/^\{"/, '{ "').replace(/"\}$/, '" }');
}