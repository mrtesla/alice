var Optimist = require('optimist')
,   L        = require('./logger')
,   C        = require('./config')
;

var commands
;

commands =
{ 'help'         : 'help'

, 'setup'        : 'setup'
, 'upgrade'      : 'upgrade'

};

exports.run = function(){
  var context
  ,   command
  ,   arguments
  ,   index
  ;

  context = commands;

  for (index = 0; index < Optimist.argv._.length; index++) {
    command = context[Optimist.argv._[index]];

    if (typeof command == 'string') {
      arguments = Optimist.argv._.slice(index + 1);
      break;
    } else if (typeof command == 'object') {
      context = command;
    } else {
      L.error('Unknown command: ' + Optimist.argv._.slice(0, index + 1).join(' '));
      Optimist.argv._ = ['help'];
      index           = 0;
      context         = commands;
    }
  }

  command = command || 'help';

  require('./cli/'+command).run.apply(this, arguments);
};
