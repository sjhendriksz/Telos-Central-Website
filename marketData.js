// ####################################
// Get Market Constructor function
// ####################################
var nomicsDataFile = null;
var coinGeckoDataFile = null;
var totalMarketLoad = 0;
var loadingComplete = false;
var dataLimit = 100;

function MarketData(){
    
    this.name = '<i class="fas fa-poll fa-lg navicons"></i>Market Data';
    // this.name = '<i class="gg-dollar"></i>Market Data';
    this.id = 'Market Data';
    
    this.x = 20;
    this.y = 20;
    this.textSiz = textSiz*9/10;
    this.marketData = null;
    this.dataPoints = [];
    this.logos = [];
    
    this.nomicsDataLoaded = false;
    this.coinGeckoDataLoaded = false;
    this.logosLoaded = false;
    
    this.control = undefined;
    this.heading = undefined;
    this.startPoint = 1;
    this.endPoint = 15;
    this.lineQty = 15;
    this.loaded = false;
    
    // Preload method
    this.preload = function(){
        // Load the data from the nomics.json file
        loadJSON("./node_js/data/nomics.json", "json", function(data){
            nomicsDataFile = data;
            console.log("data loaded.");
            // console.log(nomicsDataFile);
        }, function(err){console.log(err);});
    };
    
    // Extended Preload method - Dataprocess
    this.processData = function(){
        // clear the data array
        //this.dataPoints = [];
        var countBad = 0;
        var loopCount = 0;
        
        for(var i = 0; i < nomicsDataFile.length; i++){
            // Temp test code
            /*console.log(i);
            if(i == 4399){
                console.log("stop");
                console.log(nomicsDataFile[i]['1d']);
            }*/
            
            // Only run if price data is valid
            if(nomicsDataFile[i]['1d'] != undefined && nomicsDataFile[i]['30d'] != undefined){           
                
                // Get the date data in order to verify coin validity
                var priceDate = nomicsDataFile[i].price_date;
                var year = int(priceDate.slice(0,4));
                var month = int(priceDate.slice(5,7));
                var day = int(priceDate.slice(8,10));
                priceDate = {
                    year: year,
                    month: month,
                    day: day
                };

                var currentDate = new Date();
                var year = currentDate.getUTCFullYear();
                var month = currentDate.getUTCMonth() + 1; //months from 1-12
                var day = currentDate.getUTCDate();
                currentDate = {
                    year: year,
                    month: month,
                    day: day
                };
                
                // only run this code if the pricedate is not older than 2 days
                if(priceDate.year == currentDate.year && priceDate.month == currentDate.month && priceDate.day > currentDate.day-50){

                    // Deep copy objects
                    var oneDay = JSON.parse(JSON.stringify(nomicsDataFile[i]['1d']));
                    var thirtyDay = JSON.parse(JSON.stringify(nomicsDataFile[i]['30d']));
                    var logoLink = nomicsDataFile[i].logo_url;

                    var id = nomicsDataFile[i].symbol;
                    var name = nomicsDataFile[i].name;
                    var logo = null;
                    var rank = nomicsDataFile[i].rank;
                    var priceUF = nomicsDataFile[i].price;
                    var price = "$ " + nf(Math.round(nomicsDataFile[i].price*10000)/10000);

                    if(nomicsDataFile[i]['1d'].price_change > 0){oneDay.col = color(0,150,0);}else{oneDay.col = color(250,0,0);}
                    var tempOneDayPer = nfs(oneDay.price_change_pct*100);
                    oneDay.fPriceC = tempOneDayPer.slice(0,5)+" %";

                    if(thirtyDay.price_change_pct > 0){thirtyDay.col=color(0,150,0);}else{thirtyDay.col = color(250,0,0);}
                    var tempThirdyDayPer = nfs(thirtyDay.price_change_pct*100);
                    thirtyDay.fPriceC = tempThirdyDayPer.slice(0,5)+" %";

                    var marketCapUF = nomicsDataFile[i].market_cap;
                    var marketCap = "$ " + CommaFormatted(marketCapUF);
                    var cirSuppUF = nomicsDataFile[i].circulating_supply;
                    var cirSupp = CommaFormatted(nomicsDataFile[i].circulating_supply);
                    var maxSupp = nomicsDataFile[i].max_supply;

                    // (x, y, w, h, id, name, logo, logoLink, rank, price, marketCap, cirSupp, maxSupp, oneDay, thirtyDay, fontCol, backCol, textS)
                    this.dataPoints.push(new MarketDataLine(0, 80 + (loopCount-countBad)*61, width, 60, id, name, logo, logoLink, loopCount+1-countBad, priceUF, price, marketCapUF, marketCap, cirSuppUF, cirSupp, maxSupp, oneDay, thirtyDay, 50, 250, this.textSiz/2.5));
                }
                // add as a bad count point
                else{
                    countBad++;
                    //this.endPoint++;
                }
                
            }
            // add as a bad count point
            else
            {
                countBad++;
                //this.endPoint++;
            }
            
            if(loopCount+1 - countBad >= dataLimit){
                break;
            }
            
            // Set the loopcount var
            loopCount ++;
            
        }
        
        // temp code
        // console.log(this.dataPoints);

        // Load the picture for every data point
        for(var i = 0; i < this.dataPoints.length; i++){
            if(this.dataPoints[i].logo == null && this.dataPoints[i].imgLoaded == false)
            {
                if(this.dataPoints[i].logoLink != ""){
                    this.dataPoints[i].logo = loadPictures(this.dataPoints[i].logoLink, this.dataPoints[i]);
                    totalMarketLoad = totalMarketLoad+1;
                }
                else
                {
                    totalMarketLoad = totalMarketLoad+1;
                }
                if(totalMarketLoad == dataLimit){loadingComplete = true;}
            }
        }
            
        
        // Load the image if the data point does not have a logo URL.
        function loadLocalPic(logo_path, element){
            
            var loadedImg = loadImage(logo_path,
                             function(){
                                        if(element.logo.width > element.logo.height){
                                            element.logo.resize(element.h*5/10,0);
                                        }
                                        else if(element.logo.height >= element.logo.width){
                                            element.logo.resize(0,element.h*5/10);
                                        };
                                        element.imgLoaded = true;
                                        totalMarketLoad = totalMarketLoad+1;
                                        if(totalMarketLoad == dataLimit){loadingComplete = true;}
                                       },
                             function(){
                                        console.log("#" + element.rank + "  Error: " + logo_path);
                                        }
                            );
            
            return loadedImg;
            
        }
        
        
        // Seperate function to process the loading of the pictures
        function loadPictures(logo_url, element){
            // Save the logo URL into a variable
            var logoURL = logo_url;

            // Save the file name for use with the local path
            var adr = logoURL;
            var fileName = adr.substring(adr.lastIndexOf('/')+1);

            // Save filename to variable and load the Image
            var locPath = 'node_js/pictures/' + fileName
            return loadImage(locPath,
                 function(){
                            if(element.logo.width > element.logo.height){
                                element.logo.resize(element.h*5/10,0);
                            }
                            else if(element.logo.height >= element.logo.width){
                                element.logo.resize(0,element.h*5/10);
                            };
                            element.imgLoaded = true;
                           },
                 function(){
                            fileName = fileName.toLowerCase();
                            locPath = 'node_js/pictures/' + fileName

                            console.log("#" + element.rank + "  Error: " + locPath)
                            }
                );
        }
        
        console.log("Data processed function finished.")
    }

    
    // Setup method
    this.setup = function(){

        if(this.loaded == false){
            // First determine how many lines are to be displayed
            var heightCalc = floor((height-80)/61);
            this.lineQty = heightCalc;
            this.endPoint = heightCalc;
            
            // Control panel
            this.control = new ControlPanel(0, 0, width, 39, 250, 50, this.textSiz/2, this.endPoint);
            this.control.setup();

            // Column heading
            this.heading = new DataHeading(0, 40, width, 39, 250, 50, this.textSiz*2/5);
            this.heading.setup();

            // Run the process data function
            if(this.dataPoints.length == 0){
                this.processData();
            }

            // Disable normal scrolling from the spacebar
            /*window.addEventListener('keydown', function(e) {
                if(e.keyCode == 33 && e.target == document.body) {
                    e.preventDefault();
                }
                if(e.keyCode == 34 && e.target == document.body) {
                    e.preventDefault();
                }
            });*/

            // call the setup function for all constructor functions.
            for(var i = 0; i < this.dataPoints.length; i++){
                this.dataPoints[i].setup();
            }
            this.loaded = true;
            //console.log(this.dataPoints);
        }
        else
        {
            // Run the restore function to bring back the input fields.
            this.restore();
        }
        
    };
    
    // Draw method
    this.draw = function(){
        
        if(totalMarketLoad != dataLimit){

            push();
            
            // Loading text and percentage text
            // Background
            //fill(50);
            //rect(0,0,width,height);
            
            // Loading text
            fill(50);
            textSize(40);
            textAlign(CENTER, CENTER);
            text("Loading...",width/2,height/2-60);
            
            // Percentage text
            textSize(20);
            var tPercentage = map(totalMarketLoad, 0, dataLimit, 0, 100);
            text(int(tPercentage) + " % complete", width/2,height/2-20);
            
            // Loading bar percentage
            fill(20,120,24);
            noStroke();
            rect(width/2-75,height/2+5,tPercentage*1.5,40);
            
            // Loading bar outline
            noFill();
            stroke(0);
            strokeWeight(3);
            rect(width/2-75,height/2+5,150,40,3);
            fill(0);
            rect(width/2-78,height/2+7,3,36,2);
            rect(width/2+76,height/2+20,5,10,1);

            pop();
        }
        else
        {
            if(loadingComplete == true){
                
                select('input').style('display', "block");
                
                push()
                fill(250);
                textFont('Arial');
                textStyle(NORMAL);

                // Draw based on the selection from the input boxes
                if(this.dataPoints.length > 0){
                    // Only draw the data point displayed.
                    for(var i = this.startPoint-1; i < this.endPoint; i++){
                        this.dataPoints[i].draw();
                        this.dataPoints[i].hover();
                    }
                }
                else
                {
                    push();
                    fill(50);
                    var message = "Data is out of date.";
                    var messageWidth = textWidth(message);
                    text(message, width/2-messageWidth/2, height/2);
                    pop();
                }
                
                this.control.draw();
                this.heading.draw();
                pop();
            }
        }
        
    };
    
    // Key Pressed method
    this.keyPressed = function(){
        //console.log(keyCode);
        if(keyCode == 13){
            var tempVal = int(this.control.inputField.startIn.elt.value);
            this.control.keyPressed();
            
            // Data rows, push
            if(tempVal < 1){
                alert("Value chosen cannot be smaller than 1");
            }
            else if(tempVal > this.dataPoints.length+1 - this.lineQty){
                alert("Value chosen is bigger than the available data points. Value should be smaller than: " + (this.dataPoints.length+2-this.lineQty));
            }
            else if(isNaN(tempVal)){
                alert("Please enter a valid number.");
            }
            else
            {
                this.startPoint = int(this.control.inputField.startIn.elt.value);
                this.endPoint = this.startPoint-1 + this.lineQty;
                var loopCount = 0;
                for(var i = this.startPoint-1; i < this.endPoint; i++){
                    this.dataPoints[i].y = 80 + loopCount*61;
                    loopCount++;
                }
            }
        }
    };

    // Mousewheel method
    this.mouseWheel = function(){
        // capture the mouseWheel data
        var mY = event.deltaY;
        
        // set the loopcount to 0
        var loopCount = 0;
  
        if(mY >= 100 && this.endPoint < dataLimit){
            // Increase the start and endpoints when scrolling
            this.startPoint += 1;
            this.endPoint += 1;
            
            // Set the Start input field
            this.control.inputField.startIn.elt.value = nf(this.startPoint);
            
            // Change only the position of the data points that'll be displayed
            for(var i = this.startPoint-1; i < this.endPoint; i++){
                this.dataPoints[i].y = 80 + (loopCount*(this.dataPoints[i].h+1));
                loopCount++;
            }
        }
        else if(mY <= -100 && this.startPoint > 1){
            // Decrease the start and endpoints when scrolling
            this.startPoint -= 1;
            this.endPoint -= 1;
            
            // Set the Start input field
            this.control.inputField.startIn.elt.value = nf(this.startPoint);
            
            // Change only the position of the data points that'll be displayed
            for(var i = this.startPoint-1; i < this.endPoint; i++){
                this.dataPoints[i].y = 80 + (loopCount*(this.dataPoints[i].h+1));
                loopCount++;
            } 
        }
        
        return false;
        
    };
    
    // MouseClicked method
    this.mouseClicked = function(){
        // Display the following information when the page start up and the home button is selected.
        if(gallery.selectedVisual.id == "Market Data")
        {
              var chartHeading = "Cryptocurrency Market Data.";
              var chartInfo = "We cover the top 100 crypto currency market data, for now. We're planning on increasing that number as we continue with debugging. \
              <br><br> \
              The data is updated every 5 minutes. \
              <br><br> \
              You can navigate directly to a number based on the rankings by entering that number in the text box at the top. \
              <br><br> \
              You also have the functionality to sort the data on the column of your choice by clicking on the column heading at the top of the table. This makes finding the information your looking for really easy and convenient.";

              var htmlP = select('#chartInfo');
              htmlP.html(chartInfo);

              var htmlH3 = select('#chartInfoHeading');
              htmlH3.html(chartHeading);
        }
        
        // only run this method if mouse is on canvas
        if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
            
            // check every data point line for mouse clicks
            for(var i = 0; i < this.dataPoints.length; i++){
                if(this.dataPoints[i].mouseClicked()){
                    break;
                }
            }

            // check the control panel for mouse clicks
            this.control.mouseClicked();
            
            // working on this - getting the update button to run a function
            /*if (this.control.updateBtn.mouseClicked(){
                console.log("Works")
            }*/
            
            // check the heading for mouse clicks
            this.heading.mouseClicked(this.dataPoints, this.startPoint-1, this.endPoint);
        }
    }
    
    // Destroy function
    this.destroy = function(){
        this.control.inputField.startIn.remove();
    }
    
    // Restore function
    this.restore = function(){
        this.control.setup();
    }
    
};


