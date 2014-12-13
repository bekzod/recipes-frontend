import Ember from 'ember';

export default Ember.Controller.extend({
  tags: [],
  tagsNameMapped: Em.computed.mapBy('tags','value'),

  observeTag: function(){
    Em.run.once(this, function(){
      this.set('tagsName', this.get('tagsNameMapped'));
    });
  }.observes('tags.@each'),

  tagsName: [],
  queryParams: [{
    tagsName: 'tags'
  }]
});
