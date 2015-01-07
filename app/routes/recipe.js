import Ember from 'ember';

export default Ember.Route.extend({

  serialize: function(model){
    return {
      recipe: model._id
    }
  }

});