// ####################################
// Data line constructor function
// ####################################
function MarketDataLine(x, y, w, h, id, name, logo, logoLink, rank, priceUF, price, maketCapUF, marketCap,  cirSuppUF,cirSupp, maxSupp, oneDay, thirtyDay, fontCol, backCol, textS){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.mouseHover = false;
    
    this.id = id;
    this.name = name;
    this.logoLink = logoLink;
    this.logo = logo;
    this.imgLoaded = false;
    this.rank = rank;
    this.priceUF = priceUF;
    this.price = price;
    this.marketCapUF = maketCapUF;
    this.marketCap = marketCap;
    this.cirSuppUF = cirSuppUF;
    this.cirSupp = cirSupp;
    this.maxSupp = maxSupp;
    
    this.oneDay = oneDay;
    this.thirtyDay = thirtyDay;

    this.backgroundCol = color(backCol);
    this.textCol = color(fontCol);
    
    this.oriBackCol = color(backCol);
    this.oriTextCol = color(fontCol);
    
    this.tSize = textS;

    // Setup method
    this.setup = function(){
        if(this.oneDay.volume != undefined){
            var tempVol = CommaFormatted(this.oneDay.volume);
            this.oneDay.fVolume = "$ " + tempVol;
        }
    };
    
    // Draw method
    this.draw = function(){
        // container
        fill(this.backgroundCol);
        stroke(50);
        rect(this.x, this.y, this.w-1, this.h);
        noStroke();
        
        // text setup
        fill(this.textCol);
        textSize(this.tSize);
        
        // rank
        textAlign(LEFT, CENTER);
        text(this.rank, this.x+10 + this.w*0.06/6, this.y + this.h/2);
        
        // logo
        imageMode(CENTER);
        if(this.imgLoaded == true){
            if(this.mouseHover){
                fill(this.oriBackCol);
                ellipse(this.x+10 + this.w*2/30, this.y+this.h/2, this.h*8/10);
            }
            image(this.logo, this.x+10 + this.w*2/30, this.y+this.h/2);
        }else{
            fill(100,100,100);
            ellipse(this.x+10 + this.w*2/30, this.y+this.h/2, this.h*4/10);
        }
        
        // name and symbol/id
        textSize(this.tSize*3/4);
        text(this.id, this.x+10 + this.w*3/30, this.y + this.h*5/7);
        textSize(this.tSize);
        text(this.name, this.x+10 + this.w*3/30, this.y + this.h*3/7);

        // Price
        textAlign(RIGHT, CENTER);
        text(this.price, this.x+10 + this.w*10/30, this.y + this.h/2);
        
        // one day data
        fill(this.oneDay.col);
        text(this.oneDay.fPriceC, this.x+10 + this.w*12.5/30, this.y + this.h*1/2);
        
        // thirty days data
        fill(this.thirtyDay.col);
        text(this.thirtyDay.fPriceC, this.x+10 + this.w*14.5/30, this.y + this.h*1/2);
        
        // 24H volume, market cap & circulating supply
        fill(this.textCol);
        text(this.oneDay.fVolume, this.x+10 + this.w*19.5/30, this.y + this.h/2);
        text(this.marketCap, this.x+10 + this.w*24.5/30, this.y + this.h/2);
        text(this.cirSupp, this.x+10 + this.w*29/30, this.y + this.h/2);
        
    };
    
    // Mouse clicked method
    this.mouseClicked = function(){

    }

    // Mouse Hover method
    this.hover = function(){
        
        if(mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h){
            this.backgroundCol = this.oriTextCol;
            this.textCol = this.oriBackCol;
            this.mouseHover = true;
        }
        else{
            this.backgroundCol = this.oriBackCol;
            this.textCol = this.oriTextCol;
            this.mouseHover = false;
        }
    };
    
};



