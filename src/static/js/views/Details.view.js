define('DetailsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'RestaurantsCollectionView',
  /* 6 */ 'MapView',
  /* 7 */ 'RestaurantModelView',
  /* 8 */ 'RestaurantsCollectionColl',
  /* 9 */ 'RestaurantModel',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ RestaurantsCollectionView,
  /* 6 */ MapView,
  /* 7 */ RestaurantModelView,
  /* 8 */ RestaurantsCollection,
  /* 9 */ RestaurantModel,
){

  const DetailsView = Backbone.View.extend({

    initialize: function(options) {
      this.AppData = options.AppData
      this.render()
    },

    render: function() {
      this.$el.html(`

      <section id="details-view__section">
        <div id="details-view__map">Map goes here</div>
        <script id="details-view__template" type="text/html">
          <h4>{{ name }}</h4>
          <span class="restaurant-details__elem">Price: {{ price }}</span>
          <span class="restaurant-details__elem">Rating: {{ rating }}</span>
          <span class="restaurant-details__elem">Address: {{ location.address1 }}</span>
          <button class="restaurant-details__btn">More Info</button>
        </script>
      </section>
    
      `)

      if (!this.AppData.state.collection) {
        this.fetchAndDisplay()
      }
      else {
        this.displayCachedCollection()
      }

      return this
    },

    displayCachedCollection: function() {
      let mapView = new MapView({ el: $('#details-view__map'), AppData: this.AppData })
      let restaurantsCollectionView = new RestaurantsCollectionView({ collection: this.AppData.state.collection, AppData: this.AppData })
      $('#details-view__section').append(restaurantsCollectionView.render().$el)
    },

    fetchAndDisplay: function() {

      let restaurantsCollection = new RestaurantsCollection({ state: this.AppData.state })

      restaurantsCollection.fetch()
        .then(response => response.json())
        .then(data => {
          let restaurants = data.map(rest => {
            // console.log(rest);
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
              coordinates: rest.coordinates / 1600,
            })
            return restaurantModel
          })
          return restaurants
        })
        .then(dataCollection => {
          // Cache the collection into app state
          this.AppData.state.collection = dataCollection

          let mapView = new MapView({ el: $('#details-view__map--placeholder'), AppData: this.AppData })
          let restaurantsCollectionView = new RestaurantsCollectionView({ collection: dataCollection, AppData: this.AppData })
          $('#details-view__section').append(restaurantsCollectionView.render().$el)
        })
        .catch(err => console.error(err))
    }
  })

  return DetailsView
})