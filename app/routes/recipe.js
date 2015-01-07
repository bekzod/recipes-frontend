import Ember from 'ember';

export default Ember.Route.extend({

  model: function(param){
    var url = '/api/db/recipies/'+ param.recipe;
    return ic.ajax.request( url );
  },

  serialize: function(model){
    return {
      recipe: model._id
    }
  }

});