// ####################################
// Heading constructor function
// ####################################
function DataHeading(x, y, w, h, backCol, textCol, textS){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backCol = color(backCol);
    this.textcol = color(textCol);
    this.textSiz = textS;
    this.buttons = [];
    
    // Setup method
    this.setup = function(){
        
        textSize(this.textSiz);
        
        this.buttons.push(new HeadingButton("#", this.x+10 + this.w*0.1/6, this.y + this.h/2));
        this.buttons.push(new HeadingButton("Name / Symbol", this.x+10 + this.w*3.1/30, this.y + this.h/2));
        this.buttons.push(new HeadingButton("Price", this.x+10 + this.w*9.25/30, this.y + this.h/2));
        this.buttons.push(new HeadingButton("1D", this.x+10 + this.w*11.75/30, this.y + this.h/2));
        this.buttons.push(new HeadingButton("30D", this.x+10 + this.w*13.8/30, this.y + this.h/2));
        this.buttons.push(new HeadingButton("Volume", this.x+10 + this.w*17.8/30, this.y + this.h/2));
        this.buttons.push(new HeadingButton("Market Cap", this.x+10 + this.w*23.2/30, this.y + this.h/2));
        this.buttons.push(new HeadingButton("Circulating Supply", this.x+10 + this.w*27.5/30, this.y + this.h/2));
        
        for(var i = 0; i < this.buttons.length; i++){
            var tempWidth = textWidth(this.buttons[i].name);
            this.buttons[i].w = tempWidth;
        }
        
        //console.log(this.buttons);
    }
    
    // Draw method
    this.draw = function(){
        // container
        fill(50);
        rect(this.x, this.y, this.w, this.h);
        
        // text setup
        fill(250);
        //textSize(this.textSiz);
        for(var i = 0; i < this.buttons.length; i++){
            this.buttons[i].draw();
            this.buttons[i].hover();
        }
    }
    
    // MouseClicked method
    this.mouseClicked = function(A, startP, endP){
        
        var aButtonIsClicked = false;
        
        for(var i = 0; i < this.buttons.length; i++){
            
            if(mouseX > this.buttons[i].x - this.buttons[i].w/2 - this.buttons[i].p && 
                mouseX < this.buttons[i].x + this.buttons[i].w/2 + this.buttons[i].p && 
                mouseY > this.buttons[i].y - this.buttons[i].h/2 && 
                mouseY < this.buttons[i].y + this.buttons[i].h/2)
            {
                aButtonIsClicked = true;
            }
            
        }
   
        if(aButtonIsClicked){
            for(var i = 0; i < this.buttons.length; i++){
                if(mouseX > this.buttons[i].x - this.buttons[i].w/2 - this.buttons[i].p && 
                    mouseX < this.buttons[i].x + this.buttons[i].w/2 + this.buttons[i].p && 
                    mouseY > this.buttons[i].y - this.buttons[i].h/2 && 
                    mouseY < this.buttons[i].y + this.buttons[i].h/2)
                {
                    // which button has been selected
                    var tab = this.buttons[i].mouseClicked();

                    // the button was already selected, so reverse the sorting
                    if(this.buttons[i].isSelected)
                    {
                        // invert the topToBottom variable
                        this.buttons[i].topToBottom = !this.buttons[i].topToBottom;
                        
                        // sort based on the topToBottom variable
                        if(this.buttons[i].topToBottom){
                            sortHelper(A, tab, 'dec', startP, endP);
                        }
                        else
                        {
                            sortHelper(A, tab, 'inc', startP, endP);
                        }

                    }
                    // the button is clicked for the 1st time, sort top to bottom
                    else
                    {
                        // set the object as selected
                        this.buttons[i].isSelected = true;
                        this.buttons[i].w = this.buttons[i].w + 18;
                        
                        // sort based on the topToBottom variable
                        if(this.buttons[i].topToBottom){
                            sortHelper(A, tab, 'dec', startP, endP);
                        }
                        else
                        {
                            sortHelper(A, tab, 'inc', startP, endP);
                        }
                    }
                }
                else
                {
                    if(this.buttons[i].isSelected)
                    {
                        this.buttons[i].isSelected = false;
                        this.buttons[i].w = this.buttons[i].w - 18;
                    }
                }
            }
        }
        
    }
    
}

