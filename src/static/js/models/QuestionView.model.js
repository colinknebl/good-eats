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

    initialize: function(options) {
      this.AppData = options.AppData
      
      /**
       * Get GeoLocation of user
       */
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.AppData.state.set('latitude', position.coords.latitude) 
        this.AppData.state.set('longitude', position.coords.longitude)

        this.AppData.state.set('hasCoords', true)

        // trigger custom event when the coordinates are resolved
        this.AppData.eventBus.trigger('locationResolved')
      })
    },
  })

  return QuestionViewModel

})