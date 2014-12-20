import Ember from 'ember';

export default Ember.Controller.extend({
  needs:['application'],
  tags: Em.computed.alias('controllers.application.model'),

  onTagsChange: function(){
    Em.run.schedule('actions', this.send.bind(this, 'refreshRoute') );
  }.observes('tags.@each')

});
