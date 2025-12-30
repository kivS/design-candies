#! /usr/bin/env sh

# Usage: bin/dev.sh [port]
# If a port is provided, use it; otherwise default to 3000.

PORT="${1:-3000}"

PORT="$PORT" bun run --watch index.ts