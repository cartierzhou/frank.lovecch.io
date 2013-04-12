#!/bin/bash

s3cmd setacl --acl-public s3://frank.lovecch.io --recursive
s3cmd sync _site/ s3://frank.lovecch.io