var Pluto = require('pluto')
,   Path  = require('path')
,   C     = require('../../config')
,   F     = require('futures')
;

exports.setup = function(callback){
  var ports
  ,   root
  ,   instance = 1
  ;

  enabled = C.get('alice:router:enabled');
  ports   = C.get('alice:router:ports');

  if (!enabled) {
    callback(true);
    return;
  }

  root = C.get('alice:prefix');

  F.forEachAsync(port, function(next, port){
    var task = {
      name:    "sys:alice:router:" + instance,
      root:    Path.join(root, 'node_modules/alice/node_modules/alice-router'),
      command: "node router.js $PORT",

      ports: [
        { name: "PORT", type: "http", port: port }
      ],

      env:   [
        { name: "NODE_VERSION", value: process.version }
      ]
    };

    instance += 1;

    Pluto.Services.generate(task, function(ok){
      if (ok) {
        next();
      } else {
        callback(false);
      }
    });

  }).then(function(){
    callback(true);
  });

};
