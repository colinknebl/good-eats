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
      this.AppData = options.AppData
      this.template = options.template
    },

    render: function() {
      let html = Mustache.render(this.template, this.model.toJSON())
      $('.results-view__img').attr('src', this.model.get('image_url'))
      $('.results-view__details').html(html)

      return this
    }
  })

  return ResultsRestaurantView
})