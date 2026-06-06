#!/bin/bash
set -euo pipefail

FFMPEG=/opt/homebrew/bin/ffmpeg
PROJ_DIR="$(cd "$(dirname "$0")/../public/projects" && pwd)"
TARGET_MB=9
MAX_MB=10

cd "$PROJ_DIR"

duration_seconds() {
  local input="$1"
  local dur
  dur=$("$FFMPEG" -i "$input" 2>&1 | awk '/Duration/ {print $2}' | tr -d ',')
  local h m s
  IFS=: read -r h m s <<<"$dur"
  awk -v h="$h" -v m="$m" -v s="$s" 'BEGIN { printf "%.3f", (h*3600)+(m*60)+s }'
}

encode_mp4() {
  local input="$1"
  local output="$2"
  local bitrate_k="$3"

  "$FFMPEG" -y -hide_banner -loglevel error -i "$input" \
    -vf "fps=24,scale=1280:720:flags=lanczos" \
    -an \
    -c:v libx264 \
    -preset medium \
    -b:v "${bitrate_k}k" \
    -maxrate "$((bitrate_k * 11 / 10))k" \
    -bufsize "$((bitrate_k * 2))k" \
    -movflags +faststart \
    -pix_fmt yuv420p \
    "$output"
}

for gif in *.gif; do
  [ -f "$gif" ] || continue
  mp4="${gif%.gif}.mp4"
  src_mb=$(($(stat -f%z "$gif") / 1024 / 1024))
  sec=$(duration_seconds "$gif")
  target_bits=$(awk -v mb="$TARGET_MB" 'BEGIN { printf "%.0f", mb * 1024 * 1024 * 8 * 0.92 }')
  bitrate_k=$(awk -v bits="$target_bits" -v sec="$sec" 'BEGIN { printf "%d", int(bits / sec / 1000) }')

  if [ "$bitrate_k" -lt 400 ]; then
    bitrate_k=400
  fi

  echo "Converting $gif (${src_mb}MB, ${sec}s) -> ${mp4} @ ${bitrate_k}k ..."
  encode_mp4 "$gif" "$mp4" "$bitrate_k"

  out_mb=$(($(stat -f%z "$mp4") / 1024 / 1024))
  echo "  -> ${out_mb}MB"

  if [ "$out_mb" -ge "$MAX_MB" ]; then
    echo "  Re-encoding with lower bitrate..."
    bitrate_k=$(awk -v bits="$target_bits" -v sec="$sec" 'BEGIN { printf "%d", int(bits / sec / 1000 * 0.75) }')
    encode_mp4 "$gif" "$mp4" "$bitrate_k"
    out_mb=$(($(stat -f%z "$mp4") / 1024 / 1024))
    echo "  -> ${out_mb}MB (retry)"
  fi

  if [ "$out_mb" -ge "$MAX_MB" ]; then
    echo "ERROR: $mp4 still >= ${MAX_MB}MB" >&2
    exit 1
  fi
done

echo "All conversions complete."
