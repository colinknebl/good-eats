requirejs.config({

  baseUrl: 'static/js',

  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    Initialize: 'app',
    // Collections
    RestaurantsCollection: 'custom/scripts',
    // Models
    RestaurantModel: 'custom/scripts',
    // Views
    MapView: 'custom/scripts',
    QuestionsView: 'custom/scripts',
    RestaurantDetailsView: 'custom/scripts',
    RestaurantModelView: 'custom/scripts',
    RestaurantCollectionView: 'custom/scripts',
  }
});

require(['Initialize'], function(Initialize){
  Initialize.initialize()
})
