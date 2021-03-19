// #################################################################
// Radial bar graph constructor function.
// #################################################################
function RadialBar(barRadius, barWidth, barSpacing, name, rank, vote, maxVotes, chartWidth, chartheight, colour)
{
    this.name = name;
    this.rank = rank;
    this.vote = vote;
    
    this.canvasWidth = chartWidth;
    this.canvasheight = chartheight;
    this.mousePos = createVector(mouseX,mouseY);
    
    this.zoom = 1;
    this.x = chartWidth/2;
    this.y = chartheight/2;
    this.barRadius = barRadius;
    this.barWidth = barWidth;
    this.barSpacing = barSpacing;
    this.targetSize = map(vote, 0, maxVotes, -90, 250);
    this.size = -89;
    
    // The speed is based on the size of each individual radial bar
    this.speed = random((this.targetSize+90)/350, (this.targetSize+90)/250);
    
    this.normalColour = colour;
    this.hoverColour = color(0);
    this.colorVar = colour;
    
    this.visible = false;
    this.mouseIsDragged = false;
    
    
    // #################################################################
    // Draw function.
    // #################################################################
    this.draw = function()
    {
        if(this.visible == true){
            push();
            
                angleMode(DEGREES);
            
                noFill();
                strokeWeight(this.barWidth);
                stroke(this.colorVar);
            
                translate(lastPosX, lastPosY);
                //translate(this.x, this.y);
                scale(this.zoom);
                translate(-lastPosX, -lastPosY);
                //translate(-this.x, -this.y);
                
                arc(this.x, this.y, this.barRadius, this.barRadius, -90, this.size);
                
                noStroke();
                fill(this.colorVar);
                textSize(6);
                textAlign(LEFT, CENTER);
                text(this.name, this.x-45, this.y-this.barRadius/2);
            
            pop();

            if(mouseX > 0 && mouseX < chartWidth && mouseY > 0 && mouseY < chartheight){
                cursor('grab');
            }else{
                cursor(ARROW);
            }
        }
        
    }
    
    
    // #################################################################
    // Incrementally increase the size to create a nice anamition
    // #################################################################
    this.increaseSize = function()
    {
        if(this.size < this.targetSize){
            this.size = this.size + this.speed;
        }
    }
    
    
    // #################################################################
    // Incrementally decrease the size to create a nice anamition
    // #################################################################
    this.decreaseSize = function()
    {
        if(this.size > -89+this.speed*4){
            this.size = this.size - this.speed*4;
        }
        else
        {
            this.visible = false;
        }
    }

    
    // #################################################################
    // Show the BP info when hovering the mouse over the radial bar
    // #################################################################
    this.mouseHover = function()
    {        
        var mouseDist = (dist(this.x, this.y, mouseX, mouseY));
        
        var left = (((this.barRadius*this.zoom)/2)+((this.barWidth*this.zoom)/2));
        var right = (((this.barRadius*this.zoom)/2)-((this.barWidth*this.zoom)/2));
        
        // Set and measure the textsize
        textSize(16);
        var textW = textWidth(this.name)+20;
        
        if(mouseDist < left && mouseDist > right){
            // Highlight the bar with a changing colour
            this.colorVar = this.hoverColour;
            
            // Change the tooltip position based on the position of the mouse to prevent it from going off the canvas.
            var tooltipX = 0;
            var tooltipY = 0;
            
            // Horizontal position of the tooltip
            if(mouseX > this.canvasWidth*2/3){
                tooltipX = mouseX-textW;
            }
            else
            {
                tooltipX = mouseX+10;
            }
            
            // Vertical position of the tooltip
            if(mouseY > this.canvasheight/2)
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
        }
        else
        {
            this.colorVar = this.normalColour;
        }
        
    }
    
    
    // #################################################################
    // Mouse wheel zoom function.
    // #################################################################
    this.mouseWheel = function()
    {

        if(this.name == this.name){
            if(event.delta == 100){
                this.zoom -= 0.1
            }else if(event.delta == -100){
                this.zoom += 0.1
            }
            this.zoom = constrain(this.zoom, 0.5, 4);

        }
        
    }
    
    var vectorMouse;
    var vectorPos;
    var vectorMag;
    var vectorDiff;
    var lastPosX = this.x;
    var lastPosY = this.y;
    
    // #################################################################
    // Mouse pressed function
    // #################################################################
    this.mousePressed = function(){
        vectorMouse = createVector(mouseX, mouseY);
        vectorPos = createVector(this.x, this.y);
        vectorDiff = p5.Vector.sub(vectorMouse, vectorPos);
    }
    
    // #################################################################
    // Mouse release function
    // #################################################################
    this.mouseReleased = function(){
        this.mouseIsDragged = false;
    }
    

    // #################################################################
    // Mouse dragged function, for use when zoomed in.
    // #################################################################
    this.mouseDragged = function(){
        // only run this code if mouse is on the canvas
        if(mouseX > 0 && mouseX < chartWidth && mouseY > 0 && mouseY < chartheight){
            
            vectorMouse = createVector(mouseX, mouseY);
            
            this.x = (vectorMouse.x - vectorDiff.x);
            this.y = (vectorMouse.y - vectorDiff.y);
            
            lastPosX = this.x;
            lastPosY = this.y;

            this.mouseIsDragged = true;

        }
    }
    
}