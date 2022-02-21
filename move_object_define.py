import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("path", help="path to scan")
args = parser.parse_args()

from tempfile import mkstemp
from shutil import move, copymode, copy
from os import fdopen, remove
import re

# var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
# .import "../dependencies/es6-promise/dist/es6-promise.js" as QML_es6Promise

def replace(file_path):
    print(file_path)

    #Create temp file
    fh, abs_path = mkstemp()
    textToMove = \
r'''
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
'''
    destinationPosText = r'var exports = module.exports;'

    # print("text:", text)
    new_text = ''

    with fdopen(fh,'w') as new_file:
        with open(file_path, 'rt') as old_file:
            all_text = old_file.read()

            if os.stat(file_path).st_size == 0:
                raise ValueError('Empty file', file_path)

            if all_text == '':
                raise ValueError('Empty text in file', file_path)

            m = re.search(re.escape(textToMove), all_text, re.DOTALL)

            if m is not None:
                pos = all_text.find(destinationPosText, m.span()[1])
                # pos = all_text.find(destinationPosText)

                if pos >= 0:
                    new_text = all_text[:m.span()[0]] + all_text[m.span()[1]:pos + len(destinationPosText) + 1] + textToMove + all_text[pos + len(destinationPosText) + 1:]

                    if new_text == '':
                        raise ValueError('Empty text after replacement', file_path)
                    # print("-----------------------------New text:", file_path, new_text)
                else:
                    print("Replacement dest is not found for file:", file_path)
                    # It might be already in proper place
                    new_text = all_text
            else:
                new_text = all_text


            # if modu is not None:
                # print(modu.group(0))


        if new_text != '':
            # print("-----------------------------New text:", abs_path, new_text)
            new_file.write(new_text)
        else:
            raise ValueError('Empty text in dest file', file_path)

    if new_text != '':
        #Copy the file permissions from the old file to the new file
        copymode(file_path, abs_path)
        #Remove original file
        remove(file_path)
        #Move new file
        move(abs_path, file_path)
        # copy(abs_path, "./dist2/tmp/")
    else:
        raise ValueError('Empty text in dest file', file_path)


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
    raise Exception("move_object_define", "No file or directory:" + args.path)
