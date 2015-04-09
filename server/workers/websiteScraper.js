var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

// Require sites list
var sites = require('../../data/sites.json').sites;

// slices off works dir to get data dir
var dataPath = __dirname.slice(0, -14);


// Writes string to our siteData file
var write = function(string){
  fs.appendFile(dataPath + '/data/siteData.txt', string, function(err) {
    if(err){
      console.log(err);
    }
  });
};

//scrapes and writes to file
var scrapeSites = function(){
  // Empty old file
  fs.writeFile(dataPath + '/data/siteData.txt', '', function(err) {
    if(err){
      console.log(err);
    };
  });

  // Iterates through sites file, scrapes page, and writes to file
  sites.forEach(function(url){
    request(url, function(error, response, body){
      // loads page into jquery
      var $ = cheerio.load(body);

      // selects human readable text
      var text = $('body').text();

      // Jquery alternative to remove tags
      // text = body.replace(/(<([^>]+)>)/ig, '');

      // removes large whitespaces
      text = text.replace(/\s+/g, ' ');

      // removes non alpha-numeric characters
      text = text.replace(/[^\w\s]/gi, '');

      // white to file
      write(text);
      console.log('Writing Data for: ' + url);
    });
  });
}();

