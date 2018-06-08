define('QuestionViewModel', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'RestaurantModel',
  /* 5 */ 'RestaurantsCollection',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ RestaurantModel,
  /* 5 */ RestaurantsCollection,
){

  const QuestionViewModel = Backbone.Model.extend({
    defaults: {
      foo: 'bar',
      term: null,
      radius: null,
      price: null,
      latitude: null,
      longitude: null,
    },

    initialize: function() {
      // Get location of user
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.set('latitude', position.coords.latitude)
        this.set('longitude', position.coords.longitude)
      })
    },
  })

  return QuestionViewModel

})