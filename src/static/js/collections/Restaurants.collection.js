define('RestaurantsCollectionColl', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'RestaurantModel',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ RestaurantModel,
){

  const RestaurantsCollection = Backbone.Collection.extend({

    model: RestaurantModel,

    // url: 'http://localhost:8080/api/get_restaurant_collection/',
    url: 'http://127.0.0.1:8080/api/get_restaurant_collection/',

    yelpQueryUrl: '',

    initialize: function(options) {
     /**
      * The collection is initialized from Questions.view.js when the questions form is submitted
      */
      this.AppData = options.AppData
      this.yelpQueryUrl = this.AppData.state.get('yelpQueryUrl')
    },

    fetch: function(data) {
      /**
       * This method is called from Questions.view.js
       */
      let options = {
        headers: {
          url: this.yelpQueryUrl,
          'min-rating': data.minRating
        },
      }

      return fetch(this.url, options)
    }
  })

  return RestaurantsCollection
})