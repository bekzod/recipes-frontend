import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    refreshRoute: function(){
      this.refresh();
    }
  },
  modelOffset: 0,
  model: function(){
    console.warn();
    var tags = this._super.apply( this, arguments );
    if( tags && tags.length > 1 ){
      return this.get('recipeSearcher').getRecepies( tags.mapBy('value') );
    } else {
      return Em.A();
    }
  }


});
