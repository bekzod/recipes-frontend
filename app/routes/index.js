import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params, transition){
    var requests = {};

    if( params.tagsName ){
      var dbUrl = '/api/db/ingredients/_design/main/_view/by_permutation';
      var queryString = [
        'include_docs=true',
        'keys=["' + params.tagsName.join('","') + '"]'
      ].join('&');
      var url = dbUrl + '?' + queryString;

      requests.tags = ic.ajax.request( url )
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
    }

    return Em.RSVP.hash(requests);
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('tags', model.tags );
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
