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
      modelName: 'QuestionsViewModel',
      term: null,
      radius: null,
      price: null,
      latitude: null,
      longitude: null,
    },

    initialize: function(options) {
      this.AppData = options.AppData

      /**
       * Get GeoLocation of user
       */
      window.navigator.geolocation.getCurrentPosition((position) => {
        console.log('location retrieved');
        this.set('latitude', position.coords.latitude)
        this.set('longitude', position.coords.longitude)
        this.AppData.state.set('latitude', position.coords.latitude) 
        this.AppData.state.set('longitude', position.coords.longitude) 
      })
    },
  })

  return QuestionViewModel

})