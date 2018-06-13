define('QuestionsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone',
  /* 4 */ 'mustache',
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone,
  /* 4 */ Mustache,
){

  const QuestionsView = Backbone.View.extend({

    // el: $('.questions-form'),
    // el: $('#questions-view__template'),

    events: {
      'submit': 'onFormSubmit'
    },


    initialize: function(options) {
      _.bindAll(this, 'onFormSubmit', 'render')
      this.AppData = options.AppData

      this.AppData.eventBus.on('locationResolved', this.locationResolved, this)

      this.render()

      // Clear out any existing cached collection
      if (this.AppData.state.collection) { this.AppData.state.collection = null }
      // Check to see if any coordinates have been cached
      if (this.AppData.state.get('hasCoords')) { this.enableBtn() }
    },

    locationResolved: function() {
      this.enableBtn()
    },

    enableBtn: function() {
      $('.questions-li__submit-btn').attr('disabled', false)
      $('.questions-view__location-load-container').toggleClass('hide')
    },

    render: function() {
      this.$el.html('')
      this.$el.append(`
        <section id="questions-view__section">
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
              <div class="questions-li__submit-btn-container">
                  <input class="questions-li__submit-btn" type="submit" value="Find Me Food!" disabled="true">
              </div>
              <div class="questions-view__location-load-container">
                <div class="questions-view__location-load-animation">
                  <span class="location-load-animation__elem elem-1"></span>
                  <span class="location-load-animation__elem elem-2"></span>
                  <span class="location-load-animation__elem elem-3"></span>
                </div>
                <p>Getting your location...</p>
              </div>
            </ul>
          </form>
        </section>
      `)

      return this
    },

    onFormSubmit: function(e) {
      /**
       * This method fires when the form is submitted
       * TODO: If the geolocation data is not resolved, do not allow the form to be submitted.
       */
      e.preventDefault()

      const data = {
        term: $('#questions-form__term').val(),
        radius: this.convertMilesToMeters($('#questions-form__radius').val()),
        price: $('#questions-form__price').val()
      }
      /**
       * Set state question data
       */
      for (let key in data) {
        this.AppData.state.attributes.questions[key] = data[key]
      }
      this.AppData.state.set('yelpQueryUrl', this.buildYelpQueryUrl(data))


      /**
       * Re-route to details page
       */
      this.AppData.router.navigate('/details', { trigger: true })
    },

    convertMilesToMeters: function(miles) {
      return miles * 1600
    },

    buildYelpQueryUrl: function(data) {
      /**
       * TODO: Verify and refactor the buildYelpQueryUrl function
       * 
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
    }
  })

  return QuestionsView
})