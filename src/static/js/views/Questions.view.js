define('QuestionsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'Router',
  /* 6 */ 'RestaurantsCollection',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ Router,
  /* 6 */ RestaurantsCollection,
){

  const QuestionsView = Backbone.View.extend({

    el: $('.questions-form'),

    events: {
      'submit': 'onFormSubmit'
    },

    initialize: function(options) {
      _.bindAll(this, 'onFormSubmit', 'render')
      this.router = options.router
    },

    onFormSubmit: function(e) {
      /**
       * This method fires when the form is submitted
       */
      e.preventDefault()

      const data = {
        term: $('#questions-form__term').val(),
        radius: this.convertMilesToMeters($('#questions-form__radius').val()),
        price: $('#questions-form__price').val()
      }
      // this.model.set(data)

      let url = this.buildYelpQueryUrl(data)

      let restaurantsCollection = new RestaurantsCollection({ 
        yelpQueryUrl: url,
        router: this.router
      })
      restaurantsCollection.fetch()
    },

    convertMilesToMeters: function(miles) {
      return miles * 1600
    },

    buildYelpQueryUrl: function(data) {
      /**
       * TODO: Verify and refactor the buildYelpQueryUrl function
       */
      let url = 'https://api.yelp.com/v3/businesses/search?'
      let lat = this.model.get('latitude')
      let long = this.model.get('longitude')
      let addAmpersand = false

      if (data.term) {
        url += `term=${data.term}`
        addAmpersand = true
      }
      if (data.radius && data.radius >= 1600) {
        if (addAmpersand) {
          url += `&radius=${data.radius}`
        }
        else {
          url += `radius=${data.radius}`
        }
        addAmpersand = true
      }
      if (data.price && data.price !== 'any') {
        if (addAmpersand) {
          url += `&price=${data.price}`
        }
        else {
          url += `price=${data.price}`
        }
        addAmpersand = true
      }
      if (lat && long) {
        if (addAmpersand) {
          url += `&latitude=${lat}&longitude=${long}`
        }
        else {
          url += `longitude=${long}`
        }
        addAmpersand = true
      }
      return url
    },

    render: function() {

      // let template = $('#app').html()
      // let html = Mustache.render(template)
      // this.$el.html(html)


      return this
    }
  })

  return QuestionsView
})