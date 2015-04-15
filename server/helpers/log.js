
var template = require('lodash/string/template');

Object.defineProperties(String.prototype, {
  magenta: { get: function(){ return '\x1B[35m' + this.valueOf() + '\x1B[39m'; } },
  green: { get: function(){ return '\x1B[32m' + this.valueOf() + '\x1B[39m'; } },
  grey: { get: function(){ return '\x1B[90m' + this.valueOf() + '\x1B[39m'; } },
  cyan: { get: function(){ return '\x1B[36m' + this.valueOf() + '\x1B[39m'; } },
  blue: { get: function(){ return '\x1B[34m' + this.valueOf() + '\x1B[39m'; } },
  red: { get: function(){ return '\x1B[31m' + this.valueOf() + '\x1B[39m'; } }
});

var prefix = '[' + ' populr '.grey + ']';

module.exports = function(string, a, b, c, d){
  if (!string){ console.log(''); return; };
  if (process.env.PG_USER) return;
  console.log(prefix, template(string)({ a:a, b:b, c:c, d:d }));
};
