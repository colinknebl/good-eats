define('RestaurantModelView', [
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

  const RestaurantModelView = Backbone.View.extend({

    tagName: 'li',
    className: 'details-view__li',

    events: {
      'click .restaurant-details__btn': 'onClick'
    },

    initialize: function(options) {
      this.AppData = options.AppData
    },

    render: function() {

      this.$el.attr('id', this.model.get('id'))

      let template = $('#details-view__template').html()
      let html = Mustache.render(template, this.model.toJSON())
      this.$el.html(html)

      return this

    },

    onClick: function() {
      this.AppData.state.resultsModel = this.model
      this.AppData.router.navigate('/restaurant/' + this.model.get('id'), { trigger: true })
    },
  })

  return RestaurantModelView

})