define('NoteModel', [
  /* 1 */ 'jquery',
  /* 2 */ 'underscore',
  /* 3 */ 'backbone',
], function(
  /* 1 */ $,
  /* 2 */ _,
  /* 3 */ Backbone,
) {

  const NoteModel = Backbone.Model.extend({

    defaults: {
      hide: true,
      text: 'Getting your location...'
    },

    initialize: function() {
      this.listenTo(this.AppData.eventBus, 'locationResolved', this.locationResolved)
      this.listenTo(this.AppData.eventBus, 'formSubmitted', this.formSubmitted)
      this.listenTo(this.AppData.eventBus, 'noResults', this.noResults)
    },

    locationResolved: function() {
      this.set({
        hide: true,
        text: 'location resolved'
      })
    },

    formSubmitted: function() {
      this.set({
        hide: false,
        text: 'Searching for restaurants...'
      })
    },

    noResults: function() {
      this.set({
        hide: false,
        text: 'There are no local restaurants that meet your search criteria. Please edit your search criteria and search again.'
      })
    }
  })

  return NoteModel
})