/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  autoprefixer: {
    browsers: ['last 3 versions', 'android 3'],
    cascade: false
  }
});

app.import('bower_components/normalize.css/normalize.css');
app.import('bower_components/animate.css/source/_base.css');
app.import('bower_components/animate.css/source/attention_seekers/wobble.css');
app.import('bower_components/animate.css/source/bouncing_exits/bounceOut.css');

app.import('bower_components/nprogress/nprogress.js');
app.import('bower_components/typeahead-hacked/type-ahead-hacked.js');
app.import('bower_components/jquery.easing/js/jquery.easing.min.js');
app.import('bower_components/ic-ajax/dist/globals/main.js');

module.exports = app.toTree();
