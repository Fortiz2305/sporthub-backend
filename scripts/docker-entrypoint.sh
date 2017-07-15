#!/bin/bash

export PATH="/app/node_modules/.bin:$PATH"

if [ ! -d "/app/node_modules" ]; then
  npm install
fi

echo "====> Waiting for MongoDB to start"
WAIT=0
while ! nc -z $MONGO_HOST 27017; do
  sleep 1
  WAIT=$(($WAIT + 1))
  if [ "$WAIT" -gt 15 ]; then
    echo "Error: Timeout waiting for MongoDB to start"
    exit 1
  fi
done

exec "$@"


