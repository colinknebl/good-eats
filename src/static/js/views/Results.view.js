define('ResultsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
){

  const ResultsView = Backbone.View.extend({

    initialize: function(options) {
      console.log('results view options:', options);
    },

    render: function() {
      this.$el.html(`
        <section id="results-view__section" class="results-view__section">
          <img class="results-view__img" src="" alt="image url">
          <div class="results-view__details"></div>
          <script id="results-view__template" type="text/html">
            <h2>{{ name }}</h2>
            <span class="results-view__details-elem">Price: {{ price }}</span>
            <span class="results-view__details-elem">Rating: {{ rating }}</span>
            <span class="results-view__details-elem results-view__details-elem--block">{{ display_phone }}</span>
            <span class="results-view__details-elem results-view__details-elem--block">
              <address>
                {{ location.display_address }}
              </address>
            </span>
          </script>
          <div class="results-view__btn-section">
            <button class="results-view__btn-section-btn">Previous</button>
            <button class="results-view__btn-section-btn">Next</button>
          </div>
        </section>
      `)
      console.log('this', this);
      let template = $('#results-view__template').html()
      let html = Mustache.render(template, this.model.toJSON())
      $('.results-view__img').attr('src', this.model.get('image_url'))
      $('.results-view__details').html(html)

      return this
    }
  })

  return ResultsView
})