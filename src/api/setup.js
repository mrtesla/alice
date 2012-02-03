var Router = require('./_setup/router')
,   Passer = require('./_setup/passer')
,   F      = require('futures')
;

exports.run = function(callback){
  F.sequence()
    .then(function(next){
      Router.setup(function(ok){ ok ? next() : callback(false); });
    })
    .then(function(next){
      Passer.setup(function(ok){ ok ? next() : callback(false); });
    })
    ;
};
