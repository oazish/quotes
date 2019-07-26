#!/usr/bin/env bash

cd "$(dirname $BASH_SOURCE[0])"
python3 -m http.server --bind localhost 9000
