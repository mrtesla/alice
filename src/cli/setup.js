var Setup = require('../api/setup')
;

exports.run = function(){
  Setup.run(function(ok) {
    process.exit(ok ? 0 : 1);
  });
};
