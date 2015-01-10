/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/normalize.css/normalize.css');
app.import('bower_components/animate.css/animate.min.css');
app.import('bower_components/nprogress/nprogress.css');

app.import('bower_components/nprogress/nprogress.js');
app.import('bower_components/typeahead-hacked/type-ahead-hacked.js');
app.import('bower_components/jquery.easing/js/jquery.easing.min.js');
app.import('bower_components/ic-ajax/dist/globals/main.js');

module.exports = app.toTree();
