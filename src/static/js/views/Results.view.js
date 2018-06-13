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

    },

    render: function() {
      this.$el.html(`
        <section id="results-view__section" class="results-view__section">
          <img class="results-view__img" src="" alt="image url">
          <div class="results-view__details"></div>
          <script id="results-view__template" type="text/html">
            <span class="results-view__details-elem details-elem__header"><h2>{{ name }}</h2></span>
            <span class="results-view__details-elem details-elem__price">Price: {{ price }}</span>
            <span class="results-view__details-elem details-elem__rating">Rating: {{ rating }}</span>
            <span class="results-view__details-elem results-view__details-elem--block details-elem__display-phone">{{ display_phone }}</span>
            <span class="results-view__details-elem results-view__details-elem--block details-elem__address">
              <address>
                <span class="results-view__address-elem">{{ location.address1 }}</span>
                <span class="results-view__address-elem">{{ location.address2 }}</span>
                <span class="results-view__address-elem">{{ location.city }}, {{ location.state }} {{ location.zip_code }}</span>
              </address>
            </span>
          </script>
          <div class="results-view__btn-section">
            <button class="results-view__btn-section-btn">Previous</button>
            <button class="results-view__btn-section-btn">Next</button>
          </div>
        </section>
      `)

      let template = $('#results-view__template').html()
      let html = Mustache.render(template, this.model.toJSON())
      $('.results-view__img').attr('src', this.model.get('image_url'))
      $('.results-view__details').html(html)

      return this
    }
  })

  return ResultsView
})