define('Router', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'QuestionsView',
  /* 5 */ 'ResultsView',
  /* 6 */ 'DetailsView',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ QuestionsView,
  /* 5 */ ResultsView,
  /* 6 */ DetailsView,
){

  const Router = Backbone.Router.extend({

    routes: {
      // 'questions': 'questionsView',
      'results': 'resultsView',
      'details': 'detailsView',
    },

    questionsView: () => {
      let view = new QuestionsView({ el: '#App' })
      view.render()
    },

    resultsView: () => {
      let view = new ResultsView({ el: '#App' })
      view.render()
    },

    detailsView: (a,b,c,d) => {
      console.log(a,b,c,d);
      let view = new DetailsView({ el: '#App' })
      view.render()
    }
  })

  return Router

})