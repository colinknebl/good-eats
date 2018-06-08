define('RestaurantsCollection', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'RestaurantModel',
  /* 5 */ 'Router',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ RestaurantModel,
  /* 5 */ Router,
){

  const RestaurantsCollection = Backbone.Collection.extend({

    model: RestaurantModel,

    url: 'http://localhost:8080/api/dummy_restaurant_data/v2',
    yelpQueryUrl: '',

    initialize: function(options) {
     /**
      * The collection is initialized from Questions.view.js when the questions form is submitted
      */
      _.bindAll(this, 'fetch')
      
      this.yelpQueryUrl = options.yelpQueryUrl
      this.router = options.router
    },

    fetch: function() {
      /**
       * This method is called from Questions.view.js
       */

      let options = {
        headers: {
          url: this.yelpQueryUrl
        },
      }

      console.table({
        apiUrl: this.url,
        yelpQueryUrl: this.yelpQueryUrl
      })

      fetch(this.url, options)
        .then(response => response.json())
        .then(data => {
          data.map(rest => {
            let restaurantModel = new RestaurantModel({
              id: rest.id,
              name: rest.name,
              image_url: rest.image_url,
              is_closed: rest.is_closed,
              url: rest.url,
              rating: rest.rating,
              coordinates: {
                latitude: rest.coordinates.latitude,
                longitude: rest.coordinates.longitude
              },
              location: {
                address1: rest.location.address1,
                address2: rest.location.address2,
                address3: rest.location.address3,
                city: rest.location.city,
                zip_code: rest.location.zip_code,
                country: rest.location.country,
                state: rest.location.state,
                display_address: rest.location.display_address
              },
              phone: rest.phone,
              display_phone: rest.display_phone,
              distance: rest.distance
            })
          })
        })
        .then(() => this.router.navigate('/details', {trigger: true}))
        .catch(err => console.error(err))
    }
  })

  return RestaurantsCollection
})