import Ember from 'ember';
import ClickOutsideMixin from '../mixins/click-outside';

export default Ember.Component.extend(ClickOutsideMixin,{
  classNames: ['recipe-item'],
  isTagsHidden: true,
  listenForClickOutside: true,

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
    $container.width( (totalWidth / 3) + 30 );
  }.on('didInsertElement'),

});
