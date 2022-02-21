#!/bin/bash

TARGET_DIR=$1
TARGET_DIR_LIB=$TARGET_DIR/lib
TARGET_DIR_CONVERTERS=$TARGET_DIR/converters
TARGET_DIR_DEVICES=$TARGET_DIR/devices

echo "Copying dependencies..."

cp -rav ./bWave_deps/*js $TARGET_DIR

echo "Fixing up events.mjs, status.mjs, etc..."

sed -i 's/"use strict";/"use strict";\
const exports = {};/g' $TARGET_DIR/events.mjs
sed -i 's/"use strict"/"use strict"\
const exports = {};/g' $TARGET_DIR/status.mjs
sed -i 's/"use strict"/"use strict"\
const exports = {};/g' $TARGET_DIR/direction.mjs
sed -i 's/"use strict"/"use strict"\
const exports = {};/g' $TARGET_DIR/foundation.mjs

# echo "Copying babel configs..."
echo "Copying symlinks dependencies"

cp -rav ./bWave_deps/@babel $TARGET_DIR
cd $TARGET_DIR_LIB
ln -snf ../@babel .
ln -snf ../assert.mjs .
cd - && cd $TARGET_DIR_CONVERTERS
ln -snf ../@babel .
cd - && cd $TARGET_DIR_DEVICES
ln -snf ../@babel .
