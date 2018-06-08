requirejs.config({

  baseUrl: 'static/js',

  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    mustache: 'lib/mustache',
    Initialize: 'app',
    Router: 'router',
    // Collections
    RestaurantsCollection: 'custom/scripts',
    // Models
    RestaurantModel: 'custom/scripts',
    QuestionViewModel: 'custom/scripts',
    // Views
    MapView: 'custom/scripts',
    QuestionsView: 'custom/scripts',
    ResultsView: 'custom/scripts',
    DetailsView: 'custom/scripts',
    RestaurantDetailsView: 'custom/scripts',
    RestaurantModelView: 'custom/scripts',
    RestaurantCollectionView: 'custom/scripts',
  }
});

require(['Initialize'], function(Initialize){
  Initialize.initialize()
})
