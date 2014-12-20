import Ember from 'ember';

export default Ember.Object.extend({
  dbUrl: '/api/db/recipies/_design/recipes/_view/by_ingredients2',
  makeQuery: function( ingredients ){
    return [
      'limit=8',
      'group_level=' + ingredients.length,
      'startkey=["' + ingredients.join('","') + '"]',
      'endkey=["' + ingredients.join('","') + '",{}]'
    ].join('&');
  },

  // currentRequest: null,
  // currentIngrediants: [],

  // initSearch: function( ingredients ){
  //   this.set('currentIngrediants', ingredients);
  // },

  // getResults: function(){
  //   var ingredients = this.get('currentIngrediants');
  //   return this.set('currentRequest', this.getRecepies( ingredients ) );
  // },

  getRecepies: function( ingredients ){
    var url = this.get('dbUrl') + '?' + this.makeQuery( ingredients );
    return ic.ajax.request( url ).then( function(json){
      return Em.A(json.rows[0].value);
    });
  }
});
