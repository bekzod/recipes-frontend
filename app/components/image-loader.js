import Ember from 'ember';

export default Ember.Component.extend({
  handleLoading: function(){
    this.$('img')
      .css('opacity', 0)
      .one('load', function() {
        $(this).animate( {opacity:1}, 800);
      });
  }.on('didInsertElement')

});
