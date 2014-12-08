import Ember from 'ember';

var engine = new Bloodhound({
  name: 'animals',
  local: [{ value: 'dog' }, { value: 'pig' }, { value: 'moose' }],
  remote: '/api/ingredients?q=%QUERY',
  datumTokenizer: function(d) {
    return Bloodhound.tokenizers.whitespace(d.val);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace
});

export default Ember.TextField.extend({
  selectedTag: null,

  initTypeAhead: function(){
    engine.initialize();
    this.typeahead = this.$().typeahead({
      minLength: 2
    }, {
      source: engine.ttAdapter(),
    })
    .on('typeahead:selected typeahead:autocompleted', function (e, tag) {
      this.set('selectedTag', tag);
      this.$().css({
        'border-color': '#333'
      })
      this.sendAction('tagSelect', tag);
    }.bind(this))
    .on('typeahead:cursorchanged', function(e,suggestion){
      var color = suggestion.color;
      this.$().css({
        'border-color': color
      })
    }.bind(this))
    .on('typeahead:cursorremoved', function(){
      this.$().css({
        'border-color': '#333'
      })
    }.bind(this))

  }.on('didInsertElement'),

  syncValue: function(){
    var val = this.get('value');
    if( !val ){
      this.set('selectedTag', null);
    }
  }.observes('value')

});
