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
                <span class="questions-li__span">Within how many miles should the restaraunt be?</span>
                <input id="questions-form__radius" class="questions-li__input" type="number" step="1" min="1" max="25">
              </li>
              <li class="questions-li">
                <span class="questions-li__span">What is your budget?</span>
                <select id="questions-form__price" class="questions-li__input" name="price">
                  <option value="any">Who cares, I'm rich</option>
                  <option value="1">$</option>
                  <option value="2">$$</option>
                  <option value="3">$$$</option>
                  <option value="4">$$$$</option>
                </select>
              </li>
              <div class="questions-li__submit-btn-container">
                  <input class="questions-li__submit-btn" type="submit" value="Find Me Food!">
              </div>
              <div class="form-error-messages">
                <p class="form-error-messages__01">Radius required.</p>
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
    }
  })

  return QuestionsView
})