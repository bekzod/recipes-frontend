import Ember from 'ember';
import ClickOutsideMixin from 'recipes-front/mixins/click-outside';

module('ClickOutsideMixin');

// Replace this with your real tests.
test('it works', function() {
  var ClickOutsideObject = Ember.Object.extend(ClickOutsideMixin);
  var subject = ClickOutsideObject.create();
  ok(subject);
});
