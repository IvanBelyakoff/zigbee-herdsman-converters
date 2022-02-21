#!/bin/bash

TARGET_DIR=$1
TARGET_DIR_LIB=$TARGET_DIR/lib
TARGET_DIR_CONVERTERS=$TARGET_DIR/converters
TARGET_DIR_DEVICES=$TARGET_DIR/devices

if [ ! -d $TARGET_DIR_LIB ]; then
    mkdir -p $TARGET_DIR_LIB
fi

if [ ! -d $TARGET_DIR_CONVERTERS ]; then
    mkdir -p $TARGET_DIR_CONVERTERS
fi

if [ ! -d $TARGET_DIR_DEVICES ]; then
    mkdir -p $TARGET_DIR_DEVICES
fi
