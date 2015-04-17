var FeedParser = require('feedparser');
var request = require('request');

var urls = [
  'http://api.feedzilla.com/en_us/headlines/entertainment.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/celebrities.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/sports.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/events.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/internet.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/music.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/politics.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/society.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/top-news.rss?count=100',
  'http://api.feedzilla.com/en_us/headlines/world-news.rss?count=100',
]

var headlines = [];

var req = request('http://api.feedzilla.com/en_us/headlines/celebrities.rss?count=100')
  , feedparser = new FeedParser();

req.on('error', function (error) {
  // handle any request errors
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
});
feedparser.on('readable', function() {
  // This is where the action is!
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;

  while (item = stream.read()) {
    var headline = {
      title: item['rss:title']['#'],
      url: item.link
    }
    console.log(headline);
    // headlines.push(headline);
  }

});

