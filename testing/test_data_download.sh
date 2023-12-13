#! /bin/bash

# This script is used to test the data download functionality.

# download from id and store file at path
for id in {1..5}; do
  curl -X GET \
    -w "\n" \
    -o "./testing/download_file_cache/${id}.nii.gz" \
    localhost:7070/data?id=${id}
done
