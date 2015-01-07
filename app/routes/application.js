import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    loading: function(){
      NProgress.start();
    },
    didTransition: function(){
      NProgress.done();
    }
  },

  queryParams: {
    "tags": { refreshModel: true }
  },

  model: function(params, transition){
    if( params.tagsName && params.tagsName.length ){
      var dbUrl = '/api/db/ingredients/_design/ingredients/_view/by_permutation';
      var queryString = [
        'include_docs=true',
        'keys=["' + params.tagsName.join('","') + '"]'
      ].join('&');
      var url = dbUrl + '?' + queryString;

      return ic.ajax.request( url )
        .then(function(json){
          var a = json.rows.map( function(obj){
            return {
              id: obj.doc._id,
              color: obj.doc.color,
              value: obj.doc.name
            }
          });
          return Em.A(a);
        });
    } else {
      return [];
    }
  },

  deserializeQueryParam: function(value, urlKey, defaultValueType) {
    if (defaultValueType === 'boolean') {
      return (value === 'true') ? true : false;
    } else if (defaultValueType === 'number') {
      return (Number(value)).valueOf();
    } else if (defaultValueType === 'array') {
      return Ember.A(value.split('-'));
    }
  },

  serializeQueryParam: function(value, urlKey, defaultValueType) {
    if (defaultValueType === 'array') {
      return value.join('-');
    }
    return '' + value;
  }

});
