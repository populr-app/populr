var fs = require('fs');

fs.readFile('clientData.json', {encoding:'UTF-8'}, function(err, data) {

  if (err) throw err;

  var clientData = JSON.parse(data);
  console.log('old client data:', clientData.people.length);

  // Filter out the people with disambiguation pages or URLs for descriptions
  var filtered = clientData.people.filter(function(person) {
    return (person.context.description.indexOf('may refer to') === -1) &&
           (person.context.description.indexOf('is the name of') === -1) &&
           (person.context.description.indexOf('http://') === -1);
  });

  // Clean up descriptions to remove IPA irregularities
  var mapped = filtered.map(function(person){
    person.context.description = person.context.description.replace(/[^(born ][A-Za-z\/\\0-9: ]+;\s/g, '');
    return person;
  });

  // update clientData object
  clientData.people = mapped;
  console.log('new client data:', clientData.people.length);


  // export new client data
  fs.writeFile('clientData2.json', JSON.stringify(clientData), {encoding: 'UTF-8'}, function(err){
    if(err) throw err;
    console.log('saved');
  });

});
