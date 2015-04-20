
var Promise = require('bluebird');
var request = require('request');
var FeedParser = require('feedparser');

module.exports = function() {
  var sites = require('../../data/sites.json').headlines;
  var promiseArray = [];
  sites.forEach(function(url) {
    promiseArray.push(new Promise(function(resolve, reject) {

      var feedparser = new FeedParser();
      var results = [];

      request(url)
        .on('response', function() {
          this.pipe(feedparser);
        });

      feedparser.on('readable', function() {
        var item;
        while (item = this.read()) {
          var headline = {
            title: item['rss:title']['#'],
            url: item.link
          };
          results.push(headline);
        }

        resolve(results);
      });
    }));
  });

  return Promise.all(promiseArray);
};
