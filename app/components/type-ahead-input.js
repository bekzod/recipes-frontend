import Ember from 'ember';

/* globals Em, Bloodhound */
var engine = new Bloodhound({
  remote: {
    url: '/api/ingredient/query?q=%QUERY',
    filter: function(json){
      return json.map(function(item){
        var id = item._id || item.id ;
        delete item._id;
        item.id = id;
        return item;
      });
    }
  },
  datumTokenizer: function(d) {
    return Bloodhound.tokenizers.whitespace(d.name);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace
});

export default Ember.TextField.extend({

  initTypeAhead: function(){
    engine.initialize();
    this.typeahead = this.$().typeahead({
      minLength: 2
    }, {
      displayKey: 'name',
      source: engine.ttAdapter(),
    })
    .on('typeahead:autocompleted', function (e, tag) {
      Em.run(this, function(){ this.set('value', tag.name); });
      this.$().css('border-color',tag.color);
    }.bind(this))
    .on('typeahead:selected', function (e, tag) {
      Em.run.schedule('afterRender',this, function(){ this.set('value',''); });
      this.sendAction('tagSelect', tag);
    }.bind(this))
    .on('typeahead:cursorchanged typeahead:match', function(e,tag){
      this.$().css('border-color',tag.color);
    }.bind(this))
    .on('typeahead:cursorremoved typeahead:nomatch', function(){
      this.$().css( 'border-color', 'white');
    }.bind(this))

  }.on('didInsertElement'),

  syncValue: function(){
    var val = this.get('value');
    if( !val ){
      this.$().css('border-color','white');
    }
  }.observes('value')

});
