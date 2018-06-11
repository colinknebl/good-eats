define('RestaurantsCollectionView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
){

  const RestaurantsCollectionView = Backbone.View.extend({
    initialized: function() {
      console.log('restaurantsCollectionView initiated');
    }
  })

  return RestaurantsCollectionView

})