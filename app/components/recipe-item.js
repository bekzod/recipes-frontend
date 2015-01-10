import Ember from 'ember';
import ClickOutsideMixin from '../mixins/click-outside';

// var imagePath = 'http://recipes-bek.s3.amazonaws.com/images/';
var imagePath = '/api/blured/';
export default Ember.Component.extend(ClickOutsideMixin,{
  classNames: ['recipe-item'],
  attributeBindings: ['style'],
  isTagsHidden: true,
  listenForClickOutside: true,

  style: function(){
    return 'background:' + this.get('background') + ' center center no-repeat;';
  }.property('background'),

  background: function(){
    var image = this.get('image');
    if( image ){
      return 'url(' + imagePath + image + ')';
    } else {
      return '';
    }
  }.property('image'),

  clickOutside: function(e){
    this.set('isTagsHidden', true);
  },

  click: function(e){
    var $container = $(e.target).parents('.tags-container')
    if( $container.length ){
      this.toggleProperty('isTagsHidden');
    }
  },

  tagShowHide: function(){
    var isTagsHidden = this.get('isTagsHidden');
    this.$('.tags-container').stop(true).animate({
      'max-width': isTagsHidden ? '35%' : '60%'
    }, 800, function(){

    }.bind(this));
  }.observes('isTagsHidden'),

  adjustSizeOfItemContainer: function(){
    var totalWidth = 0;
    var $container = this.$('.tags-sub-container');
    $container.find('.tag').each( function(){
      var $this = $(this)
      totalWidth += $this.outerWidth()
        + parseFloat($this.css('margin-left'))
        + parseFloat($this.css('margin-right'));
    });
    $container.width( (totalWidth / 3) + 40 );
  }.on('didInsertElement'),

});
