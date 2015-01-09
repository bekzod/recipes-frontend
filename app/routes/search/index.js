import Ember from 'ember';

var url = '/api/recipe';

export default Ember.Route.extend({
  actions: {
    refreshRoute: function(){
      this.refresh();
    }
  },

  model: function(){
    var tags = this._super.apply( this, arguments );
    if( tags && tags.length > 1 ){
      return ic.ajax.request( url + '?keys=' + tags.mapBy('name').join(',') );
    } else {
      return [];
    }
  }

});
