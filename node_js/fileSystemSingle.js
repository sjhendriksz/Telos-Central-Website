var fs = require('fs');
var https = require('https');
var url = require('url');
var download = require('./my_modules/download');

processData();

function processData(){

    // Save the logo URL into a variable
    var logoURL = "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/cvc.svg";

      // Save the file name for use with the local path
      var adr = logoURL;
      var q = url.parse(adr, true);
      var fileName = q.pathname.substring(q.pathname.lastIndexOf('/')+1);

      // Save file to directory and use file name
      var locPath = './pictures/' + fileName
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



//saveImageToDisk(logo, lPath);
function saveImageToDisk(url, localPath) {
  var fullUrl = url;
  var file = fs.createWriteStream(localPath);
  var request = https.get(url, function(response) {
    response.pipe(file);
  });
  console.log('File save to: ' + localPath);
}
