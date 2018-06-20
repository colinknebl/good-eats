define('NoteView', [
  /* 1 */ 'jquery',
  /* 2 */ 'underscore',
  /* 3 */ 'backbone',
  /* 4 */ 'NoteModel',
], function(
  /* 1 */ $,
  /* 2 */ _,
  /* 3 */ Backbone,
  /* 4 */ NoteModel,
) {

  const NoteView = Backbone.View.extend({

    initialize: function(options) {
      this.AppData = options.AppData
      this.model = new NoteModel()

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
