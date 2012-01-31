var nconf = require('nconf')
,   Fs    = require('fs')
,   Path  = require('path')
;

nconf.overrides(
  { 'alice' :
    { 'dir'          : process.cwd()
    , 'releases_dir' : Path.join(process.cwd(), 'releases')
    , 'prefix'       : Fs.realpathSync(__dirname + '/..')
    , 'node_version' : process.version
    }
});

//
// 2. `process.env`
// 3. `process.argv`
//
nconf.env();
nconf.argv();

//
// 4. Values in `config.json`
//
nconf.file({ file: 'config.json' });

//
// 5. Any default values
//
nconf.defaults(
  { 'user':
    { 'separation' : true
    , 'default'    : 'pluto'
    }

  , 'verbose': false

});

module.exports = nconf;
