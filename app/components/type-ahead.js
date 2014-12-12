import Ember from 'ember';


export default Ember.Component.extend({
  classNames:['type-ahead-container'],
  tags:[],
  actions: {
    tagSelect: function(tag){
      this.addTag( tag );
    }
  },

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
    $tagEl.remove();
  },

  addTag: function( tag ){
    var self = this;
    var tags = this.get('tags');
    var hasTag = tags.any( function( t ){ return tag.id === t.id; });

    if( hasTag ){
      var $tagEl = this.$('[data-tag-id="' + tag.id + '"]');
      if( $tagEl.data('transitioning') ) return;
      $tagEl
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated wobble')
        });
      $tagEl.addClass('animated wobble');
    } else {
      this.get('tags').pushObject(tag);

      var $tag = $('<div class="th-tag cc-input"/>').html( tag.value );
      this.$('.twitter-typeahead').append( $tag );
      var tagWidth = $tag.outerWidth();
      var tagHeight = $tag.outerHeight();
      var originPos = $tag.offset();
      $tag.detach();

      var $wrapper = $('<div class="tag-wrapper"/>')
        .attr('data-tag-id', tag.id)
        .data('transitioning', true)
        .append( $tag );

      $wrapper.css({
        width: tagWidth,
        height: tagHeight
      });

      this.$('.tag-container').append( $wrapper );
      var destinationPos = $wrapper.offset();

      $tag.css({
        width: 300,
        'background-color': tag.color,
        'border-color': tag.color,
        'z-index': 2000,
        position: 'absolute',
        top: originPos.top,
        left: originPos.left
      });

      $tag.animate({
        width: tagWidth,
        'border-radius': '20px',
      }, 500,'easeOutQuint', function(){

        $(this).animate({
          position: 'absolute',
          top: destinationPos.top,
          left: destinationPos.left
        },600,'easeOutCubic',function(){
          $(this)
            .css({
              'top': 0,
              'left': 0
            })
            .parent()
            .one('click', function(){
              self.removeTag($(this));
            })
            .css('position','relative')
            .data('transitioning', false);
        });

      });
    }
  }

});
