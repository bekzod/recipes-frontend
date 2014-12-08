import Ember from 'ember';

export default Ember.Component.extend({
  classNames:['type-ahead'],

  actions: {
    completeTag: function(text){
      var tagValue = this.get('inputValue');
      if( tagValue ){
        this.addTag( tagValue );
        this.set('inputValue','');
      }
    }
  },

  addTag: function(){
    var $tag = $('<div class="th-tag"/>').html( this.get('inputValueCorrected') );
    this.$('.input-container').prepend( $tag );
    var tagWidth = $tag.outerWidth();
    var tagHeight = $tag.outerHeight();
    var originPos = $tag.offset();
    $tag.detach();
    var $wraper = $('<div class="tag-wrapper"/>').append($tag);

    $wraper.css({
      width: tagWidth,
      height: tagHeight
    });

    this.$('.tag-container').append( $wraper );
    var destinationPos = $wraper.offset();

    $tag.css({
      width: 300,
      'z-index': 200,
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
  },

  inputValueCorrected:function(){
    return (this.get('inputValue') || ' ').replace(/\s/g,'&nbsp;');
  }.property('inputValue'),

  initElements: function () {

  }.on('init')

});
