var fs = require('fs');
var https = require('https');
var url = require('url');
var download = require('./my_modules/download');
var nomicData = null;

processData();

function processData(){
    return require('axios')
      .get("https://api.nomics.com/v1/currencies/ticker?key=f8e08a2d110c345cfd1658d724829d58&ids&interval=1d,7d,30d,365d&convert=USD&per-page=100&page=1")
      .then(function(response){
          var path = "./data/nomics.json";
          //var path = "/var/www/Telos/node_js/data/nomics.json";
          storeDataJson(response.data, path);
          console.log("Data fetched successfully");
          console.log("Total items: " + response.data.length);
      })
    
}

function storeDataJson(data, path){
    fs.writeFile(path, JSON.stringify(data), function(err){
        if(err) throw err;
        console.log("Nomics Data Saved");
    });
}
1