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
      var dbUrl = '/api/db/ingredients/_design/main/_view/by_permutation';
      var queryString = [
        'include_docs=true',
        'keys=["' + tags.mapBy('value').join('","') + '"]'
      ].join('&');
      var url = dbUrl + '?' + queryString;
      // return ic.ajax.request( url )
    }
  }


});
