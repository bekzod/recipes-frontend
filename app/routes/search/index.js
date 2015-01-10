import Ember from 'ember';

var url = '/__proxy/api/recipe';

export default Ember.Route.extend({
  actions: {
    refreshRoute: function(){
      Em.run.next(this,function(){
        this.refresh();
      });
    }
  },

  model: function(){
    var tags = this._super.apply( this, arguments );
    if( tags && tags.length > 1 ){
      var tagNames = tags.mapBy('name');
      return ic.ajax.request( url + '?keys=' + tagNames.join(',') );
    } else {
      return [];
    }
  }
});
