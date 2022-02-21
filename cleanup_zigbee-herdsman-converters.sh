#!/bin/bash

TARGET_DIR=$1/@babel

rm -f `find $TARGET_DIR -name "*.md"`
rm -f `find $TARGET_DIR -name "LICENSE"`
rm -f `find $TARGET_DIR -name "package.json"`
rm -f `find $TARGET_DIR -name "*.map"`
rm -f `find $TARGET_DIR -name "*.ts"`
rm -f `find $TARGET_DIR -name "*.MD"`
rm -rf `find $TARGET_DIR -name "node_modules"`
