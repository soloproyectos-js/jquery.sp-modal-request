#!/bin/bash
# This script creates the distribution files. Usage:
# ./make-dist.sh

# remove dist files 
rm -rf dist/*

# compresses JavaScript files
cat \
    src/jquery.sp-modal-request-class.js \
    src/jquery.sp-modal-request-get-class.js \
    src/jquery.sp-modal-request-post-class.js \
    src/jquery.sp-modal-request.js \
| uglifyjs \
    --compress \
    --mangle \
    --preamble "/*! jQuery.spModalRequest v0.1.1 | Copyright (c) 2015 Gonzalo Chumillas | https://github.com/soloproyectos-js/jquery.sp-modal-request/blob/master/LICENSE */" \
    -o dist/jquery.sp-modal-request.min.js
