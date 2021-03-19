//-----------------------------------------------------------------------------------
// Squirrel Game Character
//-----------------------------------------------------------------------------------
function squirrel(){
    sqrlObj = {
        x: 330,
        y: 547,
        size: 0.5,
        
        // Character colours
        tailColor: color(171,92,61), //Tail colour
        bodyLightColour: color(255,175,104), //Body colour light
        bodyDarkColour: color(221,122,83), //Body colour dark
        
        // Angular variables
        bodyAng: 0,
        
        // Front Feet Angle
        ffbAng: 0,
        fffAng: 0,
        
        // Back Feet Angle
        bfbAng: 0,
        bffAng: 0,
        
        // Head & Tail Angle
        headAng: 0,
        tailAng: 0,
        
        // Character Direction
        sqrlDirection: +1,
        
        // Controls
        left: false,
        lastLeft: false,
        right: false,
        lastRight: true,
        
        // Squirrel positions
        jump: false,
        falling: false,
        plumeting: false,
        charOverCanyon: false,
        standing: true,
        resetJumpAngle: false,
        
        movement: true,
        movementSpeed: 0.5,
        
        //Center Point
        centerP: createVector(this.x, this.y),
        
        //Reset once a life is lost.
        reset: function()
        {
            this.x = width/2;
            this.y = floorPos_y;
            this.left = false;
            this.right = false;
            this.jump = false;
            this.falling = false;
            this.plumeting = false;
        },
        
        // Squirrel Control function
        controls: function()
        {
            // Disable controls when message is displayed.
            if(infoDisplayObj.displayWin == false){
                
                // Move Left - Logic to make the game character move or the background scroll.
                if(this.left && gameChar_world_x > wallObj.x1+wallObj.wallWidth+20 && !catchByBear && !dieByFall)
                {
                    if(!this.plumeting)
                    {
                        if(this.x > gameWidth * eyeSight)
                        {
                            this.x -= 3.5;
                            this.running(true, false);
                            this.direction(true, false);
                        }
                        else
                        {
                            // Positive for moving against the background
                            scrollPos += 3.5;
                            this.running(true, false);
                            this.direction(true, false);
                        }
                    }
                }
                
                // Move Right - Logic to make the game character move or the background scroll.
                if(this.right && gameChar_world_x < wallObj.x2-25 && !catchByBear && !dieByFall)
                {
                    if(this.plumeting == false)
                    {
                        if(this.x < gameWidth * (1-eyeSight))
                        {
                            this.x  += 3.5;
                            this.running(false, true);
                            this.direction(false, true);
                        }
                        else
                        {
                            // Pegative for moving against the background
                            scrollPos -= 3.5;
                            this.running(false, true);
                            this.direction(false, true);
                        }
                    }
                }
                
                // Scroll when squirrel is on a moving platform.
                if(gallery.visuals[2].checkIfOnPlatform() != null){
                    var pNum = gallery.visuals[2].checkIfOnPlatform();
                    if(!this.left && !this.right && this.y == platforms[pNum].y){
                        // Right edge
                        if(this.x > (gameWidth * (1-eyeSight))+1)
                        {
                            scrollPos -= platforms[pNum].moveSpeed;
                            this.x -= platforms[pNum].moveSpeed;
                        }
                        else if(this.x < (gameWidth * eyeSight)-1)
                        {
                            scrollPos += platforms[pNum].moveSpeed;
                            this.x += platforms[pNum].moveSpeed;
                        }
                    }
                }
                
                // Logic to make the game character Jump.
                if(this.jump && !catchByBear)
                {
                    if(jumpResistance > 0)
                    {
                        jumpResistance -= 0.15;
                        this.y -= jumpResistance;
                    }
                    else
                    {
                        jumpResistance = 0; 
                        this.jump = false;
                    }
                    this.falling = false;
                }

                // Logic to make the game character fall.
                if(this.plumeting == false  && catchByBear == false && this.jump == false)
                {
                    if (this.y < floorPos_y)
                    {
                        if(gallery.visuals[2].checkIfOnPlatform() == null){
                            jumpResistance += 0.15;
                            this.y += jumpResistance;
                            this.falling = true;
                        }
                        else if(this.y < platforms[gallery.visuals[2].checkIfOnPlatform()].y-5)
                        {
                            jumpResistance += 0.15;
                            this.y += jumpResistance;
                            this.falling = true;
                        }
                        else
                        {
                            this.falling = false;
                            jumpResistance = 0;
                        }
                    }
                    else
                    {   //console.log((jumpPower*15)/10);
                        if(jumpResistance > 10)
                        {
                            dieByFall = true;
                            this.falling = true;
                        }
                        else
                        {
                            this.falling = false;
                            jumpResistance = 0;
                        }
                    }

                    // Adjust the Squirrel X & Y pos if on platform
                    if(gallery.visuals[2].checkIfOnPlatform()!=null && this.falling == false)
                    {
                        var platformNum = gallery.visuals[2].checkIfOnPlatform();
                        this.y = platforms[platformNum].y
                        if(platforms[platformNum].moveLeft && platforms[platformNum].moveHorizontal != 0)
                        {
                            this.x -= platforms[platformNum].moveSpeed;
                        }
                        else if(!platforms[platformNum].moveLeft && platforms[platformNum].moveHorizontal != 0)
                        {
                            this.x += platforms[platformNum].moveSpeed;
                        }

                    } 
                }
                // Logic to make the game character fall.
                else if(this.jump == false)
                {
                    this.falling = true;
                }

                // Squirrel is falling down a canyon.
                if(this.plumeting == true)
                {
                    if(this.y < gameHeight-20){
                        jumpResistance += 0.15;
                        this.y += jumpResistance;
                    }
                }

                // Condition to trigger Standing still
                if((!this.jump && !this.falling) && ((this.left && this.right) || (!this.left && !this.right)))
                {
                    this.standing = true;
                }else
                {
                    this.standing = false;
                }

                // Standing still
                if(this.standing)
                {
                    this.tailAng = 0;
                    this.headAng = 0;
                    this.ffbAng = 0;
                    this.fffAng = 0;
                    this.bfbAng = 0;
                    this.bffAng = 0;
                    this.bodyAng = 0;
                }

                var bodyJumpVar = 40 * (jumpResistance/jumpPower);

                // Jumping to the Right Position
                if(this.jump)
                {
                    if(this.lastRight && !this.standing &&  bodyJumpVar < 40){
                        // Up Jump Pos
                        this.bodyAng = -1 * bodyJumpVar;
                        this.bfbAng = 70.0;
                        this.bffAng = 72.0;
                        this.ffbAng = -50;
                        this.fffAng = -52;
                        this.tailAng = -60;
                    }
                    else if(this.lastLeft && !this.standing &&  bodyJumpVar < 40)
                    {
                        // Up Jump Pos
                        this.bodyAng = bodyJumpVar;
                        this.bfbAng = -70.0;
                        this.bffAng = -72.0;
                        this.ffbAng = +50;
                        this.fffAng = +52;
                        this.tailAng = +60;
                    }
                }

                // Falling Position
                if(this.falling)
                {
                    if(this.lastRight && !this.standing &&  bodyJumpVar < 40){
                        // Down Jump Pos
                        this.bodyAng = bodyJumpVar;
                        this.bfbAng = +60.0;
                        this.bffAng = +62.0;
                        this.ffbAng = -40;
                        this.fffAng = -42;
                        this.tailAng = -60;
                    }
                    else if(this.lastLeft && !this.standing &&  bodyJumpVar < 40)
                    {
                        // Down Jump Pos
                        this.bodyAng = -1 * bodyJumpVar;
                        this.bfbAng = -60.0;
                        this.bffAng = -62.0;
                        this.ffbAng = +40;
                        this.fffAng = +42;
                        this.tailAng = +60;
                    }
                }

                // Reset the angles after jumping
                //if(bodyJumpVar < 0)
                if(this.jump || this.falling)
                {
                    this.resetJumpAngle = true;
                }
                if(this.resetJumpAngle == true && bodyJumpVar == 0)
                {
                    this.tailAng = 0;
                    this.headAng = 0;
                    this.ffbAng = 0;
                    this.fffAng = 0;
                    this.bfbAng = 0;
                    this.bffAng = 0;
                    this.bodyAng = 0;
                    this.resetJumpAngle = false;
                }
                
            }
            
        },
        
        // Direction function
        direction: function(left, right)
        {
            if(left){
                // Change the squirrel direction - Only execute once
                if(this.left == true && this.sqrlDirection != -1)
                {
                    this.sqrlDirection = -1;

                    this.bodyAng = this.bodyAng*-1;
                    this.bfbAng = this.bfbAng*-1;
                    this.ffbAng = this.ffbAng*-1;
                    this.fffAng = this.fffAng*-1;
                    this.bffAng = this.bffAng*-1;
                    this.headAng = this.headAng*-1;
                }
                
            }
            else if(right){
                // Change the squirrel direction - Only execute once
                if(this.right == true && this.sqrlDirection != +1)
                {
                    this.sqrlDirection = +1;

                    this.bodyAng = this.bodyAng*-1;
                    this.bfbAng = this.bfbAng*-1;
                    this.ffbAng = this.ffbAng*-1;
                    this.fffAng = this.fffAng*-1;
                    this.bffAng = this.bffAng*-1;
                    this.headAng = this.headAng*-1;
                }
                
            }
        },
        
        // Running movements function
        running: function(left, right)
        {
            // Running.
            if(!this.jump && !this.falling)
            {
                // Running Left
                if(left){
                    if(this.bodyAng < -25){
                        this.movement = false;
                    }
                    else if(this.bodyAng > 2){
                        this.movement = true;
                    }
                }
                // Running Right
                else if(right){
                    if(this.bodyAng > 25){
                        this.movement = true;
                    }
                    else if(this.bodyAng < -2){
                        this.movement = false;
                    }
                }
                
                // Smooth Running movement.
                for(var i = 0; i < 2; i++){
                    if(this.movement == true){
                        this.tailAng += 2.0;
                        this.headAng += 1.0;
                        this.ffbAng += 3.5;
                        this.fffAng += 3.0;
                        this.bfbAng -= 3.0;
                        this.bffAng -= 4.0;
                        this.bodyAng -= 1.0;
                    }
                    else if(this.movement == false)
                    {
                        this.tailAng -= 2.0;
                        this.headAng -= 1.0;
                        this.ffbAng -= 3.5;
                        this.fffAng -= 3.0;
                        this.bfbAng += 3.0;
                        this.bffAng += 4.0;
                        this.bodyAng += 1.0;
                    }
                }
                
            }
        },
        
        draw: function()
        {
            if(this.plumeting || (this.falling && jumpResistance > 10) || catchByBear == true){
                
                // Falling Squirrel
                // Tail Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(this.x+23*this.size, this.y-18*this.size);
                    curveVertex(this.x+33*this.size, this.y-18*this.size);
                    curveVertex(this.x+53*this.size, this.y-23*this.size);
                    curveVertex(this.x+58*this.size, this.y-48*this.size);
                    curveVertex(this.x+48*this.size, this.y-78*this.size);
                    curveVertex(this.x+53*this.size, this.y-123*this.size);
                    curveVertex(this.x+23*this.size, this.y-98*this.size);
                    curveVertex(this.x+08*this.size, this.y-68*this.size);
                    curveVertex(this.x+13*this.size, this.y-38*this.size);
                endShape(CLOSE);

                // Tail.
                fill(this.tailColor);
                beginShape();
                    curveVertex(this.x+20*this.size, this.y-20*this.size);
                    curveVertex(this.x+30*this.size, this.y-20*this.size);
                    curveVertex(this.x+50*this.size, this.y-25*this.size);
                    curveVertex(this.x+55*this.size, this.y-50*this.size);
                    curveVertex(this.x+45*this.size, this.y-80*this.size);
                    curveVertex(this.x+50*this.size, this.y-125*this.size);
                    curveVertex(this.x+20*this.size, this.y-100*this.size);
                    curveVertex(this.x+05*this.size, this.y-70*this.size);
                    curveVertex(this.x+10*this.size, this.y-40*this.size);
                endShape(CLOSE);

                //Foot Left Shadow
                fill(0,0,0,50);
                rect(this.x-42*this.size, this.y-12*this.size, 40*this.size, 10*this.size, 30*this.size,0*this.size,30*this.size,0*this.size);

                // Foot Left
                fill(this.bodyDarkColour);
                rect(this.x-40*this.size, this.y-10*this.size, 40*this.size, 10*this.size, 30*this.size,0*this.size,30*this.size,0*this.size);
                
                // Body back part Left Shadow
                fill(0,0,0,50);
                ellipse(this.x-12*this.size, this.y-30*this.size,50*this.size,50*this.size);

                // Body back part Left
                fill(this.bodyDarkColour);
                ellipse(this.x-10*this.size, this.y-30*this.size,50*this.size,50*this.size);

                // Foot Right Shadow
                fill(0,0,0,50);
                rect(this.x+7*this.size, this.y-12*this.size, 40*this.size, 10*this.size, 0*this.size,30*this.size,0*this.size,30*this.size);

                // Foot Right
                fill(this.bodyDarkColour);
                rect(this.x+5*this.size, this.y-10*this.size, 40*this.size, 10*this.size, 0*this.size,30*this.size,0*this.size,30*this.size);

                // Body, back part Right Shadow
                fill(0,0,0,50);
                ellipse(this.x+18*this.size, this.y-30*this.size,50*this.size,50*this.size);

                // Body back part Right
                fill(this.bodyDarkColour);
                ellipse(this.x+15*this.size, this.y-30*this.size,50*this.size,50*this.size);

                // Arm, Left Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(this.x-2*this.size, this.y-67*this.size);

                    curveVertex(this.x-12*this.size, this.y-61*this.size);
                    curveVertex(this.x-30*this.size, this.y-61*this.size);
                    curveVertex(this.x-38*this.size, this.y-66*this.size);
                    curveVertex(this.x-32*this.size, this.y-71*this.size);
                    curveVertex(this.x-30*this.size, this.y-67*this.size);
                    curveVertex(this.x-12*this.size, this.y-73*this.size);

                    curveVertex(this.x+3*this.size, this.y-91*this.size);
                endShape();

                // Arm, Left
                fill(this.bodyDarkColour);
                beginShape();
                    curveVertex(this.x+0*this.size, this.y-65*this.size);

                    curveVertex(this.x-10*this.size, this.y-59*this.size);
                    curveVertex(this.x-28*this.size, this.y-59*this.size);
                    curveVertex(this.x-36*this.size, this.y-64*this.size);
                    curveVertex(this.x-30*this.size, this.y-69*this.size);
                    curveVertex(this.x-28*this.size, this.y-65*this.size);
                    curveVertex(this.x-10*this.size, this.y-71*this.size);

                    curveVertex(this.x+5*this.size, this.y-89*this.size);
                endShape();

                // Arm, Right Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(this.x+27*this.size, this.y-67*this.size);

                    curveVertex(this.x+17*this.size, this.y-61*this.size);
                    curveVertex(this.x+35*this.size, this.y-61*this.size);
                    curveVertex(this.x+43*this.size, this.y-66*this.size);
                    curveVertex(this.x+37*this.size, this.y-71*this.size);
                    curveVertex(this.x+35*this.size, this.y-67*this.size);
                    curveVertex(this.x+17*this.size, this.y-73*this.size);

                    curveVertex(this.x+32*this.size, this.y-91*this.size);
                endShape();

                // Arm, Right
                fill(this.bodyDarkColour);
                beginShape();
                    curveVertex(this.x+25*this.size, this.y-65*this.size);

                    curveVertex(this.x+15*this.size, this.y-59*this.size);
                    curveVertex(this.x+33*this.size, this.y-59*this.size);
                    curveVertex(this.x+41*this.size, this.y-64*this.size);
                    curveVertex(this.x+35*this.size, this.y-69*this.size);
                    curveVertex(this.x+33*this.size, this.y-65*this.size);
                    curveVertex(this.x+15*this.size, this.y-71*this.size);
                    curveVertex(this.x+30*this.size, this.y-89*this.size);
                endShape();

               // Body, middle part
                fill(this.bodyLightColour);
                beginShape();
                    curveVertex(this.x+20*this.size, this.y-20*this.size);

                    curveVertex(this.x-15*this.size, this.y-20*this.size);
                    curveVertex(this.x-10*this.size, this.y-80*this.size);
                    curveVertex(this.x+13*this.size, this.y-80*this.size);
                    curveVertex(this.x+20*this.size, this.y-20*this.size);
                    curveVertex(this.x-15*this.size, this.y-20*this.size);

                    curveVertex(this.x+10*this.size, this.y-80*this.size);
                endShape();

                // Left Ear Outer Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(this.x+3*this.size, this.y-115*this.size);
                    curveVertex(this.x-2*this.size, this.y-135*this.size);
                    curveVertex(this.x-6*this.size, this.y-135*this.size);
                    curveVertex(this.x-13*this.size, this.y-115*this.size);
                endShape(CLOSE);

                // Left Ear Outer
                fill(this.bodyDarkColour);
                beginShape();
                    curveVertex(this.x+1*this.size, this.y-115*this.size);
                    curveVertex(this.x-4*this.size, this.y-135*this.size);
                    curveVertex(this.x-8*this.size, this.y-135*this.size);
                    curveVertex(this.x-15*this.size, this.y-115*this.size);
                endShape(CLOSE);

                // Left Ear Inner
                fill(this.bodyLightColour);
                beginShape();
                    curveVertex(this.x-1*this.size, this.y-112*this.size);
                    curveVertex(this.x-5*this.size, this.y-130*this.size);
                    curveVertex(this.x-7*this.size, this.y-130*this.size);
                    curveVertex(this.x-13*this.size, this.y-112*this.size);
                endShape(CLOSE);

                // Right Ear Outer Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(this.x+20*this.size, this.y-112*this.size);
                    curveVertex(this.x+15*this.size, this.y-135*this.size);
                    curveVertex(this.x+11*this.size, this.y-135*this.size);
                    curveVertex(this.x+4*this.size, this.y-115*this.size);
                endShape(CLOSE);

                // Right Ear Outer
                fill(this.bodyDarkColour);
                beginShape();
                    curveVertex(this.x+18*this.size, this.y-115*this.size);
                    curveVertex(this.x+13*this.size, this.y-135*this.size);
                    curveVertex(this.x+9*this.size, this.y-135*this.size);
                    curveVertex(this.x+2*this.size, this.y-115*this.size);
                endShape(CLOSE);

                // Right Ear Inner
                fill(this.bodyLightColour);
                beginShape();
                    curveVertex(this.x+16*this.size, this.y-112*this.size);
                    curveVertex(this.x+12*this.size, this.y-130*this.size);
                    curveVertex(this.x+9*this.size, this.y-130*this.size);
                    curveVertex(this.x+4*this.size, this.y-112*this.size);
                endShape(CLOSE);

                // Chin Shaddow
                fill(0,0,0,50);
                arc(this.x+0*this.size, this.y-88*this.size, 47*this.size, 40*this.size, 5, 185);

                // Chin
                fill(this.bodyLightColour);
                arc(this.x+0*this.size, this.y-91*this.size, 50*this.size, 40*this.size, 5, 185);
                ellipse(this.x+2*this.size, this.y-90*this.size, 20*this.size, 15*this.size);

                // Head Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(this.x+3*this.size, this.y-120*this.size);
                    curveVertex(this.x+3*this.size, this.y-120*this.size);
                    curveVertex(this.x-14*this.size, this.y-115*this.size);
                    curveVertex(this.x-18*this.size, this.y-100*this.size);
                    curveVertex(this.x-23*this.size, this.y-92*this.size);
                    curveVertex(this.x-9*this.size, this.y-90*this.size);
                    curveVertex(this.x+4*this.size, this.y-95*this.size);
                    curveVertex(this.x+16*this.size, this.y-86*this.size);
                    curveVertex(this.x+27*this.size, this.y-88*this.size);
                    curveVertex(this.x+23*this.size, this.y-98*this.size);
                    curveVertex(this.x+21*this.size, this.y-114*this.size);
                endShape(CLOSE);

                // Head
                fill(this.bodyDarkColour);
                beginShape();
                    curveVertex(this.x+1*this.size, this.y-120*this.size);
                    curveVertex(this.x+1*this.size, this.y-120*this.size);
                    curveVertex(this.x-16*this.size, this.y-115*this.size);
                    curveVertex(this.x-20*this.size, this.y-100*this.size);
                    curveVertex(this.x-25*this.size, this.y-92*this.size);
                    curveVertex(this.x-11*this.size, this.y-90*this.size);
                    curveVertex(this.x+2*this.size, this.y-95*this.size);
                    curveVertex(this.x+14*this.size, this.y-86*this.size);
                    curveVertex(this.x+25*this.size, this.y-88*this.size);
                    curveVertex(this.x+21*this.size, this.y-98*this.size);
                    curveVertex(this.x+19*this.size, this.y-114*this.size);
                endShape(CLOSE);

                //Nose
                fill(0);
                ellipse(this.x+2*this.size, this.y-95*this.size,8*this.size,5*this.size);

                // Left Tooth
                noStroke();
                fill(250);
                quad(
                    this.x-2.5*this.size, this.y-82*this.size, // Bottom Left
                    this.x+1.5*this.size, this.y-82*this.size, // Bottom Right
                    this.x+1.5*this.size, this.y-90*this.size, // Top Right
                    this.x-2.5*this.size, this.y-85*this.size // Top Left
                );

                // Right Tooth
                quad(
                    this.x+2.5*this.size, this.y-82*this.size, // Bottom Left
                    this.x+6.5*this.size, this.y-82*this.size, // Bottom Right
                    this.x+6.5*this.size, this.y-85*this.size, // Top Right
                    this.x+2.5*this.size, this.y-90*this.size // Top Left
                );

                // Right side of mouth
                noFill();
                stroke(0);
                strokeWeight(1*this.size);
                arc(this.x+10*this.size, this.y-94*this.size, 16*this.size, 20*this.size, 90, 180);

                // Left side of mouth
                arc(this.x-6*this.size, this.y-95*this.size, 16*this.size, 20*this.size, 0, 90);

                //Eyes
                noStroke();
                fill(250);
                ellipse(this.x-6*this.size, this.y-101*this.size,7*this.size,7*this.size);
                ellipse(this.x+9*this.size, this.y-100*this.size,7*this.size,7*this.size);

                // Pupils
                fill(0);
                ellipse(this.x-6*this.size, this.y-103*this.size,4*this.size,4*this.size);
                ellipse(this.x+9*this.size, this.y-102*this.size,4*this.size,4*this.size);

            }
            else
            {
                
            // Angular movement of the body -----------------------------------------
            this.centerP.x = this.x-10*this.sqrlDirection;
            this.centerP.y = this.y-25*this.size;
            
            push();
                // Move the center point
                translate(this.centerP.x, this.centerP.y);

                // Rotate the hind legs
                rotate(this.bodyAng);

            
                // Angular movement of the Tail **********************************
                this.centerP.x = -35*this.sqrlDirection*this.size;
                this.centerP.y = -25*this.size;

                push();
                    // Move the center point
                    translate(this.centerP.x, this.centerP.y);

                    // Rotate the Tail
                    rotate(this.tailAng);

                    // Tail Shadow.
                    fill(0,0,0,50);
                    beginShape();
                        curveVertex(-5*this.sqrlDirection*this.size, 0*this.size);
                        curveVertex(-15*this.sqrlDirection*this.size, 0*this.size);
                        curveVertex(-35*this.sqrlDirection*this.size, -5*this.size);
                        curveVertex(-40*this.sqrlDirection*this.size, -30*this.size);
                        curveVertex(-25*this.sqrlDirection*this.size, -60*this.size);
                        curveVertex(-55*this.sqrlDirection*this.size, -85*this.size);
                        curveVertex(-5*this.sqrlDirection*this.size, -80*this.size);
                        curveVertex(10*this.sqrlDirection*this.size, -50*this.size);
                        curveVertex(5*this.sqrlDirection*this.size, -20*this.size);
                    endShape(CLOSE);

                    // Tail.
                    fill(this.tailColor);
                    beginShape();
                        curveVertex(0*this.sqrlDirection*this.size, 0*this.size);
                        curveVertex(-10*this.sqrlDirection*this.size, 0*this.size);
                        curveVertex(-30*this.sqrlDirection*this.size, -5*this.size);
                        curveVertex(-35*this.sqrlDirection*this.size, -30*this.size);
                        curveVertex(-20*this.sqrlDirection*this.size, -60*this.size);
                        curveVertex(-50*this.sqrlDirection*this.size, -85*this.size);
                        curveVertex(0*this.sqrlDirection*this.size, -80*this.size);
                        curveVertex(15*this.sqrlDirection*this.size, -50*this.size);
                        curveVertex(10*this.sqrlDirection*this.size, -20*this.size);
                    endShape(CLOSE);
                pop();

            
                // Angular movement of the hind foot, back part *********************
                this.centerP.x = -35*this.sqrlDirection*this.size;
                this.centerP.y = -5*this.size;

                push();
                    // Move the center point
                    translate(this.centerP.x, this.centerP.y);

                    // Rotate the hind legs
                    rotate(this.bfbAng);

                    // Logic to make the feet invert correctly
                    if(this.sqrlDirection>0){
                        // Foot
                        fill(this.tailColor);
                        rect(0*this.sqrlDirection*this.size, 20*this.size, 40*this.size, 10*this.size, 0,30*this.size,0,30*this.size);
                    }else{
                        // Foot
                        fill(this.tailColor);
                        rect((0*this.sqrlDirection-40)*this.size, 20*this.size, 40*this.size, 10*this.size, 30*this.size,0,30*this.size,0);
                    }

                    // Hind Legs, back part
                    ellipse(10*this.sqrlDirection*this.size, 0*this.size, 40*this.size, 50*this.size);
                pop();

            
                 // Angular movement for the Front Legs *******************************
                this.centerP.x = 15*this.sqrlDirection*this.size;
                this.centerP.y = -7*this.size;

                push();
                    // Move the center point
                    translate(this.centerP.x, this.centerP.y);

                    // Rotate the front legs
                    rotate(this.ffbAng);

                    // Front Legs, back part
                    fill(this.tailColor);
                    ellipse((10*this.sqrlDirection)*this.size, 0*this.size, 25*this.size, 30*this.size);
                    beginShape();
                        vertex(15*this.sqrlDirection*this.size, 0*this.size);
                        vertex(20*this.sqrlDirection*this.size, 24*this.size);
                        vertex(25*this.sqrlDirection*this.size, 26*this.size);
                        vertex(26*this.sqrlDirection*this.size, 32*this.size);
                        vertex(15*this.sqrlDirection*this.size, 32*this.size);
                        vertex(5*this.sqrlDirection*this.size, 7*this.size);
                     endShape();
                pop();
            
            
                // Angular movement arount the Body
                    // Body, Belly
                    fill(this.bodyLightColour);
                    beginShape();
                        curveVertex(-25*this.sqrlDirection*this.size, -15*this.size);
                        curveVertex(-25*this.sqrlDirection*this.size, 15*this.size);
                        curveVertex(25*this.sqrlDirection*this.size, 10*this.size);
                        curveVertex(25*this.sqrlDirection*this.size, -15*this.size);
                        curveVertex(-25*this.sqrlDirection*this.size, -15*this.size);
                        curveVertex(-25*this.sqrlDirection*this.size, 15*this.size);
                        curveVertex(25*this.sqrlDirection*this.size, -15*this.size);
                    endShape();

                    // Body, Front part
                    fill(this.bodyDarkColour);
                    beginShape();
                        curveVertex(-35*this.sqrlDirection*this.size, -35*this.size);
                        curveVertex(-35*this.sqrlDirection*this.size, +5*this.size);
                        curveVertex(+35*this.sqrlDirection*this.size, 0*this.size);
                        curveVertex(+35*this.sqrlDirection*this.size, -35*this.size);
                        curveVertex(+10*this.sqrlDirection*this.size, -28*this.size);
                        curveVertex(-35*this.sqrlDirection*this.size, -30*this.size);
                        curveVertex(-35*this.sqrlDirection*this.size, +5*this.size);
                        curveVertex(+35*this.sqrlDirection*this.size, -35*this.size);
                    endShape();

            
                // Angular movement for the front legs ****************************************
                this.centerP.x = 15*this.sqrlDirection*this.size;
                this.centerP.y = -7*this.size;

                push();
                    // Move the center point
                    translate(this.centerP.x, this.centerP.y);

                    // Rotate the front legs
                    rotate(this.fffAng);

                    // Front Legs, front part Shadow Left
                    fill(0,0,0,50);
                    ellipse(-2*this.sqrlDirection*this.size, -1*this.size, 25*this.size, 30*this.size);
                    ellipse(+2*this.sqrlDirection*this.size, 0*this.size, 25*this.size, 30*this.size);
                    beginShape();
                        vertex(+2*this.sqrlDirection*this.size, 0*this.size);
                        vertex(+8*this.sqrlDirection*this.size, +24*this.size);
                        vertex(+13*this.sqrlDirection*this.size, +26*this.size);
                        vertex(+14*this.sqrlDirection*this.size, 32*this.size);
                        vertex(+3*this.sqrlDirection*this.size, 32*this.size);
                        vertex(-7*this.sqrlDirection*this.size, +7*this.size);
                     endShape();

                    // Front Legs, front part
                    fill(this.bodyDarkColour);
                    ellipse(+0*this.sqrlDirection*this.size, 0*this.size, 25*this.size, 30*this.size);
                    beginShape();
                        vertex(+5*this.sqrlDirection*this.size, 0*this.size);
                        vertex(+10*this.sqrlDirection*this.size, +24*this.size);
                        vertex(+15*this.sqrlDirection*this.size, +26*this.size);
                        vertex(+16*this.sqrlDirection*this.size, 32*this.size);
                        vertex(+5*this.sqrlDirection*this.size, 32*this.size);
                        vertex(-5*this.sqrlDirection*this.size, +7*this.size);
                     endShape();
                pop();

            
                // Angular movement of the hind foot ********************************************
                this.centerP.x = -35*this.sqrlDirection*this.size;
                this.centerP.y = -5*this.size;

                push();
                    // Move the center point
                    translate(this.centerP.x, this.centerP.y);

                    // Rotate the hind legs
                    rotate(this.bffAng);

                    // Logic to make the feet invert correctly
                    if(this.sqrlDirection>0){
                        // Foot Shadow
                        fill(0,0,0,50);
                        rect((-8*this.sqrlDirection)*this.size, 18*this.size, 40*this.size, 10*this.size, 0*this.size, 30*this.size, 0*this.size, 30*this.size);

                        // Foot
                        fill(this.bodyDarkColour);
                        rect((-10*this.sqrlDirection)*this.size, 20*this.size, 40*this.size, 10*this.size, 0*this.size, 30*this.size, 0*this.size, 30*this.size);
                    }else{
                        // Foot Shadow
                        fill(0,0,0,50);
                        rect((-8*this.sqrlDirection-40)*this.size, 18*this.size, 40*this.size, 10*this.size, 30*this.size, 0*this.size, 30*this.size, 0*this.size);

                        // Foot
                        fill(this.bodyDarkColour);
                        rect((-10*this.sqrlDirection-40)*this.size, 20*this.size, 40*this.size, 10*this.size, 30*this.size, 0*this.size, 30*this.size, 0*this.size);
                    }

                    // Hind Legs, front part Shadow
                    fill(0,0,0,50);
                    ellipse((-3*this.sqrlDirection)*this.size, 0*this.size,40*this.size,50*this.size);
                    ellipse((+2*this.sqrlDirection)*this.size, 0*this.size,40*this.size,50*this.size);

                    // Hind Legs, front part
                    fill(this.bodyDarkColour);
                    ellipse(0*this.sqrlDirection*this.size, 0*this.size,40*this.size,50*this.size);
                pop();

            
                // Angular movement of the head ****************************************************
                    this.centerP.x = +25*this.sqrlDirection*this.size;
                    this.centerP.y = -25*this.size;

                    push();
                        // Move the center point
                        translate(this.centerP.x, this.centerP.y);

                        // Rotate the hind legs
                        rotate(this.headAng);

                        // Left Ear Outer
                        fill(this.tailColor);
                        beginShape();
                            curveVertex(+8*this.sqrlDirection*this.size, -30*this.size);
                            curveVertex(+13*this.sqrlDirection*this.size, -50*this.size);
                            curveVertex(+17*this.sqrlDirection*this.size, -50*this.size);
                            curveVertex(+24*this.sqrlDirection*this.size, -30*this.size);
                        endShape(CLOSE);

                        // Head Shadow
                        fill(0,0,0,50);
                        beginShape();
                            curveVertex(-3*this.sqrlDirection*this.size, -31*this.size);
                            curveVertex(-3*this.sqrlDirection*this.size, +2*this.size);
                            curveVertex(+37*this.sqrlDirection*this.size, +2*this.size);
                            curveVertex(+37*this.sqrlDirection*this.size, -18*this.size);
                            curveVertex(-3*this.sqrlDirection*this.size, -31*this.size);
                            curveVertex(-3*this.sqrlDirection*this.size, +2*this.size);
                            curveVertex(+37*this.sqrlDirection*this.size, -18*this.size);
                        endShape();

                        // Head
                        fill(this.bodyDarkColour);
                        beginShape();
                            curveVertex(0*this.sqrlDirection*this.size, -53*this.size);
                            curveVertex(0*this.sqrlDirection*this.size, 0*this.size);
                            curveVertex(+40*this.sqrlDirection*this.size, 0*this.size);
                            curveVertex(+40*this.sqrlDirection*this.size, -20*this.size);
                            curveVertex(0*this.sqrlDirection*this.size, -33*this.size);
                            curveVertex(0*this.sqrlDirection*this.size, 0*this.size);
                            curveVertex(+40*this.sqrlDirection*this.size, -20*this.size);
                        endShape();

                        // Right Ear Outer Shadow
                        fill(0,0,0,50);
                        beginShape();
                            curveVertex(-1*this.sqrlDirection*this.size, -28*this.size);
                            curveVertex(+4*this.sqrlDirection*this.size, -51*this.size);
                            curveVertex(+8*this.sqrlDirection*this.size, -51*this.size);
                            curveVertex(+15*this.sqrlDirection*this.size, -28*this.size);
                        endShape(CLOSE);

                        // Right Ear Outer
                        fill(this.bodyDarkColour);
                        beginShape();
                            curveVertex(+1*this.sqrlDirection*this.size, -30*this.size);
                            curveVertex(+6*this.sqrlDirection*this.size, -50*this.size);
                            curveVertex(+10*this.sqrlDirection*this.size, -50*this.size);
                            curveVertex(+17*this.sqrlDirection*this.size, -30*this.size);
                        endShape(CLOSE);

                        // Right Ear Inner
                        fill(this.bodyLightColour);
                        beginShape();a
                            curveVertex(+4*this.sqrlDirection*this.size, -32*this.size);
                            curveVertex(+7.5*this.sqrlDirection*this.size, -48*this.size);
                            curveVertex(+8.5*this.sqrlDirection*this.size, -48*this.size);
                            curveVertex(+15*this.sqrlDirection*this.size, -32*this.size);
                        endShape(CLOSE);

                        //Nose
                        fill(0);
                        ellipse(+43*this.sqrlDirection*this.size, -15*this.size,8*this.size,5*this.size);

                        //Eyes
                        noStroke();
                        fill(250);
                        ellipse(+20*this.sqrlDirection*this.size, -20*this.size,7*this.size,7*this.size);
            
                        // Pupils
                        fill(0);
                        ellipse(+22*this.sqrlDirection*this.size, -20*this.size,4*this.size,4*this.size);
            
                        // Blink eyes every now and again
                        if(timer % 8 == 0){
                            fill(this.tailColor);
                            ellipse(+20*this.sqrlDirection*this.size, -20*this.size, 7*this.size, 7*this.size);
                        }
            
                    pop();
            
                pop();
                }
            }
        }
    return sqrlObj;
}
//-----------------------------------------------------------------------------------
// End of the Squirrel Game Character
//-----------------------------------------------------------------------------------