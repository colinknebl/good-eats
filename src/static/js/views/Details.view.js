define('DetailsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'RestaurantsCollectionView',
  /* 5 */ 'MapView',
  /* 6 */ 'RestaurantsCollectionColl',
  /* 7 */ 'RestaurantModel',
  /* 8 */ 'tpl!./templates/details_view.tpl.html',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ RestaurantsCollectionView,
  /* 5 */ MapView,
  /* 6 */ RestaurantsCollection,
  /* 7 */ RestaurantModel,
  /* 8 */ DetailsViewHtmlTemplate,
){

  const DetailsView = Backbone.View.extend({

    tagName: 'section',
    className: 'details-view__section',
    id: 'details-view__section',

    initialize: function(options) {
      this.AppData = options.AppData
    },

    initializeChildModelsAndViews: function() {
      let mapView = new MapView({ el: 
        '#details-view__map', 
        AppData: this.AppData 
      })
      this.AppData.appViewManager.newSubView(mapView)

      let restaurantsCollectionView = new RestaurantsCollectionView({ 
        el: '#details-view__ul', 
        collection: this.AppData.state.collection, 
        AppData: this.AppData 
      })
      this.AppData.appViewManager.newSubView(restaurantsCollectionView)
    },

    render: function() {
      this.$el.html(DetailsViewHtmlTemplate())

      return this
    },

    fetchAndDisplay: function() {

      let restaurantsCollection = new RestaurantsCollection({ state: this.AppData.state })

      restaurantsCollection.fetch()
        .then(response => response.json())
        .then(data => {
          let restaurants = data.map(rest => {
            let restaurantModel = new RestaurantModel({
              id: rest.id,
              name: rest.name,
              alias: rest.alias,
              is_closed: rest.is_closed,
              url: rest.url,
              rating: rest.rating,
              review_count: rest.review_count,
              image_url: rest.image_url,
              phone: rest.phone,
              display_phone: rest.display_phone,
              distance: rest.distance,
              price: rest.price,
              categories: rest.categories,
              location: rest.location,
              coordinates: rest.coordinates,
            })
            return restaurantModel
          })
          return restaurants
        })
        .then(dataCollection => {
          // Cache the collection into app state
          this.AppData.state.collection = dataCollection
        })
      .catch(err => console.error(err))
    }

  })

  return DetailsView
})