import Ember from 'ember';

export default Ember.Controller.extend({
  needs:['search'],
  tags: Em.computed.readOnly('controllers.search.model'),

  onTagsChange: function(){
    Em.run.schedule('actions', this.send.bind(this, 'refreshRoute') );
  }.observes('tags.@each')

});
