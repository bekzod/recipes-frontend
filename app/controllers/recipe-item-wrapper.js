import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs:['search'],
  currentTags: Em.computed.readOnly( 'controllers.search.tagsName' ),
  tags: function(){
    var currentTags = this.get('currentTags');
    return this.get('model.ingredients').map( function( ingredient ){
      return {
        name: ingredient,
        selected: currentTags.contains(ingredient)
      }
    });
  }.property('model.ingredients','currentTags'),

});
