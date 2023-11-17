#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CONFIGURATION="Release"
PROJECT_DIR="$SCRIPT_DIR/../WasmStripBug"

pushd "$PROJECT_DIR"

dotnet publish -c "$CONFIGURATION" WasmStripBug.csproj

popd
