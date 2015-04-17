var fs = require('fs');

// Read in both files
var fbData = JSON.parse(fs.readFileSync('living_celebrities_with_twitter_and_facebook3.json', {encoding: 'utf8'}));
var clientData = JSON.parse(fs.readFileSync('clientData2.json', {encoding: 'utf8'}));

// iterate over client data, adding the facebook property to each person
clientData.people.forEach(function(person) {
  for (var i = 0; i < fbData.people.length; i++) {
    if (fbData.people[i].fullName === person.fullName) {
      person.facebook = fbData.people[i].facebook;
      break;
    }
  }
});

// Save new client data
fs.writeFileSync('clientData3.json', JSON.stringify(clientData), {encoding: 'UTF-8'});
