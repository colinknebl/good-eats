define('AnimationView', [
  /* 1 */ 'jquery',
  /* 2 */ 'underscore',
  /* 3 */ 'backbone',
  /* 4 */ 'tpl!./templates/animation_view.tpl.html',
  /* 5 */ 'AnimationModel',
], function(
  /* 1 */ $,
  /* 2 */ _,
  /* 3 */ Backbone,
  /* 4 */ AnimationViewHtmlTemplate,
  /* 5 */ AnimationModel,
) {

  const AnimationView = Backbone.View.extend({

    initialize: function(options) {
      this.AppData = options.AppData
      this.model = new AnimationModel()

      this.listenTo(this.model, 'change', this.render)

      if (!this.AppData.state.get('hasCoords')) {
        this.model.set({
          'hideAnimation': false,
        })
      }
    },

    render: function() {

      if (this.model.get('hideAnimation')) {
        this.$el.addClass('hide')
      }
      else {
        this.$el.removeClass('hide')
      }
      this.$el.html(AnimationViewHtmlTemplate())
      
      return this
    },
  })

  return AnimationView

})
