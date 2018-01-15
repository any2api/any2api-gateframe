#!/bin/bash
set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

function build {
    pushd $1
    npm i && npm run build
    popd
}

build packages/common
build packages/grpc-adapter
build packages/grpc-connector
build packages/gateframe
