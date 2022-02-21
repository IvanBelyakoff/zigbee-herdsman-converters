#!/bin/bash

TARGET_DIR=$1

if [ ! -d $TARGET_DIR ]; then
    mkdir -p $TARGET_DIR
fi

TARGET_FILE=$TARGET_DIR/index.mjs

#0. Delete leftovers
rm -rf $TARGET_DIR/index.*js

#0.1. Move file to target dir
echo "Copying file to target dir..."
cp ./index.js $TARGET_DIR/index.js

#0.5.
echo "Removing stuff that causes babel to fail..."
python3 ./remove_fs_path_index.py $TARGET_DIR/index.js

#1. Run npx babel from zigbee-herdsman-convertes dir:
echo "Running npx..."
# npx babel ./index_no_fs_no_path.js --out-dir $TARGET_DIR
npx babel $TARGET_DIR/index.js -o $TARGET_FILE

rm $TARGET_DIR/index.js

#2. Replace all babel/runtime/helpers import with babel/runtime/esm/helpers:
echo "Replacing helpers with proper import..."
python3 ./replace_helpers_with_esm.py $TARGET_FILE

#4. Move Object.defineProperty lower than exports definition by running:
echo "Moving around object.defineProperty..."
python3 ./move_object_define.py $TARGET_FILE

#7. Add neceessary features

echo "
const clustersLookup = new Map();

import * as _vendors from './devices/index.mjs';

// console.log('DEVICES:', JSON.stringify(_devices));
for (const i in _vendors) {
    for (const definition of _vendors[i]) {
        console.log('Adding DEVICE:', JSON.stringify(definition))
        addDefinition(definition);
    }
}

// import { default } as CLUSTERS from './cluster.mjs'
import * as CLUSTERS from './cluster.mjs'

// console.log('Imported CLUSTERS:', JSON.stringify(CLUSTERS))

// for (const i in CLUSTERS.default) {
for (const [key, value] of Object.entries(CLUSTERS.default)) {
    // console.log('CLUSTER:', JSON.stringify(CLUSTERS.default[i]))
    let cl = value
    cl.name = key
    if (!clustersLookup.has(cl)) {
        clustersLookup.set(cl.ID, cl);
        // console.log('Added:', cl.ID, JSON.stringify(cl))
    }
}

function findClusterByID(clusterID) {
    console.log('findClusterByID:', clusterID)

    if (!clusterID) {
        return null;
    }

    return clustersLookup.get(clusterID);
}

_default.findClusterByID = findClusterByID

" >> $TARGET_DIR/index.mjs

#5. Fix exports:
echo "Fixing exports..."
python3 ./fix_exports_3.py $TARGET_FILE

#TODO
#Fix the way exposes is imported into index.mjs
#It does not need setting default as it is already exported as default
#Or fix some other way

# #This is the way the devices ar imported in index.mjs
# import * as _vendors from "./devices/index.mjs";
#
# for (const i in _vendors) {
#     // console.log("DEVICE:", JSON.stringify(_devices[definition]))
#     for (const definition of _vendors[i]) {
#         addDefinition(definition);
#     }
# }
# # devices/index.mjs has the following structure:
# export { default as CREE } from 'cree.mjs';
# export { default as XIAOMI } from 'xiaomi.mjs';
