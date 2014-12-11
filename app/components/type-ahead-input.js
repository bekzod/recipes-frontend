import Ember from 'ember';

var engine = new Bloodhound({
  name: 'animals',
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
    .on('typeahead:autocomplete', function (e, tag) {
      this.set('value', tag.value);
      this.$().css('border-color',tag.color);
    }.bind(this))
    .on('typeahead:selected', function (e, tag) {
      this.set('selectedTag', tag);
      this.sendAction('tagSelect', tag);
    }.bind(this))
    .on('typeahead:cursorchanged typeahead:match', function(e,tag){
      this.$().css('border-color',tag.color);
    }.bind(this))
    .on('typeahead:cursorremoved typeahead:nomatch', function(){
      this.$().css( 'border-color', '#333');
    }.bind(this))

  }.on('didInsertElement'),

  syncValue: function(){
    var val = this.get('value');
    if( !val ){
      this.$().css('border-color','#333');
      this.set('selectedTag', null);
    }
  }.observes('value')

});
