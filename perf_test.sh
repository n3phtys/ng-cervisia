#!/usr/bin/env bash


cd ../cervisia-server
cargo build

export CERVISIA_WEB_PATH=../ng-cervisia/dist

../cervisia-server/debug/cervisia-server &

SERVER_PROCESS_ID=$!


cd ../ng-cervisia

sleep 10

echo "Testing SPA with protractor on localhost:8080"

ng build --prod && ng e2e --port 8080 --serve false

echo "Done with performance test"

kill $SERVER_PROCESS_ID
