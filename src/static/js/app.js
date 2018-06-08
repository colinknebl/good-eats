define('Initialize', 
[
/* 1 */ 'jquery', 
/* 2 */ 'underscore',
/* 3 */ 'backbone',
/* 4 */ 'Router',
/* 5 */ 'RestaurantModel',
/* 6 */ 'QuestionsView',
/* 7 */ 'QuestionViewModel',
/* 8 */ 'RestaurantsCollection',
], function(
/* 1 */ $,
/* 2 */ _,
/* 3 */ Backbone,
/* 4 */ Router,
/* 5 */ RestaurantModel,
/* 6 */ QuestionsView,
/* 7 */ QuestionViewModel,
/* 8 */ RestaurantsCollection,
){

  // Initialize the Application
  const initialize = () => {

    // initialize router
    const router = new Router()
    Backbone.history.start()


    const questionViewModel = new QuestionViewModel()


    // const restaurantsCollection = new RestaurantsCollection()
    // console.log('restaurantsCollection',restaurantsCollection);
    // restaurantsCollection.fetch()



    const questionsView = new QuestionsView({ model: questionViewModel, router: router })
    questionsView.render()
  }

  return {
    initialize: initialize
  }
})