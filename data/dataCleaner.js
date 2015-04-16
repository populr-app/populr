var fs = require('fs');

// read in the clientData.js file
var peopleObject = JSON.parse(fs.readFileSync('clientData.json', {encoding:'utf8'}));

filterDisambiguationPages(peopleObject);
cleanUpDescriptions(peopleObject);

// export new client data
fs.writeFileSync('clientData2.json', JSON.stringify(peopleObject), {encoding: 'utf8'});

// Filter out people with disambiguation pages or weird links for descriptions.
function filterDisambiguationPages(peopleObject) {
  console.log(peopleObject.people);
  peopleObject.people = peopleObject.people.filter(function(person) {
    return (person.context.description.indexOf('may refer to') === -1) &&
           (person.context.description.indexOf('is the name of') === -1) &&
           (person.context.description.indexOf('http://') === -1);
  });
}

// Clean up people with pronunciation guides and extra escape chars in their descriptions.
// See: http://westonruter.github.io/ipa-chart/keyboard/
function cleanUpDescriptions(peopleObject) {
  peopleObject.people = peopleObject.people.map(function(person) {
    person.context.description = person.context.description.replace(/[^(born ][A-Za-z0-9\/\\: bptdʈɖcɟkɡqqɢʔmɱnɳɲŋɴʀrʙⱱɾɽɸβfvθðszʃʒʂʐçʝxɣχʁħʕhɦɮɬʋɹɻjɰʟʎɭliyɪʏøeɛœæaɶɨʉɵɘəɜɞɐɑʌɤʊɯuoɔɒːˑ|‖.‿ʡʢʜɥwʍʑɕɺɧʃ]+;\s/g, '');
    person.context.description = person.context.description.replace(/\\/g, '');
    return person;
  });
}


