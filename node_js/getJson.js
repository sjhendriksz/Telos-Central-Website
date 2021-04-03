// HTTPS module in order to make a get request
const https = require('https')

// file system module to perform file operations
const fs = require('fs');
 
// json data
var jsonData;

// get the url list from the local filesystem
var tempUrls = fs.readFileSync('bpUrls/bpUrls.json');
var bpUrls = JSON.parse(tempUrls);

console.log(bpUrls);

for (var i = 0; i < bpUrls.length; i++){
  getJson(bpUrls[i]);
}

// for every url, download and save the json file
function getJson(bpUrl){

  const options = {
    hostname: bpUrl,
    port: 443,
    path: '/bp.json',
    method: 'GET'
  }
  
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
  
      jsonData = JSON.parse(d);
      // Write the json file to console for visual confirmation
      // console.log(jsonData);
  
      // print out the bp name, for use with filename
      var fileName = jsonData.producer_account_name;
      var pathName = "bpJsons/" + fileName + ".json";
  
      // Add the file to the database
      fs.writeFile(pathName, d, 'utf8', function (err) {
          if (err) {
              console.log("An error occured while writing JSON Object to File.");
              return console.log(err);
          }
          console.log("JSON file has been saved:  " + pathName);
      });
  
    })
  })
  
  req.on('error', error => {
    console.error(error);
  })
  
  req.end()

}