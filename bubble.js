// #########################################
// Bubble constructor function.
// #########################################
function Bubble(name, rank, votes, maxVotes, canvasWidth, canvasHeight, totalNum){
    
    // Function arguments
    this.name = name;
    this.rank = rank;
    this.votes = votes;
    this.maxVotes = maxVotes;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.totalBubbleNumbers = totalNum;
    this.visible = false;
    this.step1 = false;
    this.step2 = false;
    
    // Map size
    // Voting Data
    var bubSize = ((Math.sqrt((this.canvasWidth * this.canvasHeight)/this.totalBubbleNumbers))*1.3);
    //console.log(bubSize);
    this.size = map(this.votes, 0, this.maxVotes, 20, bubSize);
    this.dir = createVector(0,0);
    
    // Generate a random colour and position
    this.colour = color(random(0,255), random(0,255), random(0,255));
    this.pos = createVector(0, 0);
    
    // #################################################################
    // Draw function.
    // #################################################################
    this.draw = function()
    {
        noStroke();
        fill(this.colour);
        ellipse(this.pos.x, this.pos.y, this.size);
        
        fill(0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(this.name.substring(0,3), this.pos.x, this.pos.y);

    };
    
    // #################################################################
    // Collision detection - Scatter bubbles accross canvas
    // #################################################################
    this.updateDirection = function(_bubbles)
    {
        // set the visibility to true
        if(this.visible == false){
            this.visible = true;
        }
        
        //this.reset();
        this.dir = createVector(0,0);
        
        //Iterate though all the bubbles
        for(var i = 0; i < _bubbles.length; i++)
        {
            
            // Reset the bubble position back to the center.
            if(this.step1 == false){
                this.reset(_bubbles, i);
            }
            
            // Start moving the bubbles with the scatter method once they've reached the center.
            else
            {
                if(_bubbles[i].name != this.name){
                    var v = p5.Vector.sub(this.pos, _bubbles[i].pos);
                    var d = v.mag();

                    // Get the left and right edges of the canvas
                    var left = 0-(this.canvasWidth/2 - this.size/2);
                    var right = 0+(this.canvasWidth/2 - this.size/2);

                    // Fill the canvas horizontally.
                    if(this.pos.x > left && this.pos.x < right){
                        if(d < this.size/2 + _bubbles[i].size/2)
                        {
                            if(d == 0)
                            {
                                this.dir.add(p5.Vector.random2D());
                            }
                            else
                            {
                                this.dir.x += v.x;
                            }
                        }
                    }

                    // Get the top and bottom edges of the canvas
                    var top = 0-(this.canvasHeight/2 - this.size/2);
                    var bottom = 0+(this.canvasHeight/2 - this.size/2);

                    // Fill the canvas virtically.
                    if(this.pos.y > top && this.pos.y < bottom)
                    {
                        if(d < this.size/2 + _bubbles[i].size/2)
                        {
                            if(d == 0)
                            {
                                this.dir.add(p5.Vector.random2D());
                            }
                            else
                            {
                                this.dir.y += v.y;
                            }
                        }
                    }
                }
            }
            
        }
        this.dir.normalize();
        this.pos.add(this.dir);
    };
    

    // #################################################################
    // Order bubbles from big to small.
    // #################################################################
    this.orderBubbles = function(_bubbles)
    {
        // set the visibility to true
        if(this.visible == false){
            this.visible = true;
        }
        
        // Get the top and bottom edges of the canvas
        var top = 0-(this.canvasHeight/2 - this.size/2);
        var bottom = 0+(this.canvasHeight/2 - this.size/2);
        
        // Get the left and right edges of the canvas
        var right = this.canvasWidth/2;
        var left = -this.canvasWidth/2;
        /*var left = 0-(this.canvasWidth/2 - this.size/2);
        var right = 0+(this.canvasWidth/2 - this.size/2);*/
        
        var centerPos = createVector();
        var vDiff = p5.Vector.sub(this.pos, centerPos);
        var vDist = vDiff.mag();
        
        for(var i = 0; i < _bubbles.length; i++)
        {
            // Reset the bubble position back to the center.
            if(this.step1 == false){
                this.reset(_bubbles, i);
            };

            
            // Now we want to move the bubbles, from biggest to smallest, starting from the top left corner.
            // Once the current bubble is within a certain distance from the edge, move onto the next row.
            if(this.step1 == true && this.step2 == false){
                
                // Reset the direction vector to 0
                this.dir = createVector(0,0);

                // Set the velocity of the bubble movement.
                var bubbleVelocity = 100;

                // Set the start center position of the first bubble
                if(i == 0)
                {
                    var fistSize = _bubbles[i].size
                    var firstPos = createVector(0-this.canvasWidth/2 + fistSize/2, 0-this.canvasHeight/2 + fistSize/2);

                    var curPos = createVector(firstPos.x, firstPos.y);
                    var curSize = fistSize;

                    var colDistFromEdge = dist(curPos.x, curPos.y, right, curPos.y);

                    var goRight = true;
                }
                // From the second bubble onwards, calculate the bubble position based on the previous bubble.
                else if(i != 0 && curPos != undefined)
                {
                    var prePos = createVector(_bubbles[i-1].pos.x, _bubbles[i-1].pos.y);
                    // Information related to the previous bubble. Save before changing the current bubble information.
                    if(i < 1){
                        //var prePos = createVector(curPos.x, curPos.y);
                        bubbleVelocity = 100;
                    }
                    else
                    {
                        //prePos = createVector(_bubbles[i-1].pos.x, _bubbles[i-1].pos.y);
                        bubbleVelocity = 10;
                    }
                    var preSize = curSize;

                    // Set the Current bubble size.
                    curSize = _bubbles[i].size;

                    // Calculate the current bubble position while filling the canvas from left to right.
                    if(goRight == true){
                        colDistFromEdge = dist(prePos.x + curSize/2, prePos.y, right, prePos.y);
                        curPos.set(prePos.x + preSize/2 + curSize/2, prePos.y);
                    }
                    // Calculate the current bubble position while filling the canvas from right to left.
                    else
                    {
                        colDistFromEdge = dist(prePos.x - curSize/2, prePos.y, left, prePos.y);
                        curPos.set(prePos.x - preSize/2 - curSize/2, prePos.y);
                    }

                    // If the current bubble does not fit into the space between the edge and the previous bubble, move the y co-ordinate.
                    // Right Edge
                    if(colDistFromEdge < curSize && goRight)
                    {
                        curPos.set(right - curSize/2, prePos.y + preSize/2 + curSize/2 + 5);
                        goRight = false;
                    }
                    // Left Edge
                    else if(colDistFromEdge < curSize && !goRight)
                    {
                        curPos.set(left + curSize/2,  prePos.y + preSize/2 + curSize/2 + 5);
                        goRight = true;
                    }

                }

                if(curPos != undefined){
                    // Set the goal co-ordinates
                    centerPos.set(curPos.x, curPos.y);
                    // Get the difference between the two vector positions
                    vDiff = p5.Vector.sub(this.pos, centerPos);
                    // Save the vector length, or magnitude to this variable.
                    vDist = vDiff.mag();

                    if(_bubbles[i].name == this.name)
                    {
                        // Get the difference between the two vector positions
                        vDiff = p5.Vector.sub(this.pos, centerPos);
                        // Save the vector length, or magnitude to this variable.
                        vDist = vDiff.mag();
                        // Only move the bubble, if the vector magnitude is bigger than one
                        // Now we add the difference to the vector dir.
                        this.dir.add(vDiff);
                        // We take that difference and divide it by ten or 100, so that you have smoothe movements of the bubbles.
                        this.dir.div(bubbleVelocity);
                        //this.dir.normalize();
                        // Subtract the normalized difference from the actual bubble position.
                        this.pos.sub(this.dir);
                    };
                };
            };
        };
    };
    
    // #################################################################
    // Fade bubbles out.
    // #################################################################
    this.fadeOutBubbles = function()
    {
        // Set the center position to where you want the bubbles to move
        var centerPos = createVector(0, 0);
        // Get the difference between the two vector positions
        var vDiff = p5.Vector.sub(this.pos, centerPos);
        // Save the vector length, or magnitude to this variable.
        var vDist = vDiff.mag();
        
        // Only move the bubble, if the vector magnitude is bigger than one
        if(vDist > 1)
        {
            // Now we add the difference to the vector dir.
            this.dir.add(vDiff);
            // We take that difference and divide it by ten, so that you have smoothe movements of the bubbles.
            this.dir.div(10);
            //this.dir.normalize();
            // Subtract the normalized difference from the actual bubble position.
            this.pos.sub(this.dir);
        }
        else
        {
            this.visible = false;
        }
        
    }

    
    // ###############################################################################
    // Reset funciton to reset the bubble positions back to the center of the screen.
    // ###############################################################################
    this.reset = function(_bubbles, i)
    {
        this.dir = createVector(0,0);

                // Set the center position to where you want the bubbles to move
                var centerPos = createVector(0, 0);
                // Get the difference between the two vector positions
                var vDiff = p5.Vector.sub(this.pos, centerPos);
                // Save the vector length, or magnitude to this variable.
                var vDist = vDiff.mag();

                if(_bubbles[i].name == this.name)
                {
                    // Only move the bubble, if the vector magnitude is bigger than one
                    if(vDist > 1)
                    {
                        // Now we add the difference to the vector dir.
                        this.dir.add(vDiff);
                        // We take that difference and divide it by ten, so that you have smoothe movements of the bubbles.
                        this.dir.div(10);
                        //this.dir.normalize();
                        // Subtract the normalized difference from the actual bubble position.
                        this.pos.sub(this.dir);
                    }
                    // when the vector magnitude is smaller than 1, set the position to 0, 0.
                    else
                    {
                        // Reset the last element
                        // For some reaseon, the distance of the position of the last element in the array does not get smaller than 1, thus does not reset the step1 property back to true. This if statement solves the issue.
                        if(i == _bubbles.length-2){
                            _bubbles[_bubbles.length-1].pos.set(centerPos.x,centerPos.y);
                        }
                        
                        // Reset the bubblel postion once it's distance from the center is smaller than 1.
                        this.pos.set(centerPos.x,centerPos.y);
                        this.step1 = true;
                    }
                };
    }
    

    // #################################################################
    // Display information on mouse hover
    // #################################################################
    this.mouseHover = function()
    {
        var mouseV = createVector(mouseX-this.canvasWidth/2, mouseY-this.canvasHeight/2);
        var v = p5.Vector.sub(this.pos, mouseV);
        var mouseD = v.mag();
        
        textSize(16);
        var textW = textWidth(this.name)+20;
        
        if(mouseD < this.size/2){
            // Change the tooltip position based on the position of the mouse to prevent it from going off the canvas.
            var tooltipX = 0;
            var tooltipY = 0;
            
            // Horizontal position of the tooltip
            if(mouseX < this.canvasWidth/2){
                tooltipX = mouseV.x;
            }
            else
            {
                tooltipX = mouseV.x-textW;
            }
            
            // Vertical position of the tooltip
            if(mouseY > this.canvasHeight/2)
            {
                tooltipY = mouseV.y-55;
            }
            else
            {
                tooltipY = mouseV.y+15;
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
                text(this.votes, tooltipX+10, tooltipY+40);
                text("Rank: " + (this.rank+1), tooltipX+10, tooltipY+60);
            
            pop();
        };

    };
}
