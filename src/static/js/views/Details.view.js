define('DetailsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'RestaurantsCollectionView',
  /* 5 */ 'MapView',
  /* 6 */ 'RestaurantsCollectionColl',
  /* 7 */ 'RestaurantModel',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ RestaurantsCollectionView,
  /* 5 */ MapView,
  /* 6 */ RestaurantsCollection,
  /* 7 */ RestaurantModel,
){

  const DetailsView = Backbone.View.extend({

    tagName: 'section',
    className: 'details-view__section',
    id: 'details-view__section',

    initialize: function(options) {
      this.AppData = options.AppData
      // this.render()

      this.AppData.eventBus.on('test', this.test, this)
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

    test: function() {
      console.log('event bus triggered');
      this.displayCollection()
    },

    render: function() {
      this.$el.html(`
        <div id="details-view__map" class="details-view__map"></div>
        <ul id="details-view__ul" class="details-view__ul"></ul>
        <script id="details-view__template" type="text/html">
          <h4>{{ name }}</h4>
          <span class="restaurant-details__elem">Price: {{ price }}</span>
          <span class="restaurant-details__elem">Rating: {{ rating }}</span>
          <span class="restaurant-details__elem">Address: {{ location.address1 }}</span>
          <button class="btn-general restaurant-details__btn">More Info</button>
        </script>
      `)
      
      // this.AppData.eventBus.trigger('test')

      
      // if (!this.AppData.state.collection) {
      //   this.fetchAndDisplay()
      // }
      // else {
      //   this.displayCollection()
      // }

      return this
    },

    displayCollection: function() {
      // let mapView = new MapView({ AppData: this.AppData })
      // let restaurantsCollectionView = new RestaurantsCollectionView({ collection: this.AppData.state.collection, AppData: this.AppData })
      // $('#details-view__section').append(restaurantsCollectionView.render().$el)
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
          this.displayCollection()
        })
      .catch(err => console.error(err))
    }

  })

  return DetailsView
})