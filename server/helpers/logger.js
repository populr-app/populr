
var template = require('lodash/string/template');

Object.defineProperties(String.prototype, {
  magenta: { get: function(){ return '\x1B[35m' + this.valueOf() + '\x1B[39m'; } },
  green: { get: function(){ return '\x1B[32m' + this.valueOf() + '\x1B[39m'; } },
  grey: { get: function(){ return '\x1B[90m' + this.valueOf() + '\x1B[39m'; } },
  blue: { get: function(){ return '\x1B[34m' + this.valueOf() + '\x1B[39m'; } },
  red: { get: function(){ return '\x1B[31m' + this.valueOf() + '\x1B[39m'; } },
});

var prefix = '['.blue + 'populr'.magenta + ']'.blue;
var colon = ':'.blue;
var error = '[ '.blue + 'Error '.red + ']'.blue;
var ok = '['.blue + 'Success'.green + ']'.blue;

module.exports.log = function(string, a, b, c, d){
  if (!string){ console.log(''); return; };
  console.log(prefix + colon, template(string)({ a:a, b:b, c:c, d:d }).grey);
};

module.exports.ok = function(string, a, b, c, d){
  if (!string){ console.log(''); return; };
  console.log(prefix, ok + colon, template(string)({ a:a, b:b, c:c, d:d }).green);
};

module.exports.err = function(string, a, b, c, d){
  if (!string){ console.log(''); return; };
  console.log(prefix, error + colon, template(string)({ a:a, b:b, c:c, d:d }).red);
};