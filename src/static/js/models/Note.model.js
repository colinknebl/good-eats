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
      this.AppData.eventBus.on('locationResolved', this.locationResolved, this)
      this.AppData.eventBus.on('formSubmitted', this.formSubmitted, this)
      this.AppData.eventBus.on('noResults', this.noResults, this)
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