import Ember from 'ember';

var host = 'http://recipes-bek.s3.amazonaws.com/original/';

export default Ember.Controller.extend({
  imageUrl: function(){
    var name = this.get('model.image');
    return name ? host + name : null;
  }.property('model.image')

});
