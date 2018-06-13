'use strict';

const express = require('express'),
          app = express(),
         path = require('path'),
      request = require('request'),
        fetch = require('node-fetch'),
         cors = require('cors'),
         port = process.env.PORT || 8080,
    buildPath = path.join(__dirname, '..', '/build');

app.use(express.static(buildPath))

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, '/index.html'))
})

app.get('/results.html', (req, res) => {
  console.log(req.query);
  
  const options = {
    url: 'https://api.yelp.com/v3/businesses/search?term=casual&latitude=43.013689799999995&longitude=-85.6809432',
    headers: {
      Authorization: 'Bearer FZT0wp1cxArlPNMOP5DC6jxQwnsP0IHTX5rvu23cknJJ5QU8QsfoFsSzZCVpdxnuv-t2bjEkrYusk_qC5s6pacop-FKGLbNTE194dmljTuAEYRhBlOT7cYHlmi8YW3Yx'
    }
  }
  const callback = (err, resp, body) => {
    console.log(resp);
    console.log(body);
    res.json(body)
  }

  // request(options, callback)



  res.sendFile(path.join(buildPath, 'www/results.html'))
  
})

app.get('/api/restaurants/v1', (req, res) => {

  const request = function() {
    let url = 'https://api.yelp.com/v3/businesses/search?term=italian&latitude=43.013689799999995&longitude=-85.6809432'
    let options = {
      headers: {
        Authorization: 'Bearer FZT0wp1cxArlPNMOP5DC6jxQwnsP0IHTX5rvu23cknJJ5QU8QsfoFsSzZCVpdxnuv-t2bjEkrYusk_qC5s6pacop-FKGLbNTE194dmljTuAEYRhBlOT7cYHlmi8YW3Yx'
      },
      method: 'GET',
    }
    
    return fetch(url, options)
      .then(resp => resp.json())
      .catch(err => console.error('error', err))
  }
  let data = request()
  request().then(data => {
    res.json({
      success: true,
      data: data
    })
  })

})

app.get('/api/restaurants/v2', (req, res) => {

  return new Promise((resolve, reject) => {
    const request = function() {
      let url = 'https://api.yelp.com/v3/businesses/search?term=italian&latitude=43.013689799999995&longitude=-85.6809432'
      let options = {
        headers: {
          Authorization: 'Bearer FZT0wp1cxArlPNMOP5DC6jxQwnsP0IHTX5rvu23cknJJ5QU8QsfoFsSzZCVpdxnuv-t2bjEkrYusk_qC5s6pacop-FKGLbNTE194dmljTuAEYRhBlOT7cYHlmi8YW3Yx'
        },
        method: 'GET',
      }
      
      return fetch(url, options)
        .then(resp => resp.json())
        .catch(err => console.error('error', err))
    }

    
    request()
      .then(data => {
        console.log('test');
        resolve(() => {
          res.send({
            success: false,
            data: data
          })
        })
      })
      .catch(err => console.error(err.message))
  })

})

app.get('/api/dummy_restaurant_data/v2', (req, res) => {
  console.log(req.headers);
  const request = function() {
    let url = req.headers.url
    let options = {
      headers: {
        Authorization: 'Bearer FZT0wp1cxArlPNMOP5DC6jxQwnsP0IHTX5rvu23cknJJ5QU8QsfoFsSzZCVpdxnuv-t2bjEkrYusk_qC5s6pacop-FKGLbNTE194dmljTuAEYRhBlOT7cYHlmi8YW3Yx'
      },
      method: 'GET',
    }
    
    return fetch(url, options)
      .then(resp => resp.json())
      .catch(err => console.error('error', err))
  }
  let data = request()
  request().then(data => {
    console.log(`Number of restaurants returned: ${data.businesses.length}`);
    res.json(data.businesses)
  })


})

app.get('/api/dummy_restaurant_data', (req, res) => {

  const dummyData = [
    {
    id: "o_eIQwbDjwE2ZA5ea700pg",
    alias: "amore-trattoria-italiana-comstock-park",
    name: "Amore Trattoria Italiana",
    image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/JcNCeWvYCzHDiINR0zEIrg/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/amore-trattoria-italiana-comstock-park?adjust_creative=ghQ8oaCJuPo_Jvq9rTvXfQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ghQ8oaCJuPo_Jvq9rTvXfQ",
    review_count: 150,
    categories: [
    {
    alias: "italian",
    title: "Italian"
    },
    {
    alias: "pizza",
    title: "Pizza"
    }
    ],
    rating: 4,
    coordinates: {
    latitude: 43.05592,
    longitude: -85.68818
    },
    transactions: [ ],
    price: "$$",
    location: {
    address1: "5080 Alpine Ave",
    address2: "",
    address3: "",
    city: "Comstock Park",
    zip_code: "49321",
    country: "US",
    state: "MI",
    display_address: [
    "5080 Alpine Ave",
    "Comstock Park, MI 49321"
    ]
    },
    phone: "+16167855344",
    display_phone: "(616) 785-5344",
    distance: 4749.97850092526
    },
    {
    id: "DZaz_256HxDfqbG00igv7A",
    alias: "osteria-rossa-grand-rapids",
    name: "Osteria Rossa",
    image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/VCqQypQ6ScDt1gIKHLt0yQ/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/osteria-rossa-grand-rapids?adjust_creative=ghQ8oaCJuPo_Jvq9rTvXfQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=ghQ8oaCJuPo_Jvq9rTvXfQ",
    review_count: 113,
    categories: [
    {
    alias: "italian",
    title: "Italian"
    },
    {
    alias: "diners",
    title: "Diners"
    },
    {
    alias: "pizza",
    title: "Pizza"
    }
    ],
    rating: 4,
    coordinates: {
    latitude: 42.9637856619613,
    longitude: -85.6730074206147
    },
    transactions: [ ],
    price: "$$",
    location: {
    address1: "16 Monroe C NE",
    address2: "",
    address3: "",
    city: "Grand Rapids",
    zip_code: "49503",
    country: "US",
    state: "MI",
    display_address: [
    "16 Monroe C NE",
    "Grand Rapids, MI 49503"
    ]
    },
    phone: "+16169889350",
    display_phone: "(616) 988-9350",
    distance: 5663.859154645845
    }
    ]

  res.send(dummyData)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, '/index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on port: ${port} -> http://localhost:${port}`);
})