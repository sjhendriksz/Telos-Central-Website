var fs = require('fs');
var https = require('https');
var url = require('url');

// Offserver path
var download = require('./my_modules/download');

// get the url list from the local filesystem
var tempUrls = fs.readFileSync('bpUrls/bpUrls.json');
var bpUrls = JSON.parse(tempUrls);

// create a global array for use in other functions
var logoUrlList = [];

// ************************************
// Get the list of BP logo URL'S
// ************************************
function compileLogoUrlList(logoURL, savePath){
    var listLen = bpUrls.length;
    var uncount = 0;

    for(var i = 0; i < listLen; i++){
        
        try {
            // read the bp.Json file from the local filesystem
            var tempJson = fs.readFileSync('bpJsons/' + bpUrls[i].name + '.json');
            var bpJson = JSON.parse(tempJson);
            
            // push logo url to the new list
            logoUrlList.push({"name":bpUrls[i].name, "logo":bpJson.org.branding.logo_256});

        } catch (error) {
            // console.log(bpUrls[i].name + " : file not available.");
            uncount += 1;
        }
    }

    console.log("JSON files not available = " + uncount);
    console.log("JSON files = " + logoUrlList.length);
}

compileLogoUrlList();

// ************************************
// Download the logos
// ************************************
function getLogo(name, urlPara, fileDir){

    // Save the logo URL into a variable
    var logoURL = urlPara;
    console.log(logoURL);

      // Save the file name for use with the local path
      var adr = logoURL;
      var q = url.parse(adr, true);
      var fileExt = q.pathname.substring(q.pathname.lastIndexOf('.'));

      // Save file to directory and use file name
      var locPath = fileDir + name + fileExt;
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

for(var i = 0; i < logoUrlList.length; i++){
    getLogo(logoUrlList[i].name, logoUrlList[i].logo, "bpLogos/");
}