import Ember from 'ember';


export default Ember.Component.extend({
  classNames:['type-ahead-container'],
  tags:[],
  actions: {
    tagSelect: function(tag){
      var tags = this.get('tags');
      var hasTag = tags.any( function( t ){
        return tag.id === t.id;
      });

      if( hasTag ){
        var $tagEl = this.$('[data-tag-id="' + tag.id + '"]');
        $tagEl
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated wobble')
          });
        $tagEl.addClass('animated wobble');
      } else {
        this.get('tags').pushObject(tag);
        this.addTag( tag );
        this.set('inputValue','');
      }
    }
  },


  addTag: function( tag ){
    var $tag = $('<div class="th-tag cc-input"/>').html( tag.value );
    this.$('.twitter-typeahead').append( $tag );
    var tagWidth = $tag.outerWidth();
    var tagHeight = $tag.outerHeight();
    var originPos = $tag.offset();
    $tag.detach();

    var $wrapper = $('<div class="tag-wrapper"/>')
      .attr('data-tag-id', tag.id)
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
      'border-radius': '20px'
    }, 500,'easeOutQuint', function(){

      $(this).animate({
        'position': 'absolute',
        top: destinationPos.top,
        left: destinationPos.left
      },800,'easeOutCubic',function(){
        $(this).css({
          'position': 'static',
        })
      });

    });
  }

});
