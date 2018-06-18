define('RestaurantModel', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone'
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone
){

  const RestaurantModel = Backbone.Model.extend({
    defaults: {
      id: null,
      name: null,
      image_url: null,
      is_closed: null,
      url: null,
      rating: null,
      coordinates: {
        latitude: null,
        longitude: null
      },
      location: {
        "address1": null,
        "address2": null,
        "address3": null,
        "city": null,
        "zip_code": null,
        "country": null,
        "state": null,
        "display_address": []
    },
    "phone": null,
    "display_phone": null,
    "distance": null
    },

    initialize: function() {}
  })

  return RestaurantModel

})