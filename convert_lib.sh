#!/bin/bash
##!/usr/bin/zsh
TARGET_DIR=$1/lib

if [ ! -d $TARGET_DIR ]; then
    mkdir -p $TARGET_DIR
fi

#0. Delete leftovers
rm -rf $TARGET_DIR/*.js
#1. Run npx babel from zigbee-herdsman-convertes dir:
echo "Running npx..."
npx babel ./lib --out-dir $TARGET_DIR
#1.1 Removing OTA dir
echo "Removing ota dir..."
rm -rf $TARGET_DIR/ota

#2. Replace all babel/runtime/helpers import with babel/runtime/esm/helpers:
echo "Replacing helpers with proper import..."
python3 ./replace_helpers_with_esm.py $TARGET_DIR
#3. Rename all *.js to *.mjs with mmv command:
echo "Renaming all the JS files...."
# mmv $TARGET_DIR/*.js $TARGET_DIR/*.mjs
# zmv -W $TARGET_DIR/*.js $TARGET_DIR/*.mjs
for filename in $TARGET_DIR/*.js; do
    withoutExt=$(basename $filename ".js")
    mv "$filename" $TARGET_DIR/"$withoutExt.mjs"
done
#4. Move Object.defineProperty lower than exports definition by running:
echo "Moving around object.defineProperty..."
python3 ./move_object_define.py $TARGET_DIR
#5. Fix exports:
echo "Fixing exports..."
python3 ./fix_exports_3.py $TARGET_DIR

#6
echo "Fixing up other things"
python3 ./remove_process_exposes.py $TARGET_DIR/exposes.mjs

#7. In this file assert wants to use only assert function as default, but in index.js
# other functions are used from default object
echo "Fixing up assert..."
sed -i 's/const assert = _assert2.default;/const assert = _assert2.default.assert;/g' $TARGET_DIR/exposes.mjs


#FIXME extended.mjs:
# fz and tz need to be fixed as:
# const tz = _toZigbee.default.converters;
# const fz = _objectSpread(_objectSpread({}, _fromZigbee.default.converters), {}, {