// ######################################
// Clickable link function - For heading
// ######################################
function HeadingButton(name, x, y){
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = null;
    this.h = 25;
    this.p = 10;
    this.bCol = color(50);
    this.fCol = color(250);
    this.isSelected = false;
    this.topToBottom = true;
    
    // Draw method
    this.draw = function(){
        stroke(100);
        fill(this.bCol);
        rect(this.x - this.w/2 - this.p, this.y-this.h/2, this.w + 2*this.p, this.h, 5);
        noStroke();
        fill(this.fCol);
        text(this.name, this.x-this.w/2, this.y);
        
        // Draw the triangle to show that the data is sorted accordingly
        if(this.isSelected == true){
            if(this.topToBottom){
                triangle(this.x + this.w/2 + this.p/2 - 18, this.y+6,
                    this.x + this.w/2 + this.p/2 - 12, this.y-8,
                    this.x + this.w/2 + this.p/2 - 6, this.y+6);
            }
            else if(!this.topToBottom)
            {
                triangle(this.x + this.w/2 + this.p/2 - 18, this.y-8,
                    this.x + this.w/2 + this.p/2 - 12, this.y+6,
                    this.x + this.w/2 + this.p/2 - 6, this.y-8);
            }
        }
        
    }
    
    // Hover method
    this.hover = function(){
        if(mouseX > this.x - this.w/2 - this.p && 
           mouseX < this.x + this.w/2 + this.p && 
           mouseY > this.y - this.h/2 && 
           mouseY < this.y + this.h/2)
        {
            this.bCol = color(250);
            this.fCol = color(50);
        }
        else
        {
            this.bCol = color(50);
            this.fCol = color(250);
        }
    }
    
    // MouseClicked method
    this.mouseClicked = function(){
        return this.name;
    }
    
}


