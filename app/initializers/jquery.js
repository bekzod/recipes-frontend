
export default {
  name: 'jquery',
  initialize: function initialize(/* container, application */) {
    $.ajaxSetup({
      dataType: 'json'
    });
  }
};
