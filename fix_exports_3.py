import os
import argparse
import re

parser = argparse.ArgumentParser()
parser.add_argument("path", help="path to scan")
args = parser.parse_args()

from tempfile import mkstemp
from shutil import move, copymode
from os import fdopen, remove

def replace(file_path, pattern, subst):
    #Create temp file
    fh, abs_path = mkstemp()
    with fdopen(fh,'w') as new_file:
        with open(file_path, 'rt') as old_file:
            # pattern1 = 'module.exports = '
            pattern2 = 'exports.default = '
            pattern_detected = 0

            for line in old_file:
                # if line.startswith(pattern1):
                #     pattern_detected = 1
                # else if line.startswith(pattern2):
                if line.startswith(pattern2):
                    pattern_detected = 2

                new_file.write(line)

            if pattern_detected == 1:
                new_file.write("\nexport default module.exports;")
            elif pattern_detected == 2:
                new_file.write("\nexport default exports.default;")


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
            replace(entry.path, 'dummy', 'yummy')
elif os.path.isfile(args.path):
    print(args.path)
    # replace(entry.path, 'module.exports = {', 'export {')
    replace(args.path, 'dummy', 'yummy')
else:
    raise Exception("fix_exports_3", "No file or directory:" + args.path)
