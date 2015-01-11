import Ember from 'ember';
import ClickOutsideMixin from '../mixins/click-outside';

var host = 'http://recipes-bek.s3.amazonaws.com/blured/';

export default Ember.Component.extend({
  classNames: ['recipe-item'],
  attributeBindings: ['style'],

  style: function(){
    return 'background:' + this.get('background') + ' center center no-repeat;';
  }.property('background'),

  background: function(){
    var image = this.get('image');
    if( image ){
      return 'url(' + host + image + ')';
    } else {
      return '';
    }
  }.property('image'),

});
