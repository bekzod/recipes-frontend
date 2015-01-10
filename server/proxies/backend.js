var proxyPath = '/__/proxy/api/';

module.exports = function(app) {
  // For options, see:
  // https://github.com/nodejitsu/node-http-proxy
  var proxy = require('http-proxy').createProxyServer({});
  var path = require('path');

  app.use(proxyPath, function(req, res, next){
    // include root path in proxied request
    proxy.web(req, res, { target: 'http://127.0.0.1:8080/' });
  });
};
