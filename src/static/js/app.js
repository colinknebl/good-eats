define('Initialize', 
[
/* 1 */ 'jquery', 
/* 2 */ 'underscore',
/* 3 */ 'backbone',
// /* 4 */ 'Router',
/* 5 */ 'RestaurantModel',
/* 6 */ 'QuestionViewModel',
/* 7 */ 'RestaurantsCollection',
/* 8 */ 'QuestionsView',
/* 9 */ 'ResultsView',
/* 10 */ 'DetailsView',
], function(
/* 1 */ jquery, 
/* 2 */ underscore,
/* 3 */ backbone,
// /* 4 */ Router,
/* 5 */ RestaurantModel,
/* 6 */ QuestionViewModel,
/* 7 */ RestaurantsCollection,
/* 8 */ QuestionsView,
/* 9 */ ResultsView,
/* 10 */ DetailsView,
){

  // Initialize the Application
  const initialize = function() {


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
          state: state
        }

        this.questionViewModel = new QuestionViewModel({ AppData: this.AppData })
      },

      routes: {
        '': 'questionsView',
        'questions': 'questionsView',
        'restaurant/:id': 'restaurantView',
        'details': 'detailsView',
        '*path': 'questionsView', // default route
      },
  
      questionsView: function() {
        let view = new QuestionsView({ el: '#App', model: this.questionViewModel, AppData: this.AppData})
        view.render()
      },
  
      restaurantView: function(id) {
        console.log('id', id);
        // let view = new ResultsView({ el: '#App', AppData: this.AppData})
        // view.render()
      },
  
      detailsView: function() {
        let view = new DetailsView({ el: '#App', AppData: this.AppData})
        // rendered from DetailsView initialization function
      },

      start: function() {
        Backbone.history.start({ 
          pushState: true,
          root: '/'
        })
      }
    })
    const router = new Router()
    router.start()
  

  
  }

  return {
    initialize: initialize
  }
})