import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('search', { path: '/search'}, function(){
  });
  this.route('recipe', { path: '/recipe/:recipe' });
  this.route('ingredient', { path: '/ingredient/:ingredient' });
});

export default Router;
