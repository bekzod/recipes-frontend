import Ember from 'ember';
import ClickOutsideMixin from '../mixins/click-outside';

export default Ember.Component.extend(ClickOutsideMixin,{
  classNames: ['recipe-item'],
  isTagsHidden: true,
  listenForClickOutside: true,

  clickOutside: function(e){
    console.warn('test');
  },

  click: function(e){
    var isTagsHidden = this.toggleProperty('isTagsHidden');

    var $container = $(e.target).parents('.tags-container')
    if( $container[0] ){
      $container.stop(true).animate({
        'max-width': isTagsHidden ? '30%' : '80%'
      },800);
    }
  },

  adjustSizeOfItemContainer: function(){

  }.on('didInsertElement'),

});
