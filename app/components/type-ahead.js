import Ember from 'ember';

/*global $ */
export default Ember.Component.extend({
  classNames: ['type-ahead-container'],

  actions: {
    tagSelect: function(tag){
      this.addTag( tag );
    }
  },

  makeTags: function(){
    this.get('tags').forEach( function(tag){
      this.createTag(tag);
    }, this);
  }.on('didInsertElement'),

  removeTag: function( $tagEl ){
    var tags = this.get('tags');
    var tagId = $tagEl.data('tag-id');
    var index;
    for (var i = tags.length - 1; i >= 0; i--) {
      if( tags[i].id === tagId ){
        index = i;
        break;
      }
    };
    tags.removeAt(index);

    $tagEl
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).remove();
      })
      .addClass('animated bounceOut');
  },

  addTag: function( tag ){
    var tags = this.get('tags');
    var hasTag = tags.any( function( t ){ return tag.id === t.id; });

    if( hasTag ){
      var $tagEl = this.$('[data-tag-id="' + tag.id + '"]');
      if( $tagEl.data('transitioning') ) return;
      $tagEl
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated wobble')
        })
        .addClass('animated wobble');
    } else {
        this.get('tags').pushObject(tag);
        this.createTag(tag, true);
    }
  },

  createTag: function(tag, isAnimated){
    var self = this;
    var $tag = $('<div class="th-tag cc-input"/>')
      .text( tag.name )
      .appendTo( this.$('.twitter-typeahead') );

    var tagWidth = $tag.outerWidth()+1;
    var tagHeight = $tag.outerHeight();
    var originPos = $tag.offset();

    $tag
      .detach()
      .css({
        'background-color': tag.color,
        'border-color': tag.color,
        'border-radius': 20
      });

    var $wrapper = $('<div class="tag-wrapper"/>')
      .attr('data-tag-id', tag.id)
      .css({
        width: tagWidth,
        height: tagHeight
      })
      .one('click', function(){
        self.removeTag($(this));
      })
      .append( $tag )
      .appendTo( this.$('.tag-container') );

    if( isAnimated ){
      var destinationPos = $wrapper.offset();
      $wrapper.data('transitioning', true)
      $tag.css({
        width: 300,
        'z-index': 2000,
        'border-radius': 8,
        position: 'absolute',
        top: originPos.top,
        left: originPos.left
      })
      .animate({
        width: tagWidth,
        'border-radius': 20
      }, 600,'easeOutQuint', function(){

        $(this).animate({
          position: 'absolute',
          top: destinationPos.top,
          left: destinationPos.left
        },800,'easeOutCubic',function(){
          $(this)
            .css({ 'top': 0, 'left': 0 })
            .parent()
            .css('position','relative')
            .data('transitioning', false);
        });
      });
    }
  },

});
