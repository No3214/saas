#!/usr/bin/env bash
# Generate up to 20 raw.githubusercontent.com URLs for files under n8n-templates/
REPO_USER="No3214"
REPO="saas"
BRANCH="main"
DIR="n8n-templates"
COUNT=20

if [ ! -d "$DIR" ]; then
  echo "Directory '$DIR' not found."
  exit 1
fi

find "$DIR" -type f | sed -n "1,${COUNT}p" | while read -r f; do
  # remove leading ./ if any
  path="${f#./}"
  echo "https://raw.githubusercontent.com/$REPO_USER/$REPO/$BRANCH/$path"
done
