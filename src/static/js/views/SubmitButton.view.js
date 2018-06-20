define('SubmitButtonView', [
  /* 1 */ 'jquery',
  /* 2 */ 'underscore',
  /* 3 */ 'backbone',
  /* 4 */ 'SubmitButtonModel',
], function(
  /* 1 */ $,
  /* 2 */ _,
  /* 3 */ Backbone,
  /* 4 */ SubmitButtonModel,
) {

  const SubmitButtonView = Backbone.View.extend({

    initialize: function(options) {
      this.AppData = options.AppData
      this.model = new SubmitButtonModel()
      
      this.listenTo(this.model, 'change', this.render)

      // Check to see if any coordinates have been cached, if coordinated have been cached, enable submit button
      if (this.AppData.state.get('hasCoords')) {
        this.model.set('enableButton', true)
      }
    },

    render: function() {
      !this.model.get('enableButton') 
        ? this.$el.attr('disabled', true) 
        : this.$el.removeAttr('disabled')

      return this
    },

  })

  return SubmitButtonView

})
