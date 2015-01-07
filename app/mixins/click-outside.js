import Ember from 'ember';

export default Ember.Mixin.create({
  listenForClickOutside: false,
  clickOutside: Em.K,

  _handleClickOutside: function(e){
    if( !this.$().find(e.target).length ){
      this.clickOutside(e);
    }
  },

  _listenForClickOutsideDidChange: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      if (this.get('listenForClickOutside')) {
        this._attachEvent();
      } else {
        this._detachEvent();
      }
    });
  }.observes('listenForClickOutside').on('didInsertElement'),

  _attachEvent: function(){
    $(window).on('mousedown', $.proxy(this._handleClickOutside, this));
  },

  _detachEvent: function(){
    $(window).off('mousedown', this._handleClickOutside );
  },

  willDestroyElement: function(){
    this._detachEvent();
    this._super.apply(this, arguments);
  }
});
