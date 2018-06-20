define('Initialize', 
[
/* 1 */ 'jquery', 
/* 2 */ 'underscore',
/* 3 */ 'backbone',
/* 4 */ 'QuestionViewModel',
/* 5 */ 'QuestionsView',
/* 6 */ 'ResultsView',
/* 7 */ 'DetailsView',
], function(
/* 1 */ $, 
/* 2 */ _,
/* 3 */ Backbone,
/* 4 */ QuestionViewModel,
/* 5 */ QuestionsView,
/* 6 */ ResultsView,
/* 7 */ DetailsView,
){

  // Initialize the Application
  const initialize = function() {

    Backbone.View.prototype.close = function(){
      this.remove();
      this.unbind();
      if (this.onClose) { this.onClose() }
    }

    class AppViewManager {
      constructor() {
        this.subViews = []
      }
      newAppView(view) {
        if (this.currentView) {
          this.currentView.close()
        }
        if (this.subViews.length > 0) {
          this.subViews.forEach(view => view.close())
          this.subViews = []
        }
        this.currentView = view
        this.renderView(this.currentView)

        $('#App').html(this.currentView.$el)
      }
      newSubView(subView) {
        this.subViews.push(subView)
        this.renderView(subView)
      }
      renderView(view) {
        view.render()
      }
      registerSubView(subView) {
        this.subViews.push(subView)
      }
    }
    let appViewManager = new AppViewManager()



    // initialize state
    const AppState = Backbone.Model.extend({
      defaults: {
        questions: {}
      }
    })
    let state = new AppState()
    
    // initialize router
    const Router = Backbone.Router.extend({

      initialize: function() {
        this.AppData = {
          eventBus: _.extend({}, Backbone.Events),
          router: this,
          state: state,
          appViewManager: appViewManager
        }
        Backbone.Model.prototype.AppData = this.AppData

        this.questionViewModel = new QuestionViewModel({ AppData: this.AppData })
      },

      routes: {
        '': 'questionsView',
        'questions': 'questionsView',
        'restaurant/(:id)': 'restaurantView',
        'details': 'detailsView',
        '*path': 'default', // default route
      },

      default: function() {
        let view = new QuestionsView({ AppData: this.AppData })
        appViewManager.newAppView(view)
        view.initializeChildModelsAndViews()
      },
  
      questionsView: function() {
        let view = new QuestionsView({ AppData: this.AppData })
        appViewManager.newAppView(view)
        view.initializeChildModelsAndViews()
      },
  
      detailsView: function() {
        let view = new DetailsView({ AppData: this.AppData })
        appViewManager.newAppView(view)
        view.initializeChildModelsAndViews()
      },
  
      restaurantView: function(id) {
        let view = new ResultsView({ model: this.AppData.state.resultsModel, AppData: this.AppData })
        appViewManager.newAppView(view)
        view.initializeChildModelsAndViews()
      },

      start: function() {
        Backbone.history.start({ 
          pushState: true,
          root: '/'
        })
      }
    })
    let router = new Router()
    router.start()
  

  
  }

  return {
    initialize: initialize
  }
})