#! /usr/local/bin/bash

PORT=8080 \
ENV=DEV \
YELP_API_KEY='Bearer FZT0wp1cxArlPNMOP5DC6jxQwnsP0IHTX5rvu23cknJJ5QU8QsfoFsSzZCVpdxnuv-t2bjEkrYusk_qC5s6pacop-FKGLbNTE194dmljTuAEYRhBlOT7cYHlmi8YW3Yx' \
nodemon server/server.js
