define('NoteView', [
  /* 1 */ 'jquery',
  /* 2 */ 'underscore',
  /* 3 */ 'backbone',
], function(
  /* 1 */ $,
  /* 2 */ _,
  /* 3 */ Backbone,
) {

  const NoteView = Backbone.View.extend({

    initialize: function(options) {
      this.AppData = options.AppData

      this.listenTo(this.model, 'change', this.render)

      if (!this.AppData.state.get('hasCoords')) {
        this.model.set('hide', false)
      }
    },

    render: function() {

      this.model.get('hide')
        ? this.$el.addClass('hide')
        : this.$el.removeClass('hide')

      this.$el.html(this.model.get('text'))

      return this
    },
  })

  return NoteView

})
