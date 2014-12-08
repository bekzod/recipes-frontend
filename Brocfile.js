/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/_normalize.scss/_normalize.scss')

app.import('bower_components/jquery.easing/js/jquery.easing.min.js')

module.exports = app.toTree();
