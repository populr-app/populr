var wikipedia = require('wtf_wikipedia');


var forbesTop100 = function(){
  wikipedia.from_api("Forbes_Celebrity_100", "en", function(markup){
    var obj = wikipedia.parse(markup);
    obj = obj.tables.toString();
    obj = obj.match(/\[\[(.*?)\]\]/g);

    var names = []
    obj.forEach(function(person){
      person = person.replace(/\[|\]/g, '');
      names.push(person);
    })
    return names;
  });
};

var power100 = function(){
  wikipedia.from_api("Power_100", "en", function(markup){
    var obj = wikipedia.parse(markup);
    console.log(obj.tables);
    obj = obj.tables.toString();
    obj = obj.match(/\[\[(.*?)\]\]/g);

    var names = []
    obj.forEach(function(person){
      person = person.replace(/\[|\]/g, '');
      names.push(person);
    })
    return names;
  });
};

console.log(power100());
