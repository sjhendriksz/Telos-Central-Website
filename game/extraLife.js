//-----------------------------------------------------------------------------------
// Create Extra Life Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createExtraLife(platNum)
{
    extraObj = {
        x: 0,
        y: 0,
        platNum: platNum,
        size: 0.15,
        isReached: false,
        
        //Draw the character.
        draw: function()
        {
            if(gameLevels == 1 || gameLevels == 5 || gameLevels == 9){
                if(this.isReached == false){
                    this.x = platforms[this.platNum].x + platforms[this.platNum].width*3/4;
                    this.y = platforms[this.platNum].y;

                    push();
                            // Transformations
                            translate(this.x, this.y);

                            // Rotate every second acorn.
                            rotate(-25);

                            // Acorn Shadow
                            fill(0, 0, 0, 100);
                            beginShape();
                                vertex(0 +5 *this.size, 0 +3*this.size);
                                vertex(0 -15*this.size, 0 -52*this.size);
                                vertex(0 -15*this.size, 0 -87*this.size);
                                vertex(0 -5*this.size, 0 -97*this.size);
                                vertex(0 -17*this.size, 0 -123*this.size);
                                vertex(0 +5*this.size, 0 -147*this.size);
                                vertex(0 +70*this.size, 0 -145*this.size);
                                vertex(0 +78*this.size, 0 -157*this.size);
                                vertex(0 +105*this.size, 0 -157*this.size);
                                vertex(0 +93*this.size, 0 -132*this.size);
                                vertex(0 +130*this.size, 0 -77*this.size);
                                vertex(0 +125*this.size, 0 -47*this.size);
                                vertex(0 +95*this.size, 0 -42*this.size);
                                vertex(0 +93*this.size, 0 -29*this.size);
                                vertex(0 +55*this.size, 0 -7*this.size);
                                vertex(0 +5*this.size, 0 +3*this.size);
                            endShape();

                            // Acorn
                            fill(255,223,0);
                            beginShape();
                                vertex(0 +0*this.size, 0 +0*this.size);
                                vertex(0 -20*this.size, 0 -55*this.size);
                                vertex(0 -20*this.size, 0 -90*this.size);
                                vertex(0 -10*this.size, 0 -100*this.size);
                                vertex(0 -22*this.size, 0 -126*this.size);
                                vertex(0 -0*this.size, 0 -150*this.size);
                                vertex(0 +65*this.size, 0 -148*this.size);
                                vertex(0 +73*this.size, 0 -160*this.size);
                                vertex(0 +100*this.size, 0 -160*this.size);
                                vertex(0 +88*this.size, 0 -135*this.size);
                                vertex(0 +125*this.size, 0 -80*this.size);
                                vertex(0 +120*this.size, 0 -50*this.size);
                                vertex(0 +90*this.size, 0 -45*this.size);
                                vertex(0 +88*this.size, 0 -32*this.size);
                                vertex(0 +50*this.size, 0 -10*this.size);
                                vertex(0 +0*this.size, 0 +0*this.size);
                            endShape();

                            fill(212,175,55);
                            beginShape();
                                vertex(0 +53*this.size, 0 -95*this.size);
                                vertex(0 -10*this.size, 0 -100*this.size);
                                vertex(0 -22*this.size, 0 -126*this.size);
                                vertex(0 -0*this.size, 0 -150*this.size);
                                vertex(0 +65*this.size, 0 -148*this.size);
                                vertex(0 +88*this.size, 0 -135*this.size);
                                vertex(0 +125*this.size, 0 -80*this.size);
                                vertex(0 +120*this.size, 0 -50*this.size);
                                vertex(0 +90*this.size, 0 -45*this.size);
                                vertex(0 +53*this.size, 0 -95*this.size);
                            endShape();
                        pop();

                    //Check if reached.
                    var charDist = dist(gameChar_world_x, squirrelObj.y, this.x, this.y);
                    if(charDist <= 30 && this.isReached == false){
                        this.isReached = true;
                        lives += 1;
                        extraLifeSound.play();
                    }
                }
            }
        },
    
    }
    return extraObj;
}
//-----------------------------------------------------------------------------------
// End of the Create Extra Life Function - Factory Pattern
//-----------------------------------------------------------------------------------