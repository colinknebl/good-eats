define('ResultsView', [
  /* 1 */ 'jquery', 
  /* 2 */ 'underscore', 
  /* 3 */ 'backbone'
], function(
  /* 1 */ $, 
  /* 2 */ _, 
  /* 3 */ Backbone
){

  const ResultsView = Backbone.View.extend({
    render: function() {
      console.log(document.location);
      this.$el.html('Results View')

      return this
    }
  })

  return ResultsView
})