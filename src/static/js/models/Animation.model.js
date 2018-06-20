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
      this.listenTo(this.AppData.eventBus, 'locationResolved', this.locationResolved)
      this.listenTo(this.AppData.eventBus, 'noResults', this.noResults)
      this.listenTo(this.AppData.eventBus, 'formSubmitted', this.showAnimation)
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