// ####################################
// Control panel constructor function
// ####################################
function ControlPanel(x, y, w, h, backCol, textCol, textS, limit){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.backCol = color(backCol);
    this.textcol = color(textCol);
    this.textSiz = textS;
    this.maxNumber = limit;
    
    // buttons
    this.updateBtn = null;
    //this.buttons = [];
    
    // beginning number, object
    this.inputField = {
        x: 0,
        y: 0,
        h: 0,
        inputBoxWidth: null,
        startText: "Displaying: ",
        startTextW: null,
        startIn: null,
        endText: "Length: ",
        endTextW: null,
        lineQty: limit,
        
        setup: function(btnW, x, y, h, textS){
            textSize(textS);
            this.x = x + btnW+5;
            this.y = y;
            this.h = h;
            var boxMax = "10000";
            var boxWidth = textWidth(boxMax);
            this.startIn = createInput(0, int);
            this.startTextW = textWidth(this.startText)+5;
            this.startIn.size(boxWidth);
            this.startIn.position(200 + this.x + this.startTextW, 65 + this.y + this.h*1/8, 'relative');
            this.startIn.elt.value = 1;
            // Hide the input box untill the page has loaded
            select('input').style('display', "none");
        },
        
        draw: function(){
            fill(255);
            // Start
            text(this.startText, this.x+15, this.y + this.h/2);
            
            // Current selection
            text(" to " + (int(this.startIn.elt.value)+this.lineQty-1), this.x + this.startTextW + this.startIn.width, this.y + this.h/2);
        },
    };
    
    // Setup method
    this.setup = function(){
        // text size
        textSize(this.textSiz);
        
        // refresh button
        var btnText = "Update Data";
        var btnWidth = textWidth(btnText)+15;
        this.updateBtn = new Button(btnText, this.x+10, this.y+this.h*1/8, btnWidth, this.h*3/4);
        
        // input field for beginning rank
        //this.inputField.setup(this.updateBtn.x + this.updateBtn.w +10, this.x, this.y, this.h, this.textSiz); // position with button
        this.inputField.setup(0, this.x, this.y, this.h, this.textSiz); // position without button
    }
    
    // Draw method
    this.draw = function(){
        // container
        fill(50);
        rect(this.x, this.y, this.w, this.h);
        
        // text setup
        fill(250);
        textAlign(LEFT, CENTER);
        
        // buttons
        //this.updateBtn.draw();
        
        // inputfield
        this.inputField.draw();
        
        // check mouse hover
        this.updateBtn.hover();
    }
    
    // Hover method
    this.hover = function(){
        // buttons
        this.updateBtn.hover();
    }
    
    // MouseClicked method
    this.mouseClicked = function(){
        // only run this function if mouse is over control panel
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
            // buttons
            this.updateBtn.mouseClicked();
        }
    }
    
    // Keypressed method
    this.keyPressed = function(){
        //console.log(this.inputField);
    }
}


