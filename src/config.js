var nconf = require('nconf')
,   Fs    = require('fs')
,   Path  = require('path')
;

if (!nconf._loaded) {
  nconf._loaded = 'by alice';

  var Pluto = require('pluto')
  ;

  nconf.overrides(
    { 'alice' :
      { 'dir'          : process.cwd()
      , 'releases_dir' : Path.join(process.cwd(), 'releases')
      , 'prefix'       : Fs.realpathSync(__dirname + '/..')
      , 'node_version' : process.version
      }

    , 'pluto' : Pluto.config.overrides

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
    { 'alice':
      { 'router':
        { 'enabled' : false
        , 'ports'   : [4001, 4002, 4003, 4004]
        }
      , 'passer':
        { 'enabled' : true
        , 'ports'   : [5001, 5002, 5003, 5004]
        }
      }

    , 'pluto': Pluto.config.defaults

    , 'verbose': false

  });
}

module.exports = nconf;
