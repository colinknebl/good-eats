define('ResultsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'ResultsRestaurantView',
  /* 6 */ 'tpl!./templates/results_view.tpl.html',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ ResultsRestaurantView,
  /* 6 */ ResultsViewHtmlTemplate,
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
      this.$el.html(ResultsViewHtmlTemplate())

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
  })

  return ResultsView
})