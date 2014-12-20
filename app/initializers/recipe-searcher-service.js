export default {
  name: 'recipe-searcher-service',
  initialize: function (container, application) {
    application.inject('route:search', 'recipeSearcher', 'service:recipe-searcher');
  }
};
