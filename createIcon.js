function createIcon(i, x, y, w, h, m)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.m = m;
    this.index = i;
    this.isSelected = false;
    this.descriptionLine1 = "";
    this.descriptionLine2 = "";
    
    this.chartHeading = "";
    this.chartInfo = "";

    this.textS = 16;
    this.backgroundColour = color(50);
    this.foregroundColour = color(175);
    
    this.draw = function()
    {
        stroke(this.foregroundColour);
        strokeWeight(1);
        textSize(this.textS);
        textAlign(CENTER, TOP);

        // ##############################
        // BP ranked list
        // ##############################
        if(this.index == 0){
            // Display the chart info on the webpage
            /*if(this.isSelected && gallery.selectedVisual.id == "BP-Votes")
            {
                this.chartHeading = "The Scattered Bubble Chart.";
                this.chartInfo = "This is the Scattered Bubble Chart where bubbles move away from each other in a scattered pattern. \
                <br><br> \
                The size of the bubble correlates directly to the number of votes each block producer has on the Telos blockchain. The Telos blockchain is a third-generation blockchain that utilizes a delegated proof of stake consensus algorithm where the different delegates (also known as Block Producers) are voted for by the token holders. \
                <br><br> \
                The information is displayed in real-time and is requested via an API endpoint from our server, that is synchronized to the Telos blockchain network. \
                <br><br> \
                More information will be displayed when the mouse is moved over a bubble, like the Block Producer name, the number of actual votes, as well as the rank number in the Block Producer standings. \
                <br><br> \
                The colour of each bubble is generated at random, so sometimes, some of the colours might be difficult to see against a white or black background, so the option to change the canvas background between black and white is also available.";
                
                var htmlP = select('#chartInfo');
                htmlP.html(this.chartInfo);
                
                var htmlH3 = select('#chartInfoHeading');
                htmlH3.html(this.chartHeading);
            }*/
            
            // Tooltip description of the icon
            this.descriptionLine1 = "A ranked list of BP standings";
            this.descriptionLine2 ="based on the voting data.";
            
            push();
            
            // Draw four ellipses in a rectangle.
            fill(this.backgroundColour);
            rect(this.x, this.y, this.w, this.h);

            fill(this.foregroundColour);
            var hInt = this.h*1/10;
            var wInt = this.w*1/10;
            for(var i = 0; i < 4; i++){
                rect(this.x+wInt, this.y+2*hInt+(i*2*hInt), this.w-3*wInt, hInt);
            }
            
            
            noStroke();
            var textW = textWidth(this.index);
            text(this.index, this.x+this.w-textW, this.y+textW);
            
            pop();
            
            if(!this.isSelected){
                this.hover();
            }
            
        }
        
        // ##############################
        // Scattered bubble chart
        // ##############################
        if(this.index == 1){
            // Display the chart info on the webpage
            /*if(this.isSelected && gallery.selectedVisual.id == "BP-Votes")
            {
                this.chartHeading = "The Scattered Bubble Chart.";
                this.chartInfo = "This is the Scattered Bubble Chart where bubbles move away from each other in a scattered pattern. \
                <br><br> \
                The size of the bubble correlates directly to the number of votes each block producer has on the Telos blockchain. The Telos blockchain is a third-generation blockchain that utilizes a delegated proof of stake consensus algorithm where the different delegates (also known as Block Producers) are voted for by the token holders. \
                <br><br> \
                The information is displayed in real-time and is requested via an API endpoint from our server, that is synchronized to the Telos blockchain network. \
                <br><br> \
                More information will be displayed when the mouse is moved over a bubble, like the Block Producer name, the number of actual votes, as well as the rank number in the Block Producer standings. \
                <br><br> \
                The colour of each bubble is generated at random, so sometimes, some of the colours might be difficult to see against a white or black background, so the option to change the canvas background between black and white is also available.";
                
                var htmlP = select('#chartInfo');
                htmlP.html(this.chartInfo);
                
                var htmlH3 = select('#chartInfoHeading');
                htmlH3.html(this.chartHeading);
            }*/
            
            // Tooltip description of the icon
            this.descriptionLine1 = "A scattered bubble chart representation";
            this.descriptionLine2 ="of the voting data per block producer.";
            
            push();
            
            // Draw four ellipses in a rectangle.
            fill(this.backgroundColour);
            rect(this.x, this.y, this.w, this.h);

            fill(this.foregroundColour);
            ellipse(this.x + this.w/2-20, this.y+this.h/2-20, 30, 30);
            ellipse(this.x + this.w/2+20, this.y+this.h/2+20, 30, 30);
            ellipse(this.x + this.w/2-20, this.y+this.h/2+20, 20, 20);
            ellipse(this.x + this.w/2+20, this.y+this.h/2-20, 20, 20);
            
            noStroke();
            var textW = textWidth(this.index);
            text(this.index, this.x+this.w-textW, this.y+textW);
            
            pop();
            
            if(!this.isSelected){
                this.hover();
            }
            
        }
        
        // ##############################
        // Ordered bubble chart
        // ##############################
        else if(this.index == 2)
        {
            // Display the chart info on the webpage
           /* if(this.isSelected && gallery.selectedVisual.id == "BP-Votes"){
                this.chartHeading = "The Ordered Bubble Chart.";
                this.chartInfo = "This is the Ordered Bubble Chart where bubbles are ordered from big to small. \
                <br><br>The position of the first bubble is calculated and then the position of each of the following bubbles are calculated based on the size and position of the previous bubble. \
                <br><br> \
                The size of the bubble correlates directly to the number of votes each block producer has on the Telos blockchain. The Telos blockchain is a third-generation blockchain that utilizes a delegated proof of stake consensus algorithm where the different delegates (also known as Block Producers) are voted for by the token holders. \
                <br><br> \
                The information is displayed in real-time and is requested via an API endpoint from our server, that is synchronized to the Telos blockchain network. \
                <br><br> \
                More information will be displayed when the mouse is moved over a bubble, like the Block Producer name, the number of actual votes, as well as the rank number in the Block Producer standings. \
                <br><br> \
                The colour of each bubble is generated at random, so sometimes, some of the colours might be difficult to see against a white or black background, so the option to change the canvas background between black and white is also available.";
                
                var htmlP = select('#chartInfo');
                htmlP.html(this.chartInfo);
                
                var htmlH3 = select('#chartInfoHeading');
                htmlH3.html(this.chartHeading);
            }*/
            
            // Tooltip description of the icon
            this.descriptionLine1 = "An ordered bubble chart representation";
            this.descriptionLine2 ="of the voting data per block producer.";
            
            push();
            
            // Draw ordered ellipses in a rectangle.
            fill(this.backgroundColour);
            rect(this.x, this.y, this.w, this.h);

            fill(this.foregroundColour);
            ellipse(this.x + this.w/2-20, this.y+this.h/2-20, 30, 30);
            ellipse(this.x + this.w/2+5, this.y+this.h/2-20, 20, 20);
            ellipse(this.x + this.w/2+22.5, this.y+this.h/2-20, 15, 15);
            
            ellipse(this.x + this.w/2-20, this.y+this.h/2+20, 30, 30);
            ellipse(this.x + this.w/2+5, this.y+this.h/2+20, 20, 20);
            ellipse(this.x + this.w/2+22.5, this.y+this.h/2+20, 15, 15);
            
            noStroke();
            textW = textWidth(this.index);
            text(this.index, this.x+this.w-textW, this.y+textW);
            
            pop();
            
            if(!this.isSelected){
                this.hover();
            }  
        }
        
        // ##############################
        // Histogram
        // ##############################
        else if(this.index == 3)
        {
            // Display the chart info on the webpage
            /*if(this.isSelected && gallery.selectedVisual.id == "BP-Votes"){
                this.chartHeading = "The Histogram Chart.";
                this.chartInfo = "This is the Histogram Bar Chart where the bars are ordered from big to small. \
                <br><br> \
                The position of the bars, as well as the width of each bar, is calculated and based on the width of the canvas. \
                <br><br> \
                The height of each bar correlates directly to the number of votes each block producer has on the Telos blockchain. The Telos blockchain is a third-generation blockchain that utilizes a delegated proof of stake consensus algorithm where the different delegates (also known as Block Producers) are voted for by the token holders.  \
                <br><br> \
                The information is displayed in real-time and is requested via an API endpoint from our server, that is synchronized to the Telos blockchain network. \
                <br><br> \
                All these charts are responsive, so changing the window size will automatically calculate the area of the canvas and in turn, resize the bar width and height accordingly. \
                <br><br> \
                More information about the relative block producer is displayed in the form of a popup tooltip when moving the mouse over one of the bars. The information includes the name, the delegated votes and the rank of the block producer. \
                <br><br> \
                The colour of each histogram bar is generated at random, so sometimes, some of the colours might be difficult to see against a white or black background, so the option to change the canvas background between black and white is also available.";
                
                var htmlP = select('#chartInfo');
                htmlP.html(this.chartInfo);
                
                var htmlH3 = select('#chartInfoHeading');
                htmlH3.html(this.chartHeading);
            }*/
            
            // Tooltip description of the icon
            this.descriptionLine1 = "A histogram representation of the"
            this.descriptionLine2 ="voting data per block producer.";
            
            push();
            
            // Draw accending pillars.
            fill(this.backgroundColour);
            rect(this.x, this.y, this.w, this.h);

            fill(this.foregroundColour);
            rect(this.x + this.w*1.5/10, this.y+this.h*2/10, 10, this.h*8/10);
            rect(this.x + this.w*3.5/10, this.y+this.h*4/10, 10, this.h*6/10);
            rect(this.x + this.w*5.5/10, this.y+this.h*6/10, 10, this.h*4/10);
            rect(this.x + this.w*7.5/10, this.y+this.h*8/10, 10, this.h*2/10);
            
            noStroke();
            textW = textWidth(this.index);
            text(this.index, this.x+this.w-textW, this.y+textW);
            
            pop();
            
            if(!this.isSelected){
                this.hover();
            }  
        }
        
        // ##############################
        // Radial Bar Chart
        // ##############################
        else if(this.index == 4)
        {
            // Display the chart info on the webpage
            /*if(this.isSelected && gallery.selectedVisual.id == "BP-Votes"){
                this.chartHeading = "Radial Bar Chart.";
                this.chartInfo = "This is the Radial Bar Chart is a data representation where the bars are drawn in a circular pattern. This chart has zoom and scroll functionality, so when the mouse is over the canvas the user can click and drag the chart, as well as zoom in and out using the mousewheel. \
                <br><br> \
                The length, as well as the width of each radial bar, correlates directly to the number of votes each block producer has on the Telos blockchain. \
                <br><br> \
                The length of each bar is calculated based on the number of votes that are delegated to that specific block producer, which is then converted to a number between 0 degrees and 360 degrees, which determines the length of the radial bar. \
                <br><br> \
                The Telos blockchain is a third-generation blockchain that utilizes a delegated proof of stake consensus algorithm where the different delegates (also known as Block Producers) are voted for by the token holders. \
                <br><br> \
                The information is displayed in real-time and is requested via an API endpoint from our server, that is synchronized to the Telos blockchain network. \
                <br><br> \
                All these charts are responsive, so changing the window size will automatically calculate the area of the canvas and in turn, the best position and size of the chart to ensure a pleasant user experience. \
                <br><br> \
                More information about the relative block producer is displayed in the form of a popup tooltip when moving the mouse over the bars. The information includes the name, the delegated votes and the rank of the block producer. \
                <br><br> \
                The colour of each radial bar is generated at random, so sometimes, some of the colours might be difficult to see against a white or black background, so the option to change the canvas background between black and white is also available.";
                
                var htmlP = select('#chartInfo');
                htmlP.html(this.chartInfo);
                
                var htmlH3 = select('#chartInfoHeading');
                htmlH3.html(this.chartHeading);
            }*/
            
            // Tooltip description of the icon
            this.descriptionLine1 = "A radial bar chart representation of"
            this.descriptionLine2 ="the voting data per block producer.";
            
            // Draw the radial bars.
            push();
            fill(this.backgroundColour);
            rect(this.x, this.y, this.w, this.h);

            angleMode(DEGREES);
            translate(this.w/2, this.h/2);

            strokeWeight(4);
            stroke(this.foregroundColour);
            noFill();
            arc(this.x, this.y, this.w*8/10, this.w*8/10, -90, 250);
            arc(this.x, this.y, this.w*6/10, this.w*6/10, -90, 220);
            arc(this.x, this.y, this.w*4/10, this.w*4/10, -90, 170);
            arc(this.x, this.y, this.w*2/10, this.w*2/10, -90, 120);

            noStroke();
            fill(this.foregroundColour);
            textW = textWidth(this.index);
            text(this.index, this.x+(this.w/2)-textW, this.y-(this.h/2)+textW);
            
            pop();
            
            if(!this.isSelected){
                this.hover();
            }  
        }
        
        // ##############################
        // White background colour
        // ##############################
        else if(this.index == 5)
        {
            // Set the background color as selected on default
            if(this.isSelected){
                this.backgroundColour = color('#88A2AA');
                this.foregroundColour = color('#100B00');
            }
            
            // Tooltip description of the icon
            this.descriptionLine1 = "Change background"
            this.descriptionLine2 ="colour to white.";
            
            // Draw the radial bars.
            push();
            
            fill(this.backgroundColour);
            rect(this.x, this.y, this.w, this.h);
            
            fill(250);
            rect(this.x + this.w * 0.5/10, this.y + this.w * 0.5/10, this.w * 9/10, this.h * 9/10);

            noStroke();
            fill(50);
            textW = textWidth(this.index);
            text(this.index, this.x+this.w-textW - this.w * 1/10, this.y+textW + this.w * 0.5/10);
            
            pop();
            
            if(!this.isSelected){
                this.hover();
            }  
        }
        
        // ##############################
        // Black background colour
        // ##############################
        else if(this.index == 6)
        {
            // Tooltip description of the icon
            this.descriptionLine1 = "Change background"
            this.descriptionLine2 ="colour to black.";
            
            // Draw the radial bars.
            push();
            
            
            fill(this.backgroundColour);
            rect(this.x, this.y, this.w, this.h);
            
            fill(50);
            rect(this.x + this.w * 0.5/10, this.y + this.w * 0.5/10, this.w * 9/10, this.h * 9/10);

            noStroke();
            fill(250);
            textW = textWidth(this.index);
            text(this.index, this.x+this.w-textW - this.w * 1/10, this.y+textW + this.w * 0.5/10);
            
            pop();
            
            if(!this.isSelected){
                this.hover();
            }  
        }
        
        
    };
    
    // ##############################
    // Mouse hover function
    // ##############################
    this.hover = function()
    {
        if(mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y + this.h)
        {
            // Change the background and foreground colour of the icons when mouse hover.
            this.backgroundColour = color('#88A2AA');
            this.foregroundColour = color('#100B00');
            
            // Tooltip with information regarding the icon.
            push();
                var textWi = textWidth(this.descriptionLine1);

                stroke(this.backgroundColour);
                fill(this.foregroundColour);
                rect(mouseX-textWi-this.m, mouseY-2*this.textS-this.m, textWi+2*this.m, 2*this.textS+2*this.m,5);
                noFill();

                textAlign(LEFT, TOP);
                noStroke();
                fill(this.backgroundColour);
                text(this.descriptionLine1, mouseX-textWi, mouseY-2*this.textS);
                text(this.descriptionLine2, mouseX-textWi, mouseY-1*this.textS);
            pop();
            
        }
        else
        {
            this.backgroundColour = color('#100B00');
            this.foregroundColour = color('#88A2AA');
        }

    };
    
    // ##############################
    // Mouse clicked function
    // ##############################
    this.mouseClicked = function(bubbles, histogramBars)
    {
        if(mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y + this.h){
            this.isSelected = true;
            //console.log("Icon Index: " + this.index);
            // Sets the icon color to show it is selected.
            if(this.isSelected){
                this.backgroundColour = color('#88A2AA');
                this.foregroundColour = color('#100B00');
            }else{
                this.backgroundColour = color('#100B00');
                this.foregroundColour = color('#88A2AA');
            }
            
            // Reset the step position of all the bubbles
            if(this.index == 1 || this.index == 2){
                for(var i = 0 ; i < bubbles.length; i++){
                    bubbles[i].step1 = false;
                    bubbles[i].step2 = false;
                }
            }
            
            // Reset the height of all the histogramBars
            if(this.index == 3){
                for(var j = 0; j < histogramBars.length; j++){
                    histogramBars[j].h = 0;
                }
            }
            
            // Set the background colour with icons 5 & 6
            if(this.index == 5){
                canvasBackgroundColour = color(250);
            }
            
            if(this.index == 6){
                canvasBackgroundColour = color(50);
            }
            
        }

    };
}