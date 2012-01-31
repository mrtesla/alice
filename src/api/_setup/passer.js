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

  enabled = C.get('alice:passer:enabled');
  ports   = C.get('alice:passer:ports');

  if (!enabled) {
    callback(true);
    return;
  }

  root = C.get('alice:prefix');

  F.forEachAsync(ports, function(next, port){
    var task = {
      task:    "sys:alice:passer:" + instance,
      root:    Path.join(root, 'node_modules/alice-passer'),
      command: "node passer.js $PORT",

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
