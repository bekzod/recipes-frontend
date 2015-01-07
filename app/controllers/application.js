import Ember from 'ember';

export default Ember.Controller.extend({
  tags: Em.computed.alias('model'),
  tagsNameMapped: Em.computed.mapBy('tags','value'),

  observeTag: function(){
    Em.run.once(this, function(){
      this.set('tagsName', this.get('tagsNameMapped'));
    });
    console.warn('test');
  }.observes('tags.@each'),

  tagsName: [],
  queryParams: [{
    tagsName: 'tags'
  }]
});
