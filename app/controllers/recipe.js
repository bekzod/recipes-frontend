import Ember from 'ember';

export default Ember.Controller.extend({
  imageUrl: function(){
    var name = this.get('model.image')
    return name ? '/api/' + name : null;
  }.property('model.image')

});
