define('AnimationModel', [
  /* 1 */ 'jquery',
  /* 2 */ 'underscore',
  /* 3 */ 'backbone',
], function(
  /* 1 */ $,
  /* 2 */ _,
  /* 3 */ Backbone,
) {

  const AnimationModel = Backbone.Model.extend({

    defaults: {
      hideAnimation: true,
    },

    initialize: function() {
      this.AppData.eventBus.on('locationResolved', this.locationResolved, this)
      this.AppData.eventBus.on('noResults', this.noResults, this)
      this.AppData.eventBus.on('formSubmitted', this.showAnimation, this)
    },

    showAnimation: function() {
      this.set({
        hideAnimation: false,
      })
      
    },

    noResults: function() {
      this.set({
        hideAnimation: true,
      })
    },
    
    locationResolved: function() {
      this.set({
        hideAnimation: true,
      })
    }
  })

  return AnimationModel


})