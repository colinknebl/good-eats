define('ResultsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'ResultsRestaurantView',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ ResultsRestaurantView,
){

  const ResultsView = Backbone.View.extend({

    tagName: 'section',
    id: 'results-view__section',
    className: 'results-view__section',

    events: {
      'click #prev-btn': 'onPrevBtnClick',
      'click #next-btn': 'onNextBtnClick'
    },

    initialize: function(options) {
      this.AppData = options.AppData

      this.restaurantArray = this.AppData.state.restaurantIds
      this.AppData.state.currentId = this.model.get('id')
      this.AppData.state.currentIndex = this.restaurantArray.indexOf(this.AppData.state.currentId)
    },

    initializeChildModelsAndViews: function() {
      let resultsRestaurantView = new ResultsRestaurantView({
        AppData: this.AppData,
        model: this.AppData.state.resultsModel,
        template: $('#results-view__template').html()
      })
      this.AppData.appViewManager.newSubView(resultsRestaurantView)
    },

    render: function() {
      this.$el.html(this.html)

      return this
    },

    onPrevBtnClick: function() {
      let prev = this.restaurantArray[this.AppData.state.currentIndex - 1] || this.restaurantArray[this.restaurantArray.length - 1]

      let prevModel = this.AppData.state.collection.find(rest => {
        return prev === rest.get('id')
      })
      this.AppData.state.resultsModel = prevModel
      
      this.AppData.router.navigate('/restaurant/' + prevModel.get('id'), { trigger: true })
    },

    onNextBtnClick: function() {
      let next = this.restaurantArray[this.AppData.state.currentIndex + 1] || this.restaurantArray[0]

      let nextModel = this.AppData.state.collection.find(rest => {
        return next === rest.get('id')
      })
      this.AppData.state.resultsModel = nextModel
      
      this.AppData.router.navigate('/restaurant/' + nextModel.get('id'), { trigger: true })
    },

    html: `
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
        <button id="prev-btn" class="btn-general results-view__btn-section-btn">Previous</button>
        <button id="next-btn" class="btn-general results-view__btn-section-btn">Next</button>
      </div>
    `,
  })

  return ResultsView
})