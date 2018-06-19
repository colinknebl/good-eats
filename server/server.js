'use strict';

const express = require('express'),
          app = express(),
         path = require('path'),
      request = require('request'),
        fetch = require('node-fetch'),
         cors = require('cors'),
         port = process.env.PORT || 8080,
   yelpApiKey = process.env.YELP_API_KEY,
    indexPath = process.env.ENV === 'PROD' ? path.join(__dirname, '..', '/client') : path.join(__dirname, '..', '/build')

// Register Middleware
app.use(express.static(indexPath))
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.join(indexPath, '/index.html'))
})

app.get('/api/get_restaurant_collection/', (req, res) => {
  let minRating = req.headers['min-rating']
  if (minRating !== '') {
    minRating = parseFloat(minRating)
  }

  const request = function() {
    let url = req.headers.url
    let options = {
      headers: {
        Authorization: yelpApiKey
      },
      method: 'GET',
    }
    return fetch(url, options)
      .then(resp => resp.json())
      .catch(err => console.error('error', err))
  }
  request()
    .then(data => {
      if (typeof minRating === 'number') {
        let restaurants = data.businesses.filter(rest => rest.rating >= minRating)
        res.json(restaurants)
      }
      else {
        res.json(data.businesses)
      }
    })
})

app.get('/api/test', (req, res) => {
  res.send('API test successful')
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port} => http://localhost:${port}`);
})