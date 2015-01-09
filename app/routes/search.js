import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    "tags": { refreshModel: false }
  },

  model: function(params, transition){
    if( params.tagsName && params.tagsName.length ){
      var dbUrl = '/api/ingredient';
      var url = dbUrl + '?keys=' + params.tagsName.join(',');
      return ic.ajax.request( url ).then(function(json){
        return json.map( function(item){
          var id = item._id;
          delete item._id;
          item.id = id;
          return item;
        });
      })
    } else {
      return Em.A();
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
