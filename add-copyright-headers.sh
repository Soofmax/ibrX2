#!/usr/bin/env bash
# Add SmarterLogicWeb copyright headers to source files.
# - Detect file type by extension
# - Skip files already containing SmarterLogicWeb header
# - Skip vendor/build folders

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

skip_dir() {
  case "$1" in
    *node_modules*|*dist*|*build*|*.git*|*.next*|*.cache*|*coverage*) return 0 ;;
    *) return 1 ;;
  esac
}

has_header() {
  # Check first 10 lines for SmarterLogicWeb
  head -n 10 "$1" 2>/dev/null | grep -qi "SmarterLogicWeb"
}

prepend_header_ts() {
  local file="$1"
  local tmp="$(mktemp)"
  cat > "$tmp" <<'EOF'
/**
 * @file Auto-added header — see repository README for details
 * @author SmarterLogicWeb
 * @copyright 2025 SmarterLogicWeb. All rights reserved.
 * @license MIT
 * @see {@link https://smarterlogicweb.com}
 */
EOF
  cat "$file" >> "$tmp"
  mv "$tmp" "$file"
}

prepend_header_css() {
  local file="$1"
  local tmp="$(mktemp)"
  cat > "$tmp" <<'EOF'
/**
 * Auto-added header — see repository README for details
 * @author SmarterLogicWeb
 * @copyright 2025 SmarterLogicWeb. All rights reserved.
 * @see https://smarterlogicweb.com
 */
EOF
  cat "$file" >> "$tmp"
  mv "$tmp" "$file"
}

process_file() {
  local f="$1"
  # Skip binary/large files by size (>1MB) as a safety
  if [ "$(stat -c%s "$f" 2>/dev/null || echo 0)" -gt 1048576 ]; then
    return
  fi
  if has_header "$f"; then
    return
  fi
  case "$f" in
    *.ts|*.tsx|*.js|*.jsx) prepend_header_ts "$f" ;;
    *.css|*.scss) prepend_header_css "$f" ;;
    *) ;; # ignore other types
  esac
}

export -f skip_dir has_header prepend_header_ts prepend_header_css process_file

# Iterate files
while IFS= read -r -d '' file; do
  # Skip known directories
  dir="$(dirname "$file")"
  if skip_dir "$dir"; then
    continue
  fi
  process_file "$file"
done < <(find "$ROOT_DIR" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.scss" \) -print0)

echo "Headers applied where missing."