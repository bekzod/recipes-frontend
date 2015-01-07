export default {
  name: 'recipe-searcher-service',
  initialize: function (container, application) {
    application.inject('route:search.index', 'recipeSearcher', 'service:recipe-searcher');
  }
};
