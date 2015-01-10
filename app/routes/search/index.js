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
      var tagNames = tags.mapBy('name');
      return ic.ajax.request( url + '?keys=' + tagNames.join(',') )
        .then(function(json){
          return json.map( function( recipe ){
            recipe.ingredientsMissing = [];
            recipe.ingredientsHave = [];
            recipe.ingredients.forEach( function( item ){
              if( tagNames.indexOf( item ) === -1 ){
                recipe.ingredientsMissing.push( item );
              } else {
                recipe.ingredientsHave.push( item );
              }
            });
            return recipe;
          });
        });
    } else {
      return [];
    }
  }
});
