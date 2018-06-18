define('SubmitButtonModel', [
  /* 1 */ 'jquery',
  /* 2 */ 'underscore',
  /* 3 */ 'backbone',
], function(
  /* 1 */ $,
  /* 2 */ _,
  /* 3 */ Backbone,
) {

  const SubmitButtonModel = Backbone.Model.extend({

    defaults: {
      enableButton: false,
    },

    initialize: function() {
      this.AppData.eventBus.on('locationResolved', this.setEnableBtn, this)
    },

    setEnableBtn: function() {
      this.set('enableButton', true)
    }
  })

  return SubmitButtonModel


})