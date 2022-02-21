#!/bin/bash

TARGET_DIR=$1/devices

if [ ! -d $TARGET_DIR ]; then
    mkdir -p $TARGET_DIR
fi

#0. Delete leftovers
rm -rf $TARGET_DIR/*.mjs

#0.5
echo "Selecting only needed devices..."
cp -f devices/sunricher.js $TARGET_DIR
cp -f devices/xiaomi.js $TARGET_DIR
cp -f devices/tuya.js $TARGET_DIR
cp -f devices/sonoff.js $TARGET_DIR
cp -f devices/ikea.js $TARGET_DIR

#1. Run npx babel from zigbee-herdsman-convertes dir:
echo "Running npx..."
npx babel $TARGET_DIR --out-dir $TARGET_DIR --ignore $TARGET_DIR/@babel

#2. Replace all babel/runtime/helpers import with babel/runtime/esm/helpers:
echo "Replacing helpers with proper import..."
python3 ./replace_helpers_with_esm.py $TARGET_DIR
#0. Remove ota lines
echo "Removing ota lines..."
python3 ./remove_ota.py $TARGET_DIR
#3. Rename all *.js to *.mjs with mmv command:
echo "Renaming all the JS files...."
# mmv $TARGET_DIR/*.js $TARGET_DIR/*.mjs
# zmv -W $TARGET_DIR/*.js $TARGET_DIR/*.mjs
for filename in $TARGET_DIR/*.js; do
    withoutExt=$(basename $filename ".js")
    mv "$filename" $TARGET_DIR/"$withoutExt.mjs"
    uppercaseBasename=${withoutExt^^}
    #Add the file to index.mjs to make it available for import. Only those files are imported
    echo "export { default as $uppercaseBasename } from '$withoutExt.mjs';" >> $TARGET_DIR/index.mjs
done
#4. Move Object.defineProperty lower than exports definition by running:
echo "Moving around object.defineProperty..."
python3 ./move_object_define.py $TARGET_DIR
#5. Fix exports:
echo "Fixing exports..."
# python3 ./fix_exports_devices.py $TARGET_DIR
python3 ./fix_exports_3.py $TARGET_DIR

#FIXME
# Manually change thw way things are exported from lib/extend.js
# And check if li/extend.js is exported via 'export { extend }'
#Maybe consider some other way to export/import

# import * as __extend from "../lib/extend.mjs";
# let _extend = { default: __extend.extend }
