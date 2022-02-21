#!/usr/bin/env node
/* eslint no-var: 0 */

import parser from '..';

import fs from 'fs';

var filename = process.argv[2];
if (!filename) {
  console.error("no filename specified");
} else {
  var file = fs.readFileSync(filename, "utf8");
  var ast = parser.parse(file);

  console.log(JSON.stringify(ast, null, "  "));
}
