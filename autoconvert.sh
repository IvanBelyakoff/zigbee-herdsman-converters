#!/bin/bash

TARGET_DIR=./dist

./init.sh $TARGET_DIR
./convert_lib.sh $TARGET_DIR
./convert_converters.sh $TARGET_DIR
./convert_mancode.sh $TARGET_DIR
./convert_index.sh $TARGET_DIR
./convert_devices.sh $TARGET_DIR
./copy_dependencies.sh $TARGET_DIR
./cleanup_zigbee-herdsman-converters.sh $TARGET_DIR
