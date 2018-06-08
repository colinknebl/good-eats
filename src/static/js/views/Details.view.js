define('DetailsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone'
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone
){

  const DetailsView = Backbone.View.extend({
    render: function() {
      this.$el.html('Details View')

      return this
    }
  })

  return DetailsView
})