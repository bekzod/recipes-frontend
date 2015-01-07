import Ember from 'ember';

/* globals Em, Bloodhound */
var engine = new Bloodhound({
  name: 'animals',
  remote: {
    replace : function(dbUrl,query){
      var params = [
        "include_docs=true",
        "limit=5",
        "startkey=" + '"' + query + '"',
        "endkey=" + '"' + query + "\ufff0" + '"'
      ];
      return dbUrl + '?' + params.join('&');
    },
    url: '/api/db/ingredients/_design/ingredients/_view/by_permutation',
    filter: function(json){
      return json.rows.map(function(obj){
        return {
          id: obj.doc._id,
          color: obj.doc.color,
          value: obj.key
        }
      });
    }
  },
  datumTokenizer: function(d) {
    return Bloodhound.tokenizers.whitespace(d.val);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace
});

export default Ember.TextField.extend({

  initTypeAhead: function(){
    engine.initialize();
    this.typeahead = this.$().typeahead({
      minLength: 2
    }, {
      source: engine.ttAdapter(),
    })
    .on('typeahead:autocompleted', function (e, tag) {
      Em.run(this, function(){ this.set('value', tag.value); });
      this.$().css('border-color',tag.color);
    }.bind(this))
    .on('typeahead:selected', function (e, tag) {
      Em.run(this, function(){ this.set('value',''); });
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