// ############################################
// Control panel buttons constructor function
// ############################################
function Button(name, xPos, yPos, w, h){
    this.name = name;
    this.x = xPos;
    this.y = yPos;
    this.h = h;
    this.w = w + 10;
    this.padding = 10;
    this.clicked = false;
    
    this.backCol = color(255);
    this.textCol = color(50);
    
    // Draw method
    this.draw = function(){
        fill(this.backCol);
        rect(this.x, this.y, this.w, this.h, 5);
        
        fill(this.textCol);
        text(this.name, this.x+this.padding, this.y + this.h/2);
    }
    
    // Hover method
    this.hover = function(){
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
            this.backCol = color(200);
            this.textCol = color(50);
        }
        else
        {
            this.backCol = color(255);
            this.textCol = color(50);
        }
    }
    
    // MouseClicked method
    this.mouseClicked = function(){
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
            // working on this - update prices when button is clicked
            console.log("Button clicked: " + this.name);
            
            // Load the data from the nomics.json file
            /*loadJSON("./node_js/data/nomics.json", function(data){
                nomicsDataFile = data;
                console.log("data loaded.");
                console.log(nomicsDataFile);
            });*/
            
            this.clicked = true;
        }
    }
    
}



// ####################################
// Comma format function
// ####################################
function CommaFormatted(amount) {
    if(amount == undefined)
    {
        return 0;
    }
    else
    {
        var a = amount.toString();
    
        var n = a.indexOf(".");
        var decimals = null;

        var l = null;
        var fL = a.length;

        if(n == -1){
            l = a.length;
        }else{
            l = n;
            decimals = a.slice(n,fL);
        }

        var fA = "";

        var count = 0;

        for(var i = l; i >= 0; i--){
            if(count != 0 && count%3 == 0){
                fA = "," + a.slice(i,i+3) + fA;
            }
            count++;
        }
        if(l%3 != 0){
            fA = a.slice(0,l%3) + fA;
        }else{
            var aL = fA.length
            fA = fA.slice(1,aL.length);
        }

        if(decimals != null){
            fA = fA + decimals;
        }

        return fA;
    }
    
};


