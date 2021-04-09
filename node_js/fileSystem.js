var fs = require('fs');
var https = require('https');
var url = require('url');

// Offserver path
var download = require('./my_modules/download');

// On server path
//var download = require('/var/www/Telos/node_js/my_modules/download');

var marketDataFile = null;

function preloadFileSys(){
        // Get the market data
        return require('axios')
        .get("https://api.nomics.com/v1/currencies/ticker?key=f8e08a2d110c345cfd1658d724829d58&interval=1d,30d&convert=USD")
        //.get("https://api.nomics.com/v1/currencies/ticker?key=f8e08a2d110c345cfd1658d724829d58&ids=BTC,ETH,XRP&interval=1d,30d&convert=USD")
        .then(function(response){
          marketDataFile = response.data;
          console.log("Data fetched successfully");
          console.log("Total items: " + marketDataFile.length);
          //console.log(marketDataFile);
          processData();
        })
    }

// Call the function to get the data
preloadFileSys();

function processData(){
  for(var i = 0; i < marketDataFile.length; i++){
    // Save the logo URL into a variable
    var logoURL = marketDataFile[i].logo_url;
    var oneDay = marketDataFile[i]['1d'];

    //Only run the following code if a logo URL is available
    if(logoURL == '' || oneDay == undefined){
      console.log("Bad data: " + marketDataFile[i].id)
    }
    else{
      // Save the file name for use with the local path
      var adr = logoURL;
      var q = url.parse(adr, true);
      var fileName = q.pathname.substring(q.pathname.lastIndexOf('/')+1);

      // Save file to directory and use file name - Off server path
      var locPath = 'pictures/' + fileName
      
      // Save file to directory and use file name - On server path
      //var locPath = '/var/www/Telos/node_js/pictures/' + fileName
     
      //saveImageToDisk(logoURL, locPath);

      download(logoURL, locPath, function (state) {
                console.log("progress", state);
            }, function (response) {
                console.log("status code", response.statusCode);
            }, function (error) {
                console.log("error", error);
            }, function () {
                console.log("done");
            });
    }
  }
}


//saveImageToDisk(logo, lPath);
function saveImageToDisk(url, localPath) {
  var fullUrl = url;
  var file = fs.createWriteStream(localPath);
  var request = https.get(url, function(response) {
    response.pipe(file);
  });
  console.log('File save to: ' + localPath);
}
