
var template = require('lodash/string/template');

Object.defineProperties(String.prototype, {
  magenta: { get: function(){ return '\x1B[35m' + this.valueOf() + '\x1B[39m'; } },
  green: { get: function(){ return '\x1B[32m' + this.valueOf() + '\x1B[39m'; } },
  blue: { get: function(){ return '\x1B[34m' + this.valueOf() + '\x1B[39m'; } },
  red: { get: function(){ return '\x1B[31m' + this.valueOf() + '\x1B[39m'; } },
});

var ai = '['.blue + 'populr'.magenta + ']'.blue;
var colon = ':'.blue;
var error = '['.blue + 'Error'.red + ']'.blue;
var ok = '['.blue + 'Ok'.green + ']'.blue;

module.exports.Pre = function(string, a, b, c, d){
  if (!string){ console.log(''); return; };
  console.log(ai + colon, template(string)({ a:a, b:b, c:c, d:d }));
};

module.exports.Ok = function(string, a, b, c, d){
  if (!string){ console.log(''); return; };
  console.log(ai, ok + colon, template(string)({ a:a, b:b, c:c, d:d }).green);
};

module.exports.Err = function(string, a, b, c, d){
  if (!string){ console.log(''); return; };
  console.log(ai, error + colon, template(string)({ a:a, b:b, c:c, d:d }).red);
};