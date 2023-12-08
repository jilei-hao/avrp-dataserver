
# Send a POST request to the data route with local file
for f in ./external_data/*.nii.gz; do
  curl -X POST -H "Content-Type: multipart/form-data" \
  -F "file=@$f" \
  -F "path=." \
  -F "filename=$(basename $f)" \
  -w "\n" \
  localhost:7070/data
done


# Generate a random string using openssl
# openssl rand -base64 32