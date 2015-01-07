import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    refreshRoute: function(){
      this.refresh();
    }
  },

  model: function(){
    var tags = this._super.apply( this, arguments );
    if( tags && tags.length > 1 ){
      return this.get('recipeSearcher').getRecepies( tags.mapBy('value'), true );
    } else {
      return Em.A();
    }
  }
});
