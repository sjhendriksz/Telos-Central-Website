// import axios for making post requests to the server
const axios = require('axios')

// file system module to perform file operations
const fs = require('fs');

var compiledBPList;

// Run a for loop, calling the info of 1 bp at a time
function getProducerInfo(lowerBound, limitNum, fileName){

    axios
    .post('https://sslapi.teloscentral.com/v1/chain/get_producers', {
      "limit": limitNum,
      //"lower_bound": lowerBound,
      "json": true
    })
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`);
        // console.log(res);
        var bpList = JSON.stringify(res.data.rows);
        var accList = JSON.parse(bpList);
        console.log("Total items fetched:  " + accList.length);

        // save the bpList to a JSON file
        saveToFile(bpList, "bpList/", fileName);

        // compile list of URLs
        listURLs(accList);

    })
    .catch((error) => {
      console.error(error);
    })

}

function listURLs(data){
    console.log("Data Length: " + data.length);
    //console.log(data[0]);
    var urlList = [];
    for(var i = 0; i < data.length; i++){
        if(data[i].is_active == true){
            urlList.push(data[i].url);
        }
    }

    // save the bpList to a JSON file
    var strUrlList = JSON.stringify(urlList);
    saveToFile(strUrlList, "bpUrls/", "bpUrls");

    // number of active BPs
    console.log(urlList);
    console.log("Active: " + urlList.length);
}

// Function to save the retrieved into to a file
function saveToFile(data, filePath, fileName){
    // set pathName
    var pathName = filePath + fileName + ".json";

    // Add the file to the database
    fs.writeFile(pathName, data, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved:  " + pathName);
    });
}

// getProducerInfo(lowerBound, limitNum, fileName)
getProducerInfo("1", "200", "bpList");




  