#!/bin/bash

curl -H "Content-Type: application/json" --data '{"build": true}' -X POST https://registry.hub.docker.com/u/n3phtys/cervisia-container/trigger/1c0e5275-a16a-403d-a899-737733ef0ee6/
