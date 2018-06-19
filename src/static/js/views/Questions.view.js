define('QuestionsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
  /* 5 */ 'RestaurantsCollectionColl',
  /* 6 */ 'RestaurantModel',
  /* 7 */ 'SubmitButtonView',
  /* 8 */ 'SubmitButtonModel',
  /* 9 */ 'AnimationView',
  /* 10 */ 'AnimationModel',
  /* 11 */ 'NoteModel',
  /* 12 */ 'NoteView',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
  /* 5 */ RestaurantsCollection,
  /* 6 */ RestaurantModel,
  /* 7 */ SubmitButtonView,
  /* 8 */ SubmitButtonModel,
  /* 9 */ AnimationView,
  /* 10 */ AnimationModel,
  /* 11 */ NoteModel,
  /* 12 */ NoteView,
){

  const QuestionsView = Backbone.View.extend({

    tagName: 'section',
    id: 'questions-view__section',

    events: {
      'submit': 'onFormSubmit'
    },


    initialize: function(options) {
      console.log('questions view initialized');
      this.AppData = options.AppData
      
      // Clear out any existing cached collection
      let x = this.AppData.state
      if (x.collection || x.restaurantIds) { 
        x.collection = null
        x.restaurantIds = null 
      }
    },

    initializeChildModelsAndViews: function() {
      console.log('questions view children initialized');
      let submitButtonModel = new SubmitButtonModel()
      let submitButtonView = new SubmitButtonView({ 
        el: '.questions-li__submit-btn', 
        AppData: this.AppData,
        model: submitButtonModel
      })
      this.AppData.appViewManager.newSubView(submitButtonView)

      let animationModel = new AnimationModel()
      let animationView = new AnimationView({ 
        el: '.questions-view__animation-container', 
        AppData: this.AppData,
        model: animationModel
      })
      this.AppData.appViewManager.newSubView(animationView)

      let noteModel = new NoteModel()
      let noteView = new NoteView({
        el: '.questions-view__notes-container',
        AppData: this.AppData,
        model: noteModel
      })
      this.AppData.appViewManager.newSubView(noteView)
    },

    render: function() {
      this.$el.html(this.html)

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

    html: `
      <form class="questions-form">
        <ul class="questions-list">
          <li class="questions-li">
            <span class="questions-li__span">What are you in the mood for?</span>
            <select id="questions-form__term" class="questions-li__input" name="term">
              <option value="american">American</option>
              <option value="breweries">Breweries</option>
              <option value="casual">Casual</option>
              <option value="chinese">Chinese</option>
              <option value="italian">Italian</option>
              <option value="mediterranean">Mediterranean</option>                
              <option value="polish">Polish</option>
            </select>
          </li>
          <li class="questions-li">
            <span class="questions-li__span">How far are you willing to travel?</span>
            <input id="questions-form__radius" class="questions-li__input" type="number" step="1" min="1" max="25" placeholder="Max 25 miles">
          </li>
          <li class="questions-li">
            <span class="questions-li__span">What is your budget?</span>
            <select id="questions-form__price" class="questions-li__input" name="price">
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="any">Who cares, I'm rich</option>
            </select>
          </li>
          <li class="questions-li">
            <span class="questions-li__span">What is the minimum rating desired?</span>
            <input id="questions-form__min-rating" class="questions-li__input" type="number" step="0.5" min="1" max="5" placeholder="1 - 5 (e.x. 4.5)">
          </li>
        </ul>
        <div class="questions-li__submit-btn-container">
          <input class="btn-general questions-li__submit-btn" type="submit" value="Find Me Food!" disabled="true">
        </div>
        <div class="questions-view__animation-container"></div>
        <div class="questions-view__notes-container"></div>
      </form>
    `,
  })

  return QuestionsView
})