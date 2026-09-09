#!/usr/bin/env bash
# Shared project-local runtime configuration.
set -euo pipefail
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"
export MISE_DATA_DIR="$PROJECT_ROOT/.local/share/mise"
export MISE_CACHE_DIR="$PROJECT_ROOT/.local/cache/mise"
export MISE_STATE_DIR="$PROJECT_ROOT/.local/state/mise"
export MISE_CONFIG_DIR="$PROJECT_ROOT/.local/config/mise"
export MISE_TRUSTED_CONFIG_PATHS="$PROJECT_ROOT/mise.toml"
export BUNDLE_USER_HOME="$PROJECT_ROOT/.local/bundle"
export BUNDLE_PATH="$PROJECT_ROOT/vendor/bundle"
export PATH="$PROJECT_ROOT/.local/bin:$PATH"
MISE_BIN="$PROJECT_ROOT/.local/bin/mise"
if [[ ! -x "$MISE_BIN" ]]; then
  echo "Please run ./scripts/setup first." >&2
  exit 1
fi
