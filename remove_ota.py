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

            otaStrings = ['ota: ota.', 'import * as _ota ', 'const ota = _ota.default;']
            # otaStrings = ['ota: ota.zigbeeOTA', "const ota = require", 'const ota = _ota.default;']

            for line in old_file:
                lstripped = line.lstrip()

                if any(lstripped.startswith(x) for x in otaStrings):
                    print("Removed the line: " + line)
                    newline = ''
                else:
                    newline = line

                new_file.write(newline)
    #Copy the file permissions from the old file to the new file
    copymode(file_path, abs_path)
    #Remove original file
    remove(file_path)
    #Move new file
    move(abs_path, file_path)

for entry in os.scandir(args.path):
    if entry.path.endswith('js'):
        print(entry.path)
        replace(entry.path)
