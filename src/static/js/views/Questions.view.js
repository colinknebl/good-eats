define('QuestionsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'RestaurantsCollectionColl',
  /* 6 */ 'RestaurantModel',
  /* 7 */ 'SubmitButtonView',
  /* 9 */ 'AnimationView',
  /* 12 */ 'NoteView',
  /* 13 */ 'tpl!./templates/questions_view.tpl.html',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ RestaurantsCollection,
  /* 6 */ RestaurantModel,
  /* 7 */ SubmitButtonView,
  /* 9 */ AnimationView,
  /* 12 */ NoteView,
  /* 13 */ QuestionViewHtmlTemplate,
){

  const QuestionsView = Backbone.View.extend({

    tagName: 'section',
    id: 'questions-view__section',

    events: {
      'submit': 'onFormSubmit'
    },


    initialize: function(options) {
      this.AppData = options.AppData
      
      // Clear out any existing cached collection
      let x = this.AppData.state
      if (x.collection || x.restaurantIds) { 
        x.collection = null
        x.restaurantIds = null 
      }
    },

    initializeChildModelsAndViews: function() {
      let submitButtonView = new SubmitButtonView({ 
        el: '.questions-li__submit-btn', 
        AppData: this.AppData,
      })
      this.AppData.appViewManager.newSubView(submitButtonView)

      let animationView = new AnimationView({ 
        el: '.questions-view__animation-container', 
        AppData: this.AppData,
      })
      this.AppData.appViewManager.newSubView(animationView)

      let noteView = new NoteView({
        el: '.questions-view__notes-container',
        AppData: this.AppData,
      })
      this.AppData.appViewManager.newSubView(noteView)
    },

    render: function() {
      this.$el.html(QuestionViewHtmlTemplate())

      return this
    },

    onFormSubmit: function(e) {
      e.preventDefault()
      this.AppData.eventBus.trigger('formSubmitted')
      
      /**
       * Get form data
       */
      const data = {
        term: $('#questions-form__term').val(),
        radius: this.convertMilesToMeters($('#questions-form__radius').val()),
        price: $('#questions-form__price').val(),
        minRating: $('#questions-form__min-rating').val()
      }
      /**
       * Set state question data
       */
      for (let key in data) {
        this.AppData.state.attributes.questions[key] = data[key]
      }
      this.AppData.state.set('yelpQueryUrl', this.buildYelpQueryUrl(data))
      /**
       * Fetch Restaurants
       */
      let restaurantsCollection = new RestaurantsCollection({ AppData: this.AppData })

      restaurantsCollection.fetch(data)
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
           if (dataCollection.length > 0) {
            // Cache the collection into app state
            this.AppData.state.collection = dataCollection
            // Create an array of just the restaurant IDs - to be used later on the details page
            let restaurantIds = dataCollection.reduce((accumulatedArray, rest) => {
              return accumulatedArray.concat(rest.get('id'))
            }, [])
            this.AppData.state.restaurantIds = restaurantIds
            // Navigate to details page
            this.AppData.router.navigate('/details', { trigger: true })
          }
          else {
            this.AppData.eventBus.trigger('noResults')
          }
        })
      .catch(err => console.error(err))
    },

    convertMilesToMeters: function(miles) {
      return miles * 1600
    },

    buildYelpQueryUrl: function(data) {
      /**
       * Build the Yelp Query URL
       */

      let url = 'https://api.yelp.com/v3/businesses/search?'
      let lat = this.AppData.state.get('latitude')
      let long = this.AppData.state.get('longitude')
      let addAmpersand = false

        if (data.term) {
          url += `term=${data.term}`
          addAmpersand = true
        }
        if (data.radius && data.radius >= 1600) {
          if (addAmpersand) { url += `&radius=${data.radius}` }
          else { url += `radius=${data.radius}` }
          addAmpersand = true
        }
        if (data.price && data.price !== 'any') {
          if (addAmpersand) { url += `&price=${data.price}` }
          else { url += `price=${data.price}` }
          addAmpersand = true
        }
        if (lat && long) {
          if (addAmpersand) { url += `&latitude=${lat}&longitude=${long}` }
          else { url += `longitude=${long}` }
          addAmpersand = true
        }

      return url
    },
  })

  return QuestionsView
})