// ####################################
// Sort function
// ####################################
function bubbleSort(A, P1, P2, C){
    swapped = true;
    var N = A.length;
    var TP1 = null;
    var TP2 = null;
    
    while(swapped){
        swapped = false;
        
        // Use 1 level ofject slection
        if(P2 == null){
            for(var i = 0; i < N-1; i++){
                
                if(P1 == 'name'){
                    TP1 = A[i][P1].toUpperCase();
                    TP2 = A[i+1][P1].toUpperCase();
                }else{
                    TP1 = float(A[i][P1]);
                    TP2 = float(A[i+1][P1]);
                }
                
                if(C == 'inc'){
                    if(TP1 < TP2){
                        // Swap the two objects
                        //swap(A[i], A[i+1]);
                        var x = A[i];
                        A[i] = A[i+1];
                        A[i+1] = x;
                        swapped = true;
                    }
                }
                else if(C == 'dec')
                {
                    if(TP1 > TP2){
                        // Swap the two objects
                        //swap(A[i], A[i+1]);
                        var x = A[i];
                        A[i] = A[i+1];
                        A[i+1] = x;
                        swapped = true;
                    }
                }
            }
        }
        // Use 2 level object selection
        else{
            for(var i = 0; i < N-1; i++){
                TP1 = float(A[i][P1][P2]);
                TP2 = float(A[i+1][P1][P2]);
                if(C == 'inc'){
                    if(TP1 < TP2){
                        // Swap the two objects
                        //swap(A[i], A[i+1]);
                        var x = A[i];
                        A[i] = A[i+1];
                        A[i+1] = x;
                        swapped = true;
                    }
                }
                else if(C == 'dec')
                {
                    if(TP1 > TP2){
                        // Swap the two objects
                        //swap(A[i], A[i+1]);
                        var x = A[i];
                        A[i] = A[i+1];
                        A[i+1] = x;
                        swapped = true;
                    }
                }
            }
        }
        
        N = N-1;
    }
    
    return A;
}

