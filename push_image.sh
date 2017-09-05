#!/bin/bash

COMMIT=$(git rev-parse --short HEAD)
PROJECT_ID="$(gcloud config get-value project)"
PROJECT_NAME="sporthub-backend"

docker build -t gcr.io/${PROJECT_ID}/${PROJECT_NAME}:v_${COMMIT} .

gcloud docker -- push gcr.io/${PROJECT_ID}/${PROJECT_NAME}:v_${COMMIT}
