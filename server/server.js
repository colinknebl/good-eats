'use strict';

const express = require('express'),
          app = express(),
         path = require('path'),
         port = process.env.PORT || 8080,
    buildPath = path.join(__dirname, '..', '/build');

app.use(express.static(buildPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, '/index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
})