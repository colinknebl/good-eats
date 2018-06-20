requirejs.config({

  baseUrl: 'static/js',

  paths: {
    tpl: 'lib/tpl',
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    mustache: 'lib/mustache',
    Initialize: 'app',
    Router: 'router',
    // Collections
    RestaurantsCollectionColl: 'custom/scripts',
    // Models
    AnimationModel: 'custom/scripts',
    SubmitButtonModel: 'custom/scripts',
    RestaurantModel: 'custom/scripts',
    QuestionViewModel: 'custom/scripts',
    NoteModel: 'custom/scripts',
    // Views
    MapView: 'custom/scripts',
    QuestionsView: 'custom/scripts',
    ResultsView: 'custom/scripts',
    DetailsView: 'custom/scripts',
    RestaurantModelView: 'custom/scripts',
    RestaurantsCollectionView: 'custom/scripts',
    ResultsRestaurantView: 'custom/scripts',
    SubmitButtonView: 'custom/scripts',
    AnimationView: 'custom/scripts',
    NoteGettingLocationView: 'custom/scripts'
  }
});

require(['Initialize'], function(Initialize){
  Initialize.initialize()
})
