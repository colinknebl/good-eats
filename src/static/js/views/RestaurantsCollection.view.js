define('RestaurantsCollectionView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'RestaurantsCollectionColl',
  /* 6 */ 'RestaurantModelView',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ RestaurantsCollection,
  /* 6 */ RestaurantModelView,
){

  const RestaurantsCollectionView = Backbone.View.extend({

    tagName: 'ul',
    id: 'details-view__ul',
    className: 'details-view__ul',

    initialize: function(options) {
      this.AppData = options.AppData

      // this.collection.on('add', this.add, this)
    },

    // add: function(a,b,c) {
    //   console.log('adding...');
    //   console.log(a,b,c);
    // },

    render: function() {
      let self = this
      this.collection.map(restaurant => {
        let restaurantModelView = new RestaurantModelView({ model: restaurant, AppData: this.AppData })
        self.$el.append(restaurantModelView.render().$el)
      })
      return this
    }
  })

  return RestaurantsCollectionView

})