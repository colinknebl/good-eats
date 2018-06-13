define('ResultsRestaurantView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
){

  const ResultsRestaurantView = Backbone.View.extend({

    initialize: function(options) {
      console.log('results restaurant view options:', options);
    },

    render: function() {
      
      return this
    }
  })

  return ResultsRestaurantView
})