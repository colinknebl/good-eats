define('RestaurantModelView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'ResultsView',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ ResultsView,
){

  const RestaurantModelView = Backbone.View.extend({

    tagName: 'li',
    className: 'details-view__li',

    events: {
      'click': 'onClick'
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
      let view = new ResultsView({ el: $('#App'), model: this.model, AppData: this.AppData })
      this.AppData.router.navigate('/restaurant/' + this.model.get('id'), { trigger: true })
      view.render()
    }
  })

  return RestaurantModelView

})