var fs = require('fs');
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
function compileLogoUrlList(){
    var listLen = bpUrls.length;
    var uncount = 0;

    // push the length parameter to the json file as the 1st element
    logoUrlList.push({"length" : 0});

    for(var i = 0; i < listLen; i++){
        
        try {
            // read the bp.Json file from the local filesystem
            var tempJson = fs.readFileSync('bpJsons/' + bpUrls[i].name + '.json');
            var bpJson = JSON.parse(tempJson);

            var tempLogoExt = bpJson.org.branding.logo_256;
            var LogoExt = tempLogoExt.slice(-4);

            // push logo url to the new list
            logoUrlList.push({
                "name":bpJson.org.candidate_name,
                "owner" : bpUrls[i].name,
                "logo":bpJson.org.branding.logo_256,
                "logoExt":LogoExt
            });

        } catch (error) {
            // console.log(error);
            // console.log(bpUrls[i].owner + " : file not available.");
            uncount += 1;
        }
    }

    // show the amount of healthy vs unhealthy files
    console.log("JSON files not available = " + uncount);
    console.log("JSON files = " + logoUrlList.length);

    // push the length parameter to the json file as well.
    logoUrlList[0].length = logoUrlList.length;

    var saveLogoList = JSON.stringify(logoUrlList);
    var pathName = "bpLogos/logoList.json";
    fs.writeFile(pathName, saveLogoList, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved:  " + pathName);
    });
    
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

for(var i = 1; i < logoUrlList.length; i++){
    getLogo(logoUrlList[i].owner, logoUrlList[i].logo, "bpLogos/");
}