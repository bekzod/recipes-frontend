import Ember from 'ember';

export default Ember.Object.extend({
  dbUrl: '/api/db/recipies/_design/recipes/_view/by_ingredients2',
  requestSkip: 0,
  requestLimit: 8,

  getRecipes: function( ingredients, exactMatch ){
    var queryString = [
      'skip=' + this.get('requestSkip'),
      'limit=' + this.get('requestLimit'),
    ];

    if( exactMatch ){
      queryString.push( 'key=["' + ingredients.join('","') + '"]' );
    } else {
      queryString.push(
        'group_level=' + ingredients.length,
        // 'key=["' + ingredients.join('","') + '"]',
        'startkey=["' + ingredients.join('","') + '"]',
        'endkey=["' + ingredients.join('","') + '",{}]'
      );
    }

    var url = this.get('dbUrl') + '?' + queryString.join('&');
    return ic.ajax.request( url ).then( function( json ){
      return Em.A(json.rows[0] && json.rows[0].value || []);
    });
  }
});
