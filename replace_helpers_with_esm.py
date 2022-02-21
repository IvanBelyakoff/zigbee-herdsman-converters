import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("path", help="path to scan")
args = parser.parse_args()

from tempfile import mkstemp
from shutil import move, copymode
from os import fdopen, remove
import re

# var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
# .import "../dependencies/es6-promise/dist/es6-promise.js" as QML_es6Promise

def replace(file_path):
    #Create temp file
    fh, abs_path = mkstemp()
    with fdopen(fh,'w') as new_file:
        with open(file_path, 'rt') as old_file:
            for line in old_file:
                try:
                    if 'runtime/helpers' in line and 'esm' not in line:
                        line = line.replace('runtime/helpers/', 'runtime/helpers/esm/')

                    # if '_interopRequireDefault' in line or '_interopRequireWildcard' in line:
                    #     if 'var _interopRequire' in line:
                    #         print('Removing the line: ' + line)
                    #         newline = ''
                    #     else:
                    #         modu = re.search('"(.*)"', line)
                    #         varName = re.search('var (.*) =', line)
                    #         # newline = '.import "' + modu.group(1) + '.mjs" as ' + varName.group(1)
                    #         newline = 'import * as ' + varName.group(1) + ' from "' + modu.group(1) + '.mjs";'
                    #         print('New line: ' + newline)
                    if '_interopRequireDefault' in line:
                        if 'var _interopRequireDefault' in line:
                            print('Removing the line: ' + line)
                            newline = ''
                        else:
                            modu = re.search('"(.*)"', line)
                            varName = re.search('var (.*) =', line)
                            # newline = '.import "' + modu.group(1) + '.mjs" as ' + varName.group(1)
                            # newline = 'let ' + varName.group(1) + ' = { default: {} }\nimport * as ' + varName.group(1) + '.default from "' + modu.group(1) + '.mjs";'
                            if 'babel' not in modu.group(1):
                                newline = 'import * as ' + varName.group(1) + ' from "' + modu.group(1) + '.mjs";\n'
                                # newline = 'import * as _' + varName.group(1) + ' from "' + modu.group(1) + '.mjs";\nlet ' + varName.group(1) + ' = { default: _' + varName.group(1) + ' }'
                            else:
                                newline = 'import * as ' + varName.group(1) + ' from "' + modu.group(1) + '.mjs";'

                            # newline = 'let ' + varName.group(1) + ' = { default: {} }\nimport * as ' + varName.group(1) + '.default from "' + modu.group(1) + '.mjs";'
                            print('New line: ' + newline)
                    elif '= require(' in line and not ' require(path' in line: # special case for index.js
                        if line.startswith('}'):
                            # } = require('./utils');
                            newline = line.replace("';", ".mjs';")
                            newline = line.replace('";', '.mjs";')
                        else:
                            # Replace the following requires
                            # var _utils = require("./utils");
                            modu = re.search('"(.*)\/(.*)"', line)
                            varName = re.search('var (.*) =', line)
                            # newline = '.import "' + modu.group(1) + '.mjs" as ' + varName.group(1)
                            newline = 'import * as ' + varName.group(1) + ' from "' + modu.group(1) + '/' + modu.group(2) + '.mjs";'
                        print('New line: ' + newline)
                    elif '(require(' in line: # special case for converters/fromZigbee.js
                        # Replace the following requires
                        # var _utils = require("./utils");
                        modu = re.search('"(.*)\/(.*)"', line)
                        varName = re.search('var (.*) =', line)
                        # newline = '.import "' + modu.group(1) + '.mjs" as ' + varName.group(1)
                        newline = 'import * as ' + varName.group(1) + ' from "' + modu.group(1) + '/' + modu.group(2) + '.mjs";'
                        print('New line: ' + newline)
                    elif line.startswith('import ') and ("js';" not in line) and ('js";' not in line):
                        # Replace inclusion if modules path does not end with .mjs
                        newline = line.replace("';", ".mjs';")
                        newline = line.replace('";', '.mjs";')
                        print('New line: ' + newline)
                    elif 'use strict' in line:
                        newline = ''
                    else:
                        newline = line

                    new_file.write(newline)
                except:
                    print("Error processing line: " + line)
                    raise
    #Copy the file permissions from the old file to the new file
    copymode(file_path, abs_path)
    #Remove original file
    remove(file_path)
    #Move new file
    move(abs_path, file_path)

print("Path:", args.path)

if os.path.isdir(args.path):
    for entry in os.scandir(args.path):
        if entry.path.endswith('js'):
            print(entry.path)
            # replace(entry.path, 'module.exports = {', 'export {')
            replace(entry.path)

elif os.path.isfile(args.path):
    print(args.path)
    # replace(entry.path, 'module.exports = {', 'export {')
    replace(args.path)
else:
    raise Exception("replace_helpers_with_esm", "No file or directory:" + args.path)
