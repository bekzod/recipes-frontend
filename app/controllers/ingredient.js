import Ember from 'ember';

var host = 'http://recipes-bek.s3.amazonaws.com/ingredients';

export default Ember.Controller.extend({
  images: function(){
    var name = this.get('model.image');
    if( name ){
      return {
        original: host + '/original/' + name,
        blured: host + '/blured/' + name
      }
    }
  }.property('model.image')
});
