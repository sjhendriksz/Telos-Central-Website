//-----------------------------------------------------------------------------------
// Display lives left
//-----------------------------------------------------------------------------------
function livesDisplay()
{
    var livesX = gameWidth * 1/4;
    var livesY = 90;
    var offset = 30;
    
    //Background
    fill(50,50,50,100);
    rect(livesX-20,livesY/2-37,10+(offset*lives),40,10);
    
    for(var i = 0; i < lives; i++)
    {
        sqrlLives(livesX + offset * i, livesY-10, 0.5);
    }
}

function sqrlLives(x,y,size){
    var tailColor = color(171,92,61); //Tail colour
    var bodyLightColour = color(255,175,104); //Body colour light
    var bodyDarkColour = color(221,122,83); //Body colour dark
    
    noStroke();
                // Left Ear Outer Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(x+3*size, y-115*size);
                    curveVertex(x-2*size, y-135*size);
                    curveVertex(x-6*size, y-135*size);
                    curveVertex(x-13*size, y-115*size);
                endShape(CLOSE);

                // Left Ear Outer
                fill(bodyDarkColour);
                beginShape();
                    curveVertex(x+1*size, y-115*size);
                    curveVertex(x-4*size, y-135*size);
                    curveVertex(x-8*size, y-135*size);
                    curveVertex(x-15*size, y-115*size);
                endShape(CLOSE);

                // Left Ear Inner
                fill(bodyLightColour);
                beginShape();
                    curveVertex(x-1*size, y-112*size);
                    curveVertex(x-5*size, y-130*size);
                    curveVertex(x-7*size, y-130*size);
                    curveVertex(x-13*size, y-112*size);
                endShape(CLOSE);

                // Right Ear Outer Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(x+20*size, y-112*size);
                    curveVertex(x+15*size, y-135*size);
                    curveVertex(x+11*size, y-135*size);
                    curveVertex(x+4*size, y-115*size);
                endShape(CLOSE);

                // Right Ear Outer
                fill(bodyDarkColour);
                beginShape();
                    curveVertex(x+18*size, y-115*size);
                    curveVertex(x+13*size, y-135*size);
                    curveVertex(x+9*size, y-135*size);
                    curveVertex(x+2*size, y-115*size);
                endShape(CLOSE);

                // Right Ear Inner
                fill(bodyLightColour);
                beginShape();
                    curveVertex(x+16*size, y-112*size);
                    curveVertex(x+12*size, y-130*size);
                    curveVertex(x+9*size, y-130*size);
                    curveVertex(x+4*size, y-112*size);
                endShape(CLOSE);

                // Chin Shaddow
                fill(0,0,0,50);
                arc(x+0*size, y-88*size, 47*size, 40*size, 5, 185);

                // Chin
                fill(bodyLightColour);
                arc(x+0*size, y-91*size, 50*size, 40*size, 5, 185);
                ellipse(x+2*size, y-90*size, 20*size, 15*size);

                // Head Shadow
                fill(0,0,0,50);
                beginShape();
                    curveVertex(x+3*size, y-120*size);
                    curveVertex(x+3*size, y-120*size);
                    curveVertex(x-14*size, y-115*size);
                    curveVertex(x-18*size, y-100*size);
                    curveVertex(x-23*size, y-92*size);
                    curveVertex(x-9*size, y-90*size);
                    curveVertex(x+4*size, y-95*size);
                    curveVertex(x+16*size, y-86*size);
                    curveVertex(x+27*size, y-88*size);
                    curveVertex(x+23*size, y-98*size);
                    curveVertex(x+21*size, y-114*size);
                endShape(CLOSE);

                // Head
                fill(bodyDarkColour);
                beginShape();
                    curveVertex(x+1*size, y-120*size);
                    curveVertex(x+1*size, y-120*size);
                    curveVertex(x-16*size, y-115*size);
                    curveVertex(x-20*size, y-100*size);
                    curveVertex(x-25*size, y-92*size);
                    curveVertex(x-11*size, y-90*size);
                    curveVertex(x+2*size, y-95*size);
                    curveVertex(x+14*size, y-86*size);
                    curveVertex(x+25*size, y-88*size);
                    curveVertex(x+21*size, y-98*size);
                    curveVertex(x+19*size, y-114*size);
                endShape(CLOSE);

                //Nose
                fill(0);
                ellipse(x+2*size, y-95*size,8*size,5*size);

                // Left Tooth
                noStroke();
                fill(250);
                quad(
                    x-2.5*size, y-82*size, // Bottom Left
                    x+1.5*size, y-82*size, // Bottom Right
                    x+1.5*size, y-90*size, // Top Right
                    x-2.5*size, y-85*size // Top Left
                );

                // Right Tooth
                quad(
                    x+2.5*size, y-82*size, // Bottom Left
                    x+6.5*size, y-82*size, // Bottom Right
                    x+6.5*size, y-85*size, // Top Right
                    x+2.5*size, y-90*size // Top Left
                );

                // Right side of mouth
                noFill();
                stroke(0);
                strokeWeight(1*size);
                arc(x+10*size, y-94*size, 16*size, 20*size, 90, 180);

                // Left side of mouth
                arc(x-6*size, y-95*size, 16*size, 20*size, 0, 90);

                //Eyes
                noStroke();
                fill(250);
                ellipse(x-6*size, y-101*size,7*size,7*size);
                ellipse(x+9*size, y-100*size,7*size,7*size);

                // Pupils
                fill(0);
                ellipse(x-6*size, y-103*size,4*size,4*size);
                ellipse(x+9*size, y-102*size,4*size,4*size);
}
//-----------------------------------------------------------------------------------
// End of Display lives left
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
// Create Magic Potion Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createMagicPotion(platNum)
{
    magicObj = {
        x: 0,
        y: 0,
        platNum: platNum,
        isReached: false,
        
        //Draw the flask.
        draw: function()
        {
            if(gameLevels == 1 || gameLevels == 5 || gameLevels == 9){
                if(this.isReached == false){
                    //Move collectable along platform if on platform.
                    this.y = platforms[this.platNum].y;
                    this.x = platforms[this.platNum].x + platforms[this.platNum].gameWidth*1/4;

                    stroke(0);
                    strokeWeight(1);
                    fill(0, 50, 255, 200);
                    //rect(this.x-5, this.y-30-15, 10, 15);
                    //ellipse(this.x, this.y-30-15, 12, 4);
                    ellipse(this.x, this.y-10, 20, 20);

                    //Check if reached.
                    var charDist = dist(gameChar_world_x, squirrelObj.y, this.x, this.y);
                    if(charDist <= 40 && this.isReached == false){
                        this.isReached = true;
                        magicPotionSound.play();
                        revitalizeJumpPower += 1;
                    }
                }
            }
        },
    }
    return magicObj;
}
//-----------------------------------------------------------------------------------
// End of the Create Magic Potion Function - Factory Pattern
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
// Display magic potions that you have left to use
//-----------------------------------------------------------------------------------
function potionsLeft()
{
    var potionsX = gameWidth * 3/4;;
    var potionsY = 28;
    var offset = 30;
    
    //Background
    stroke(0);
    strokeWeight(1);
    fill(50,50,50,100);
    rect(potionsX-20,potionsY/2-6,10+(offset*revitalizeJumpPower),40,10);
    
    for(var i = 0; i < revitalizeJumpPower; i++)
    {
        stroke(0);
        strokeWeight(1);
        fill(0, 50, 255, 200);
        //rect(potionsX-6 + offset*i, potionsY-15, 12, 7);
        //ellipse(potionsX + offset*i, potionsY-14, 14, 4);
        ellipse(potionsX + offset*i, potionsY, 24, 24);
    }
}
//-----------------------------------------------------------------------------------
// End of Display magic potions that you have left to use
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
// Display the JUMP POWER that you have left
//-----------------------------------------------------------------------------------
function jumpPowerFunc()
{
    var potionsX = gameWidth * 2/4;;
    var potionsY = 28;
    var offset = 30;
    
    //Background
    stroke(0);
    strokeWeight(1);
    
    // Container
    fill(50,50,50,100);
    rect(potionsX-(offset*4), potionsY/2-6,10+(offset*8), 40, 10);
    
    // Power slider
    fill(200,0,0,200);
    rect(potionsX-(offset*4),potionsY/2-6,10+(offset*jumpPower),40,10);
    
    // Text to indicate that potions can be drunk.
    if(jumpPower < 6)
    {
        fill(250);
        textAlign(LEFT, CENTER);
        text("Drink Potion",potionsX-(offset*4)+10,potionsY);
    }
    
}
//-----------------------------------------------------------------------------------
// End of Display the JUMP POWER that you have left
//-----------------------------------------------------------------------------------