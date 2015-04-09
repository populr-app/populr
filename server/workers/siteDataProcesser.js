var fs = require('fs');

// slices off works dir to get data dir and adds file
var dataPath = __dirname.slice(0, -14) + '/data/siteData.txt';
var writePath = __dirname.slice(0, -14) + '/data/siteDataMetrics.json';
// include names array
var names = require('../../data/fullNames.json').names;

var results = [];

// code borrowed from: http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
var occurrences = function(string, subString, allowOverlapping){
    string+=""; 
    subString+="";
    if(subString.length<=0) return string.length+1;

    var n=0, pos=0;
    var step=(allowOverlapping)?(1):(subString.length);

    while(true){
        pos=string.indexOf(subString,pos);
        if(pos>=0){ n++; pos+=step; } else break;
    }
    return(n);
};


var processNames = function(){
  fs.readFile(dataPath, function(err, data){
    if(err){
      throw err;
    }else{
      var results = []
      names.forEach(function(nameObj){
        console.log("Counting occurrences for: " + nameObj.fullName);
        var num = occurrences(data, nameObj.fullName, false)
        results.push({id: nameObj.id, sites:{count: num, countChange: num - nameObj.sites.count}})
      });
      // Writesresults to siteMetrics file
      console.log("Writing to siteDataMetrics file...");
      fs.writeFile(writePath, JSON.stringify({people: results}), function(err) {
        if(err){
          console.log(err);
        }
      });
    }
  })
};

processNames();
