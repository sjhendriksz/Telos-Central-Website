// This information was retrieved from the following website:
// https://developers.eos.io/eosio-nodeos/reference#get_producers

// This function will gather data from an external server API endpoint.
// The server is run and operated by myself and I've setup a subdomain name of sslapi.teloscentral.com which is linked to the public IP address of my server.
// The HTTP request is handled by port 8881 and the HTTPS request is handled by port 9991.
// I make use of a NGINX reverse proxy which will redirect HTTP requests to HTTPS, as well as forward all requests comming in port 80 and 443 to port 8881 and 9991 respectively, which is why the port number does not need to be specified in the URL as can be seen in line 26.

// Added files to github

function VotingData(){
    
    // ###############################################
    //Global & local variables for all sub-functions
    // ###############################################
    var step1;
    var step2;

    var serverInfo;
    var bpOnchainData;
    var countryCodes;
    var bpJsons = [];
    var bpListPos = 0;
    var bpListQty = 0;
    var bpRankedList = [];
    var bubbles = [];
    var sortedBubbles = [];
    var maxBlockNum = 0;
    var histogramBars = [];
    var radialBars = [];

    // Name, ID and loaded variables.
    this.name = '<i class="fas fa-chart-pie fa-lg navicons"></i>BP Votes';
    this.id = 'BP-Votes';
    this.loaded = false;
    this.isLoaded = false;
    
    // Control panel
    var controlPanel;
    var controlPanelWidth = 100;
    var controlPanelheight = height;
    var controlPanelX = width - controlPanelWidth;
    var controlPanelY = 0;
    var chartWidth = width;
    var chartheight = height;
    var chartMargin = 5;

    // #########################################
    // Preload Function.
    // #########################################
    this.preload = function() {
        
        if(this.isLoaded == false){
            
            // Initialize the following variables and arrays
            step1 = false;
            step2 = false;

            // First we'll ping the blockchain server with a get info request to see if the endpoint is open and responds to the request.
            let url = "https://sslapi.teloscentral.com/v1/chain/get_info";

            httpGet(url, "json", false, function(response) {
                serverInfo = response;
                //console.log(serverInfo);
            });

            // Secondly we'll send a request to the web server where the bp.json file is hosted in order to get the block producer specific information.
            let urlJson = "https://teloscentral.com/bp.json";

            httpGet(urlJson, "json", false, function(response) {
                var bpJson = response;
                //console.log(bpJson);
            });

            if(!step1){
                // The data of a maximum of 150 block producers will be gathered.
                var data = "{\"limit\":\"150\",\"json\":true}";
                // save a new http request to the variable xhr.
                var xhr = new XMLHttpRequest();

                xhr.addEventListener("readystatechange", function () {
                  if (this.readyState === this.DONE) {

                    // Write the data in JSON format to the global variable, bpData.
                    bpOnchainData = JSON.parse(this.responseText);

                    // Set step 1 to true
                    step1 = true;

                  };
                });

                // Send a Post request to my own server, which has the sub domain name sslapi.teloscentral.com to get the block producer information from all registered block producers.
                xhr.open("POST", "https://sslapi.teloscentral.com/v1/chain/get_producers");
                xhr.setRequestHeader("accept", "application/json");
                xhr.setRequestHeader("content-type", "application/json");

                xhr.send(data);
                
                // load the country codes excel doc
                countryCodes = loadTable('countryCodes/countryCodes.csv', 'csv', 'header');
                // console.log(countryCodes);

            };
        }
    };
    
    // #########################################
    // Setup function.
    // #########################################
    this.setup = function(){
        
        if(this.isLoaded == false){
            
            //console.table(bpOnchainData.rows);

            // Create the control panel on the right side of the canvas.
            //function SidePanel(x, y, PanelWidth, Panelheight)
            controlPanel = new SidePanel(controlPanelX, controlPanelY, controlPanelWidth-2*chartMargin, controlPanelheight);

            // Resize the canvas to fit the chart and the control panel.
            chartWidth = width - controlPanelWidth - chartMargin;
            
            // Once the onChain data has been received, compile the bubbles and histogramBars array.
            compileRankedList();
            compileBubblesArray();
            compileHistogram();
            compileRadial();

            //run the setup function for the control panel
            controlPanel.setup();
                        
            this.isLoaded = true;
            
        }
    };
    
    // #########################################
    // Compile a Ranked List array function.
    // #########################################
    function compileRankedList(){
        
        // show me the onchain data in the console
        // console.table(bpOnchainData.rows);
        
        // line positions
        xPos = 0;
        yPos = 0;
        wdt = chartWidth;
        hgt = 45;
        // hgt = chartheight/15;
        
        // bpLine(x, y, w, h, rank, logo, name, location, blocksProduced, votes)
        // push the header into the array
        bpRankedList.push(new bpLine(xPos, yPos, wdt, hgt, "RANK", "LOGO", "NAME", "LOCATION", "BLOCKS", "VOTES"));
        
        // push the active bp data into the bpRankedList array for display
        for(var i = 0; i < bpOnchainData.rows.length; i++)
        {
            if(bpOnchainData.rows[i].is_active == 1){
                yPos = hgt + (hgt*i);
                
                var rank = i+1;
                var name = bpOnchainData.rows[i].owner;
                var logo = "...";
                
                //var location = "null";
                var location = bpOnchainData.rows[i].location;
                
                for(var j = 0; j < countryCodes.getColumn("uncode").length; j++){
                    if(bpOnchainData.rows[i].location == countryCodes.getColumn("uncode")[j]){
                        if(countryCodes.getColumn("Country")[j] == "United Kingdom of Great Britain and Northern Ireland"){
                            location = "United Kingdom";
                        }
                        else if(countryCodes.getColumn("Country")[j] == "United States of America"){
                            location = "United States";
                        }
                        else if(countryCodes.getColumn("Country")[j].includes("(")){
                            var endChar = countryCodes.getColumn("Country")[j].indexOf("(");
                            location = countryCodes.getColumn("Country")[j].slice(0, endChar);
                        }
                        else{
                            location = countryCodes.getColumn("Country")[j];
                        }
                    }
                }
                
                var blocksProduced = bpOnchainData.rows[i].lifetime_produced_blocks
                var vote = round(bpOnchainData.rows[i].total_votes/10000);
                
                bpRankedList.push(new bpLine(xPos, yPos, wdt, hgt, rank, logo, name, location, blocksProduced, vote));
            };
        };
        
        console.log(bpRankedList);
        
    };
    
    // #########################################
    // Compile bubble array function.
    // #########################################
    function compileBubblesArray(){
        
        // Get the biggest votes received number
        var maxVotes = 0;
        for(var i = 0; i < bpOnchainData.rows.length; i++){
            var voteCount = round(bpOnchainData.rows[i].total_votes/10000, 0);
            if(voteCount > maxVotes){
                maxVotes = voteCount;
            };
        };

        // push a new bubble object into the bubbles array.
        var bubbleCount = 0;
        for(var i = 0; i < bpOnchainData.rows.length; i++)
        {
            if(bpOnchainData.rows[i].is_active == 1){
                bubbleCount = bubbleCount + 1;
            }
        }
        
        for(var i = 0; i < bpOnchainData.rows.length; i++)
        {
            if(bpOnchainData.rows[i].is_active == 1){
                var name = bpOnchainData.rows[i].owner;
                var rank = i;
                var vote = round(bpOnchainData.rows[i].total_votes/10000);
                bubbles.push(new Bubble(name, rank, vote, maxVotes, chartWidth, chartheight, bubbleCount));
            };
        };
    };
    
    // #########################################
    // Compile a Histogram array function.
    // #########################################
    function compileHistogram(colour){
        
        // Get the biggest votes received number
        var maxVotes = 0;
        for(var i = 0; i < bpOnchainData.rows.length; i++){
            var voteCount = round(bpOnchainData.rows[i].total_votes/10000, 0);
            if(voteCount > maxVotes){
                maxVotes = voteCount;
            };
        };
        
        // calculate the bar width relative to the chartwidth
        var barSpacing = 2;
        var activeBPs = 0;
        for(var i = 0; i < bpOnchainData.rows.length; i++)
        {
            if(bpOnchainData.rows[i].is_active == 1){
                activeBPs++;
            };
        };
        var barWidth = (chartWidth/activeBPs)-barSpacing;
        var y = height;

        // push a new histogram bar object into the histogramBars array.
        for(var i = 0; i < bpOnchainData.rows.length; i++)
        {
            if(bpOnchainData.rows[i].is_active == 1){
                var name = bpOnchainData.rows[i].owner;
                var rank = i;
                var vote = round(bpOnchainData.rows[i].total_votes/10000);
                var x = 0 + (i*barWidth) + (i*barSpacing);
                
                // HistogramBar(x, y, w, name, rank, vote, maxVotes, chartWidth, chartheight, colour)
                // Use the same colour on the histogram chart as the Bubble chart
                histogramBars.push(new HistogramBar(x, y, barWidth, barSpacing, name, rank, vote, maxVotes, chartWidth, chartheight, bubbles[i].colour));
            };
        };
    };
    
    // #########################################
    // Compile a Radial Bar chart array function.
    // #########################################
    function compileRadial(colour){
        
        // Get the biggest votes received number
        var maxVotes = 0;
        for(var i = 0; i < bpOnchainData.rows.length; i++){
            var voteCount = round(bpOnchainData.rows[i].total_votes/10000, 0);
            if(voteCount > maxVotes){
                maxVotes = voteCount;
            };
        };
        
        // calculate the size of the radial bar relative to the chartheight
        var barSpacing = 0;
        var activeBPs = 0;
        for(var i = 0; i < bpOnchainData.rows.length; i++)
        {
            if(bpOnchainData.rows[i].is_active == 1){
                activeBPs++;
            };
        };
        
        // calculate on the barsize based on whichever is the smalles, width or height, in order for the chart to fit.
        if(chartheight < chartWidth){
            var barWidth = ((chartheight-10)/(activeBPs*2))-(barSpacing/2);
        }
        else{
            var barWidth = ((chartWidth-10)/(activeBPs*2))-(barSpacing/2);
        }
        

        // push a new radial bar object into the radialBars array.
        var numOfActiveBps = 0;
        
        for(var i = 0; i < bpOnchainData.rows.length; i++)
        {
            if(bpOnchainData.rows[i].is_active == 1){
                numOfActiveBps++;
            }
        }
        
        for(var i = 0; i < numOfActiveBps; i++)
        {
            if(bpOnchainData.rows[i].is_active == 1){
                var name = bpOnchainData.rows[i].owner;
                var rank = i;
                var vote = round(bpOnchainData.rows[i].total_votes/10000);
                var totalRadius =  ((numOfActiveBps)*(barWidth*2)) + ((numOfActiveBps)*(barSpacing));
                var barRadius = 0 + ((numOfActiveBps-i)*(barWidth*2)) + ((numOfActiveBps-i)*(barSpacing));
                
                // RadialBar(radius, barWidth, name, rank, vote, maxVotes, chartWidth, chartheight, colour)
                // Use the same colour on the histogram chart as the Bubble chart
                radialBars.push(new RadialBar(barRadius, barWidth, barSpacing, name, rank, vote, maxVotes, chartWidth, chartheight, bubbles[i].colour, totalRadius));
            };
        };
    };
    
    // #########################################
    // Draw Function.
    // #########################################
    this.draw = function() {
        // Refresh background.
        background(canvasBackgroundColour);
        
        // Do not draw anything, until the setup function has completed.
        if(this.isLoaded){
            
            // only draw the chart once all the data has been gathered.
            if(step1){
                
                //------------------------------------------------
                // Ranked list icon is selected.
                //------------------------------------------------
                if(controlPanel.icons[0].isSelected){
                    
                    var lineHeight = bpRankedList[0].h;
                    bpListQty = floor(height / lineHeight);
                    
                    // Draw the header
                    bpRankedList[0].draw();
                    // Draw the rest of the lines
                    for(var i = 1; i < bpListQty; i++){
                        bpRankedList[bpListPos+i].y = lineHeight + (lineHeight*(i-1));
                        bpRankedList[bpListPos+i].draw();
                    }
                    
                }
                
                //------------------------------------------------
                // Scattered bubble chart icon is selected.
                //------------------------------------------------
                if(controlPanel.icons[1].isSelected){
                    if(controlPanel.allRadialBarsInvisible == true && controlPanel.allHistogramBarsInvisible == true){
                        push();
                            translate(chartWidth/2, chartheight/2);
                            for(var i = 0; i < bubbles.length; i++)
                            {
                                bubbles[i].updateDirection(bubbles);
                                bubbles[i].draw();
                            };

                            for(var j = 0; j < bubbles.length; j++)
                            {
                                bubbles[j].mouseHover();
                            };
                        pop();
                    }
                    
                    // Fade out the histogram bars
                    push();
                        translate(0, 0);
                        for(var i = 0; i < histogramBars.length; i++){
                            histogramBars[i].draw();
                            histogramBars[i].decreaseHeight();
                        }
                    pop();
                    
                    // Fade out the Radial bar chart
                    push();
                        for(var i = 0; i < radialBars.length; i++)
                        {
                            radialBars[i].draw();
                            radialBars[i].decreaseSize();
                        };
                    pop();
                }
                
                //------------------------------------------------
                // Ordered bubble chart icon is selected.
                //------------------------------------------------
                if(controlPanel.icons[2].isSelected)
                {
                    // A new array where the bubbles are ordered from big to small needs to be used here, or
                    // the positions of the existing array of bubbles needs to be changed.
                    if(controlPanel.allRadialBarsInvisible == true && controlPanel.allHistogramBarsInvisible == true){
                        push();
                            translate(chartWidth/2, chartheight/2);

                            for(var i = 0; i < bubbles.length; i++)
                            {
                                bubbles[i].orderBubbles(bubbles);
                                bubbles[i].draw();
                            };
                            for(var j = 0; j < bubbles.length; j++)
                            {
                                bubbles[j].mouseHover();
                            };
                        pop();
                    }
                    
                    
                    // Fade out the histogram bars
                    if(controlPanel.allHistogramBarsInvisible == false){
                        push();
                            translate(0, 0);
                            for(var i = 0; i < histogramBars.length; i++){
                                histogramBars[i].draw();
                                histogramBars[i].decreaseHeight();
                            }
                        pop();
                    }
                    
                    // Fade out the Radial bar chart
                    if(controlPanel.allRadialBarsInvisible == false){
                        push();
                            for(var i = 0; i < radialBars.length; i++)
                            {
                                radialBars[i].draw();
                                radialBars[i].decreaseSize();
                            };
                        pop();
                    }
                }
                
                //------------------------------------------------
                // Histogram representation of the voting data
                //------------------------------------------------
                if(controlPanel.icons[3].isSelected)
                {
                    
                    // Draw and move the histogram bars.
                    if(controlPanel.allBubblesInvisible == true && controlPanel.allRadialBarsInvisible == true){
                       push();
                            translate(0, 0);
                            // First draw the histogram bars
                            for(var i = 0; i < histogramBars.length; i++)
                            {
                                histogramBars[i].draw();
                                histogramBars[i].increaseHeight();
                            };
                            // Secondly, draw the tooltip.
                            for(var j = 0; j < histogramBars.length; j++)
                            {
                                histogramBars[j].mouseHover();
                            };
                        pop();
                    }
                    
                    
                    // Fade out the bubbles.
                    if(controlPanel.allBubblesInvisible == false){
                        push();
                            translate(chartWidth/2, chartheight/2);
                            for(var i = 0; i < bubbles.length; i++)
                            {
                                bubbles[i].fadeOutBubbles(bubbles);
                                if(bubbles[i].visible == true){
                                    bubbles[i].draw();
                                }
                            };
                        pop();
                    }
                    
                    // Fade out the Radial bar chart
                    if(controlPanel.allRadialBarsInvisible == false){
                        push();
                            for(var i = 0; i < radialBars.length; i++)
                            {
                                radialBars[i].draw();
                                radialBars[i].decreaseSize();
                            };
                        pop();
                    }
                    
                }
                
                //------------------------------------------------------
                // Radial Bar chart representation of the voting data
                //------------------------------------------------------
                if(controlPanel.icons[4].isSelected)
                {
                    if(controlPanel.allBubblesInvisible == true && controlPanel.allHistogramBarsInvisible == true){
                        // Draw the radial bars.
                        for(var i = 0; i < radialBars.length; i++){
                            radialBars[i].visible = true;
                            radialBars[i].draw();
                            radialBars[i].increaseSize();
                        }
                        // Draw the tooltip.
                        for(var j = 0; j < radialBars.length; j++)
                        {
                            radialBars[j].mouseHover();
                        };
                    }
                    
                    // Fade out the bubbles.
                    if(controlPanel.allBubblesInvisible == false){
                        push();
                            translate(chartWidth/2, chartheight/2);
                            for(var i = 0; i < bubbles.length; i++)
                            {
                                bubbles[i].fadeOutBubbles(bubbles);
                                if(bubbles[i].visible == true){
                                    bubbles[i].draw();
                                }
                            };
                        pop();
                    }
                    
                    // Fade out the histogram bars
                    if(controlPanel.allHistogramBarsInvisible == false){
                        push();
                            translate(0, 0);
                            for(var i = 0; i < histogramBars.length; i++){
                                histogramBars[i].draw();
                                histogramBars[i].decreaseHeight();
                            }
                        pop();
                    }
                }
                
            };
            // Draw the side control panel
            controlPanel.draw();
        };
    };
    
    
    // #########################################
    // Mouse Clicked Function.
    // #########################################
    this.mouseClicked = function() {
        // Run the control panel mouse clicked functions
        controlPanel.mouseClicked(bubbles, histogramBars, radialBars);
        
        // If none of the control panel charts have been selected, display the following information.
        /*if(gallery.selectedVisual.id == "BP-Votes" && controlPanel.icons[0].isSelected == false && controlPanel.icons[1].isSelected == false && controlPanel.icons[2].isSelected == false && controlPanel.icons[3].isSelected == false)
        {
              var chartHeading = "Select a chart type from the selection on the right.";
              var chartInfo = "More information related to the selected chart will be displayed here.";

              var htmlP = select('#chartInfo');
              htmlP.html(chartInfo);

              var htmlH3 = select('#chartInfoHeading');
              htmlH3.html(chartHeading);
        }*/
        
    };
    
    
    // #################################################################
    // Mouse pressed function.
    // #################################################################
    this.mousePressed = function(){
        // call the mouse presssed function an all objects
        for(var i = 0; i < radialBars.length; i++){
            radialBars[i].mousePressed();
        }
    }
    
    // #################################################################
    // Mouse released function.
    // #################################################################
    this.mouseReleased = function(){
        // call the mouse released function an all objects
        for(var i = 0; i < radialBars.length; i++){
            radialBars[i].mouseReleased();
        }
    }
    
    // #########################################
    // Mouse Wheel Function.
    // #########################################
    this.mouseWheel = function(){
        
        // only run this funciton if the BP list is selected
        if(controlPanel.icons[0].isSelected)
        {
            if(event.delta >= 100 && bpListPos < bpRankedList.length - bpListQty){
                bpListPos += 1;
            }else if(event.delta <= -100 && bpListPos >= 1){
                bpListPos -= 1;
            }
            
            // console.log(event.delta);
            //return false;
            
        }
        
        // only run this function if the radial bar graph is selected
        if(controlPanel.icons[3].isSelected)
        {
            // call the mouseWheel function an all objects
            for(var i = 0; i < radialBars.length; i++){
                radialBars[i].mouseWheel();
            }

            return false;
        }
    }
    
    
    // #################################################################
    // Mouse drag function.
    // #################################################################
    this.mouseDragged = function(){
        // only call the functions when the mouse is on the canvas
        if(mouseX > 0 && mouseX < controlPanelX && mouseY > 0 && mouseY < chartheight){
            // call the mouseDragged function an all objects
            for(var i = 0; i < radialBars.length; i++){
                radialBars[i].mouseDragged();
            }
        }
        
    }

    
}

