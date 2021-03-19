var Counts = {"Airdrop Tracker":1,"Arbitrator Program":2,"Telos Scam site Video":3};

/* Website statistics counters */
function clickCounter(LinkName) {
	console.log("Counter Works");
	console.log(typeof(Storage));
  console.log(LinkName);
  console.log(typeof LinkName);
  var DomMod = document.getElementById(LinkName).innerHTML;

  // Check browser support
  if (typeof(Storage) !== "undefined") {
    // Store
    
    console.log(Counts);

    var CountsStringify = JSON.stringify(Counts);
    console.log(CountsStringify);

    localStorage.setItem("ClickCounts",CountsStringify);

    // Retrieve
    var a = JSON.parse(localStorage.getItem("ClickCounts"));
    console.log(a[LinkName]);
    console.log(typeof a[LinkName]);
    var b = a[LinkName];
    b += 1;
    a[LinkName] = b;
    console.log(b);
    console.log(a[LinkName]);
    
    document.getElementById(LinkName).innerHTML = a[LinkName];
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  }

}