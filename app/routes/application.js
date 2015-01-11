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
  redirect: function(model, transition) {
    if( transition.targetName === 'index' ){
      this.transitionTo('search');
    }
  }

});
