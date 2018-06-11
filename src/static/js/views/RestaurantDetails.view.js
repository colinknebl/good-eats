define('RestaurantDetailsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
){

  const RestaurantDetailsView = Backbone.View.extend({
    initialize: function() {
      console.log('restaurantDetailsView initialized');
    }
  })

  return RestaurantDetailsView

})