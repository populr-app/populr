var fs = require('fs');
var _ = require('lodash');

var peopleObj = JSON.parse(fs.readFileSync('clientData.json', {encoding:'utf8'}));

fixAthleteOccupations(peopleObj);

fs.writeFileSync('clientData2.json', JSON.stringify(peopleObj), {encoding:'utf8'});

// Append the word 'player' to athlete occupations
function fixAthleteOccupations(peopleObject) {
  peopleObject.people = peopleObject.people.map(function(person) {
    if (person.context.occupation === 'Soccer' ||
       (person.context.occupation === 'Basketball') ||
       (person.context.occupation === 'Baseball') ||
       (person.context.occupation === 'Football') ||
       (person.context.occupation === 'Tennis')) {
      person.context.occupation += ' Player';
    }

    return person;
  });
}

// Filter out people with disambiguation pages or weird links for descriptions.
function filterDisambiguationPages(peopleObject) {
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
    person.context.description = person.context.description.split('n^')[0];
    person.context.description = person.context.description.split('\n^')[0];
    return person;
  });
}

// Keep the n most-liked facebook pages on each person.
function filterFacebookPages(peopleObject, n) {

  // Loop over each person
  peopleObject.people = peopleObject.people.map(function(person) {

    if (!person.facebook) { return person; }

    // pages  => pluck the array of page likes,
    // sorted => sort it from largest to smallest (desc),
    // nPages => keep the n most-liked pages
    var pages = _.pluck(person.facebook.pages, 'likes');
    var sorted = pages.sort(function(a, b) {return b - a;});
    var nPages = _.take(sorted, n);
    if (nPages <= n) { return person; }

    // filter out pages that don't match the nPages values
    var counter = 0;
    person.facebook.pages = person.facebook.pages.filter(function(page) {
      var keepPage = false;
      nPages.forEach(function(numLikes, i) {
          if (page.likes === numLikes && counter < n) {
            keepPage = true;
            counter++;
          }
        });
      return keepPage;
    });

    return person;
  });

}

