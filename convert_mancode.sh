#!/bin/bash

TARGET_DIR=$1
TARGET_FILE_BASENAME=manufacturerCode
TARGET_FILE_EXT=js
TARGET_FILE=$TARGET_FILE_BASENAME.$TARGET_FILE_EXT

if [ ! -d $TARGET_DIR ]; then
    mkdir -p $TARGET_DIR
fi

#0. Delete leftovers
rm -rf $TARGET_DIR/$TARGET_FILE_BASENAME*

#0.5. Copy manufacturerCode.js from proper place to this dir
cp ./bWave_deps/manufacturerCode.js . #TODO Copy from proper project
cp -rav ./bWave_deps/mancodes .
#1. Run npx babel from zigbee-herdsman-convertes dir:
echo "Running npx..."
npx babel --config-file ./mancodes/.babelrc $TARGET_FILE -o $TARGET_DIR/$TARGET_FILE
#2. Replace all babel/runtime/helpers import with babel/runtime/esm/helpers:
# echo "Replacing helpers with proper import..."
# python3 ./replace_helpers_with_esm.py $TARGET_DIR/$TARGET_FILE
# #2.5
# echo "Fixing exports..."
#
sed -i 's/exports.default/const exports = { default: {} }\nexports.default/gI' $TARGET_DIR/$TARGET_FILE
#
# echo -e "\n
# export default exports;" >> $TARGET_DIR/$TARGET_FILE

#3. Rename all *.js to *.mjs with mmv command:
echo "Renaming all the JS files...."
# mmv $TARGET_DIR/*.js $TARGET_DIR/*.mjs
# zmv -W $TARGET_DIR/*.js $TARGET_DIR/*.mjs
# for filename in $TARGET_DIR/*.js; do
#     withoutExt=$(basename $filename ".js")
    mv $TARGET_DIR/$TARGET_FILE $TARGET_DIR/$TARGET_FILE_BASENAME.mjs
# done
#4. Move Object.defineProperty lower than exports definition by running:
echo "Moving around Object.defineProperty..."
python3 ./move_object_define_mancodes.py $TARGET_DIR/$TARGET_FILE_BASENAME.mjs
# 'Object.defineProperty(exports, "__esModule", {
#   value: true
# });' "var exports = "
#5. Fix exports:
echo "Fixing exports..."
python3 ./fix_exports_3.py $TARGET_DIR/$TARGET_FILE_BASENAME.mjs
