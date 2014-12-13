import Ember from 'ember';

export default Ember.Controller.extend({
  tags: [],

  observeTag: function(){
    this.set('tagsName', this.get('tags').mapBy('value'));
  }.observes('tags.@each'),

  tagsName: [],
  queryParams: [{
    tagsName: 'tags'
  }]
});
