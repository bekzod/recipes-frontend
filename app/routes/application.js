import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    loading: function(){
      NProgress.start();
    },
    didTransition: function(){
      NProgress.done();
    },
    error: function(err,transition){
      transition.abort();
      this.transitionTo('search');
    }
  },
  redirect: function(model, transition) {
    if( transition.targetName === 'index' ){
      this.transitionTo('search');
    }
  }

});
