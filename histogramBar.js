// #################################################################
// Histogram constructor function
// #################################################################
function HistogramBar(x, y, w, barSpacing, name, rank, vote, maxVotes, chartWidth, chartHeight, colour)
{
    this.name = name;
    this.rank = rank;
    this.vote = vote;
    
    this.canvasWidth = chartWidth;
    this.canvasHeight = chartHeight;
    
    this.pos = createVector(0, 0);
    this.pos.set(x, y);
    this.w = w;
    this.targetHeight = round(map(this.vote, 0, maxVotes, 10, chartHeight*0.96), 0);
    this.h = 0;
    this.riseSpeed = random(this.targetHeight/300, this.targetHeight/200);
    this.spacing = barSpacing;
    
    this.colour = colour;
    this.visible = false;
    
    this.step1 = false;
    
    // #################################################################
    // Draw function
    // #################################################################
    this.draw = function()
    {
        if(this.visible == true){
            push();
                noStroke();
                fill(this.colour);
                rect(this.pos.x, this.pos.y, this.w, -this.h);
            pop();  
        }
    }
    
    // #################################################################
    // Animation - Increase height function
    // #################################################################
    this.increaseHeight = function()
    {
        // set the visibility to true
        if(this.visible == false){
            this.visible = true;
        }
        
        // start to increase the bar height
        if(this.h < this.targetHeight){
            this.h += 2*this.riseSpeed;
        }
    }
    
    // #################################################################
    // Animation - Decrease height function
    // #################################################################
    this.decreaseHeight = function()
    {
        if(this.h > 0){
            this.h -= 4*this.riseSpeed;
        }
        else
        {
            this.visible = false;
        }
    }
    
    // #################################################################
    // Draw mouse Hover
    // #################################################################
    this.mouseHover = function()
    {
        // Set and measure the textsize
        textSize(16);
        var textW = textWidth(this.name)+20;
        
        if(mouseX > this.pos.x && mouseX < this.pos.x + this.w + this.spacing && mouseY < this.pos.y && mouseY > this.pos.y-this.h){
            // Change the tooltip position based on the position of the mouse to prevent it from going off the canvas.
            var tooltipX = 0;
            var tooltipY = 0;
            
            // Horizontal position of the tooltip
            if(mouseX < this.canvasWidth/2){
                tooltipX = mouseX+10;
            }
            else
            {
                tooltipX = mouseX-textW;
            }
            
            // Vertical position of the tooltip
            if(mouseY > this.canvasHeight/2)
            {
                tooltipY = mouseY-60;
            }
            else
            {
                tooltipY = mouseY+15;
            }
            
            // Draw the Tooltip.
            push();
            
                // Tooltip
                stroke(0);
                strokeWeight(1);
                fill("#EEE");
                rect(tooltipX, tooltipY,textW, 60, 10);

                // Text
                noStroke();
                fill("#333");
                textAlign(LEFT, BOTTOM);
                text(this.name, tooltipX+10, tooltipY+20);
                text(this.vote, tooltipX+10, tooltipY+40);
                text("Rank: " + (this.rank+1), tooltipX+10, tooltipY+60);
            
            pop();
        };
    }
    
}