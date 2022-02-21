import os
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("path", help="path to scan")
args = parser.parse_args()

from tempfile import mkstemp
from shutil import move, copymode
from os import fdopen, remove
import re

def replace(file_path):
    #Create temp file
    fh, abs_path = mkstemp()
    with fdopen(fh,'w') as new_file:
        with open(file_path, 'rt') as old_file:

            removeStringList = ['as _fs2 from "fs.mjs";','const fs = _fs2.default;']
            skipNext2LinesStr = 'fs.appendFile'
            skipCounter = 0

            for line in old_file:
                if skipCounter > 0:
                    skipCounter -= 1
                    continue;

                if any(x in line for x in removeStringList):
                    print("Removed the line: " + line)
                    newline = ''
                elif skipNext2LinesStr in line:
                    newline = ''
                    skipCounter = 2
                else:
                    newline = line

                new_file.write(newline)
    #Copy the file permissions from the old file to the new file
    copymode(file_path, abs_path)
    #Remove original file
    remove(file_path)
    #Move new file
    move(abs_path, file_path)

if os.path.isdir(args.path):
    for entry in os.scandir(args.path):
        if entry.path.endswith('js'):
            print(entry.path)
            replace(entry.path)
elif os.path.isfile(args.path):
    print(args.path)
    # replace(entry.path, 'module.exports = {', 'export {')
    replace(args.path)
else:
    raise Exception("remove_fs2", "No file or directory:" + args.path)
