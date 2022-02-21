#!/bin/bash

TARGET_DIR=$1/converters

set +e

if [ ! -d $TARGET_DIR ]; then
    mkdir -p $TARGET_DIR
fi

#0. Delete leftovers
rm -rf $TARGET_DIR/*.js
#1. Run npx babel from zigbee-herdsman-convertes dir:
echo "Running npx..."
# npx babel ./converters --out-dir $TARGET_DIR
npx babel --config-file ./babel_config/converters/.babelrc ./converters --out-dir $TARGET_DIR
#2. Replace all babel/runtime/helpers import with babel/runtime/esm/helpers:
echo "Replacing helpers with proper import..."
python3 ./replace_helpers_with_esm.py $TARGET_DIR
#3. Rename all *.js to *.mjs with mmv command:
echo "Renaming all the JS files...."
# mmv ./dist2/lib/*.js ./dist2/lib/*.mjs
# zmv -W ./dist2/lib/*.js ./dist2/lib/*.mjs
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

#6.
echo "Deleting fs.mjs usage..."
python3 ./remove_fs2.py $TARGET_DIR/fromZigbee.mjs

#7 TODO: toZigbee is not yet done for every device! So we just copy
# the one that is currently sufficial for us
cp ./bWave_deps/converters/toZigbee.mjs $TARGET_DIR
