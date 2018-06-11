define('DetailsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'RestaurantsCollection',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ RestaurantsCollection,
){

  const DetailsView = Backbone.View.extend({

    initialize: function(options) {
      console.log('DetailsView initialized', options);
      console.log('DetailsView this',this);

      this.collection.on('add', this.onAddRestaurant, this)
    },

    onAddRestaurant: function() {
      console.log('onAddRestaurant');
    },

    render: function() {
      console.log('DetailsView rendering...');
      console.log(this);
      let template = $('#details-view__template').html()
      let html = Mustache.render(template, this.collection.toJSON())
      this.$el.html(html)

      return this
    }
  })

  return DetailsView
})