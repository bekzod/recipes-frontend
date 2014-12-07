/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/_normalize.scss/_normalize.scss')

app.import('bower_components/typeahead.js/dist/typeahead.bundle.min.js')

module.exports = app.toTree();
