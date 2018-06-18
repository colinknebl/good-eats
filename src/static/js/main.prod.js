requirejs.config({

  baseUrl: '',

  paths: {
    jquery: 'lib/js/jquery',
    underscore: 'lib/js/underscore',
    backbone: 'lib/js/backbone',
    mustache: 'lib/js/mustache',
    // Initialize: 'app',
    // Collections
    // RestaurantsCollectionColl: 'custom/scripts',
    // // Models
    // AnimationModel: 'custom/scripts',
    // SubmitButtonModel: 'custom/scripts',
    // RestaurantModel: 'custom/scripts',
    // QuestionViewModel: 'custom/scripts',
    // NoteModel: 'custom/scripts',
    // // Views
    // MapView: 'custom/scripts',
    // QuestionsView: 'custom/scripts',
    // ResultsView: 'custom/scripts',
    // DetailsView: 'custom/scripts',
    // RestaurantDetailsView: 'custom/scripts',
    // RestaurantModelView: 'custom/scripts',
    // RestaurantsCollectionView: 'custom/scripts',
    // ResultsRestaurantView: 'custom/scripts',
    // SubmitButtonView: 'custom/scripts',
    // AnimationView: 'custom/scripts',
    // NoteGettingLocationView: 'custom/scripts'
  }
});

require(['Initialize'], function(Initialize){
  Initialize.initialize()
})
