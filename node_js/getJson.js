// HTTPS module in order to make a get request
const https = require('https')

// file system module to perform file operations
const fs = require('fs');
 
// json data
var jsonData;

// get the url list from the local filesystem
var tempUrls = fs.readFileSync('bpUrls/bpUrls.json');
var bpUrls = JSON.parse(tempUrls);

// itterate over all the url's and get the chains and then bp.json files
for (var i =0; i < bpUrls.length; i++){
  modUrl = bpUrls[i].url.slice(8);
  bpName =  bpUrls[i].name;
  try {
    getChain(modUrl, bpName, "/chains.json");
  } 
  catch (error) {
    console.log(error);
  }
  finally {
    getChain(modUrl, bpName, "/bp.json");
  }
}

// catch uncaught exceptions
process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err);
  process.exit(1); //mandatory (as per the Node.js docs)
})


// ************************************
// Get the chains.json info
// ************************************
function getChain(bpUrl, bpName, serverPath){
  // if there is a chains.json file, get the info from there
  const options = {
    hostname: bpUrl,
    port: 443,
    path: serverPath,
    method: 'GET'
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      try {
        jsonData = JSON.parse(d);
        var chainPath = jsonData.chains["4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11"];
        console.log("getChain: " + bpUrl + chainPath);
        getJson(bpUrl, chainPath, bpName);
      } catch (error) {
        console.log(error);
      }
    })
  })
  req.on('error', error => {
    console.log("getChain error: " + bpUrl);
    console.error(error);;
  })
  req.end()
}


// ************************************
// Get the bp.json info
// ************************************
function getJson(bpUrl, pathName, bpName){

  const options = {
    hostname: bpUrl,
    port: 443,
    path: pathName,
    method: 'GET'
  }
  
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
  
    res.on('data', d => {
      //process.stdout.write(d);
      try{
        jsonData = JSON.parse(d);
        var savePath = "bpJsons/" + bpName + ".json";
    
        // Add the file to the database
        fs.writeFile(savePath, d, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved:  " + savePath);
        });
      }
      catch(err) {
        console.log("json parse error: " + bpUrl + pathName);
        //console.log(err);
      }
      
    })
  })
  req.on('error', error => {
    console.error(error);
  })
  req.end()
}
