define('RestaurantsCollectionColl', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'RestaurantModel',
  /* 5 */ 'Router',
  /* 6 */ 'DetailsView',
  /* 7 */ 'RestaurantsCollectionView',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ RestaurantModel,
  /* 5 */ Router,
  /* 6 */ DetailsView,
  /* 7 */ RestaurantsCollectionView,
){

  const RestaurantsCollection = Backbone.Collection.extend({

    model: RestaurantModel,

    url: 'http://localhost:8080/api/dummy_restaurant_data/v2',

    yelpQueryUrl: '',

    initialize: function(options) {
     /**
      * The collection is initialized from Questions.view.js when the questions form is submitted
      */
      this.yelpQueryUrl = options.state.get('yelpQueryUrl')
    },

    fetch: function(url) {
      /**
       * This method is called from Questions.view.js
       */

      let options = {
        headers: {
          url: this.yelpQueryUrl
        },
      }

      // console.table({
      //   apiUrl: this.url,
      //   yelpQueryUrl: this.yelpQueryUrl
      // })

      return fetch(this.url, options)
    }
  })

  return RestaurantsCollection
})