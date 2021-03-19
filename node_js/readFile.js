var fs = require('fs');
var https = require('https');
var http = require('http');
var url = require('url');
var download = require('./my_modules/download');
var nomicData = null;

router.get('/call-java-app', function (req, res, next){
    //call you function in here
    processData();
    //respond with any data you want
    res.send('Your data here');
});

function processData(){
    return require('axios')
      .get("https://api.nomics.com/v1/currencies/ticker?key=f8e08a2d110c345cfd1658d724829d58&ids&interval=1d,30d&convert=EUR")
      .then(function(response){
          nomicData = response.data;
          console.log("Data fetched successfully");
          console.log("Total items: " + nomicData.length);
          //console.log(nomicData);
          var path = "./data/nomics.json";
          storeDataJson(nomicData, path);
      })
    
}



function storeDataJson(data, path){
    fs.writeFile(path, JSON.stringify(data), function(err){
        if(err) throw err;
        console.log("Nomics Data Saved");
    });
}