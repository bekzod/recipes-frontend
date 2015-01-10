import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    loading: function(){
      NProgress.start();
    },
    didTransition: function(){
      NProgress.done();
    }
  },
  redirect: function() {
    this.transitionTo('search');
  }

});
