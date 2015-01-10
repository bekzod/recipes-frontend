import Ember from 'ember';

export default Ember.Route.extend({
  activate: function() {
    this._super();
    window.scrollTo(0,0);
  },

  model: function(param){
    var url = '/api/recipe/'+ param.recipe;
    return ic.ajax.request( url );
  },

  serialize: function(model){
    return {
      recipe: model._id
    }
  }

});
