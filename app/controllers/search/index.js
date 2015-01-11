import Ember from 'ember';

export default Ember.Controller.extend({
  needs:['search'],
  tags: Em.computed.readOnly('controllers.search.model'),
  attempts: 0,

  onTagsChange: function(){
    this.incrementProperty('attempts');
    Em.run.schedule('actions', this.send.bind(this, 'refreshRoute') );
  }.observes('tags.@each'),

  resetAttempts: function(){
    this.set('attempts', 0);
  }.observes('model'),

  toMuchAttempts: function(){
    return this.get('attempts') > 5;
  }.property('attempts')


});
