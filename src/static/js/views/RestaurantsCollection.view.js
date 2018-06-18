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

    initialize: function(options) {
      this.AppData = options.AppData
    },

    render: function() {
      let self = this
      this.collection.map(restaurant => {
        let restaurantModelView = new RestaurantModelView({ model: restaurant, AppData: this.AppData })
        self.AppData.appViewManager.registerSubView(restaurantModelView)
        self.$el.append(restaurantModelView.render().$el)
      })

      return this
    }
  })

  return RestaurantsCollectionView

})