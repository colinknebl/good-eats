define('MapView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone'
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone
){

  const MapView = Backbone.View.extend({
    initialize: function(options) {
      this.AppData = options.AppData

      let restaurantsArray = this.AppData.state.collection.reduce((accumulatedArray, restaurantModel) => {
        let displayAddress = restaurantModel.attributes.location.display_address.reduce((accumulator, current) => {
          return accumulator + ' ' + current
        }, '')
        return accumulatedArray.concat(displayAddress)
      }, [])

      /**
       * Initialize MapQuest map
       */
      L.mapquest.key = '17vSwD2AqynJiisNGkfTjVBmEILs7SA9'

      let self = this
      let map = L.mapquest.map('details-view__map', {
        center: [self.AppData.state.get('latitude'), self.AppData.state.get('longitude')],
        layers: L.mapquest.tileLayer('map'),
        zoom: 5
      })
      
      L.mapquest.geocoding().geocode(restaurantsArray, createBasicGeocodingLayer);
      
      function createBasicGeocodingLayer(err, response) {
        map.addLayer(L.mapquest.geocodingLayer({
          geocodingResponse: response
        }));
      }
      
    }
  })

  return MapView

})