// ####################################
// Sort helper function
// ####################################
function sortHelper(A, tab, dir, startP, endP){
    // return the name of the tab that's been clicked
    var P1 = null;
    var P2 = null;

    // align the name of the clicked tab to the data point name
    if(tab == "#"){
        P1 = 'rank';
    }
    else if(tab == "Name / Symbol"){
        P1 = 'name';
    }
    else if(tab == "Price"){
        P1 = 'priceUF';
    }
    else if(tab == "1D"){
        P1 = 'oneDay';
        P2 = 'price_change_pct';
    }
    else if(tab == "30D"){
        P1 = 'thirtyDay';
        P2 = 'price_change_pct';
    }
    else if(tab == "Volume"){
        P1 = 'oneDay';
        P2 = 'volume';
    }
    else if(tab == "Market Cap"){
        P1 = 'marketCapUF';
    }
    else if(tab == "Circulating Supply"){
        P1 = 'cirSuppUF';
    }

    if(P1 == null){
        alert('Invalid tab selection');
    }
    else{
        // 2nd level object selection
        bubbleSort(A, P1, P2, dir);
        var loopCount = 0;
        for(var i = startP; i < endP; i++){
            A[i].y = 80 + (loopCount*(A[i].h+1));
            loopCount++;
        }
    }

}

