define('AnimationView', [
  /* 1 */ 'jquery',
  /* 2 */ 'underscore',
  /* 3 */ 'backbone',
], function(
  /* 1 */ $,
  /* 2 */ _,
  /* 3 */ Backbone,
) {

  const AnimationView = Backbone.View.extend({

    initialize: function(options) {
      this.AppData = options.AppData

      this.model.on('change', this.render, this)

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
      this.$el.html(this.html)
      
      return this
    },

    html: `
      <div class="questions-view__animation-elem-container">
        <span class="location-load-animation__elem elem-1"></span>
        <span class="location-load-animation__elem elem-2"></span>
        <span class="location-load-animation__elem elem-3"></span>
      </div>
    `,
  })

  return AnimationView

})

// <!--<p class="animation-container--searching">Searching for restaurants...</p>
// <p class="animation-container--no-results">There are no local restaurants that meet your search criteria. Please edit your search criteria and search again.</p>-->
