import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    goBack: function(){
      var target = this.get('goBackTarget');
      this.transitionTo.apply(this,[target.route].concat(target.params));
    }
  },

  goBackTarget: {
    route: 'search',
    params: []
  },

  afterModel: function(model, transtion) {
    //dirty hack but it good for now
    var handlers = transtion.router.currentHandlerInfos;
    if( handlers && handlers.length ){
      var lastRoute = handlers[handlers.length-1];
      var routeName = lastRoute.name;
      if( 'recipe' === routeName){
        this.set('goBackTarget',{
          route: routeName,
          params: [ lastRoute.params.recipe ]
        });
      }
    }
    model.previosRouteName = this.get('goBackTarget').route;
    return model;
  },

  model: function(param){
    var url = '/__/proxy/api/ingredient/' + param.ingredient;
    return ic.ajax.request( url );
  }

});
