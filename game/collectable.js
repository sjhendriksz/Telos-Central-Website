//-----------------------------------------------------------------------------------
// Create Collectable Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createCollectable(treesBool, platformsBool, treeAmt, platformAmt)
{
    collObj = {
        position: [],
        appleAtTree: treesBool,
        appleOnPlatform: platformsBool,
        everyHowManyTrees: treeAmt,
        everyHowManyPlatforms: platformAmt,
        
        //Setup function.
        setup: function(){
            if(this.appleAtTree == true){
                if(season != "winter"){  //Unfortunately, Apples do not grow on trees in the winter.
                    for(var i = 0; i < treesArray.length; i++){
                        var randomX;
                        var randomY;
                        var randomSize;
                        var tooHigh;
                        var angle;

                        randomX = int(random(treesArray[i].x - 20*treesArray[i].size*2, treesArray[i].x + 20*treesArray[i].size*2));
                        randomY = int(random((treesArray[i].y - 220*treesArray[i].size), (treesArray[i].y - 260*treesArray[i].size) - treesArray[i].size*2));
                        randomSize = random(0.1, 0.15);

                        if(i%3 == 0){
                            randomY = floorPos_y;
                        }
                        
                        if(i % this.everyHowManyTrees == 0){
                            this.position.push({x: randomX, y: randomY, size: randomSize, isFound: false, isOnPlatform: false});
                        }
                    }
                }
                else
                {
                    arrayLength = this.position.length;
                    for(var j = 0; i < arrayLength; j++){
                        this.position.pop();
                    }
                }
                
            }
            
            //Place collectable on the platfrom.
            if(this.appleOnPlatform == true){
                for(var i = 0; i < platforms.length; i++){

                        randomSize = random(0.1, 0.15);
                        
                        if(i % this.everyHowManyPlatforms == 0){
                            this.position.push({x: platforms[i].x + platforms[i].width/2, y: platforms[i].y, size: randomSize, isFound: false,  isOnPlatform: true, plaformNum: i});
                        }
                    }
            }
            
        },
        
        //Draw function.
        draw: function()
        {
            //Acorn colour
            var botomColour = color(171,92,61);
            var topColor = color(255,175,104);
            
            for(var i = 0; i < this.position.length; i++){
                
                //Move collectable along platform if on platform.
                if(this.position[i].isOnPlatform == true){
                    var num = this.position[i].plaformNum
                    this.position[i].y = platforms[num].y;
                    this.position[i].x = platforms[num].x + platforms[num].width/2;
                }
                
                //Check if the collectable is found by character.
                if(this.position[i].isFound == false){
                    
                    // Draw collectable items
                    noStroke();
                    
                    push();
                        // Transformations
                        translate(this.position[i].x, this.position[i].y);
                        
                        // Rotate every second acorn.
                        if(i%2 == 0)
                        {
                            rotate(20);
                        }
                        else if(i%2 == 1)
                        {
                            rotate(-70);
                        }
                        
                    
                        // Acorn Shadow
                        fill(0, 0, 0, 100);
                        beginShape();
                            vertex(0 +5 *this.position[i].size, 0 +3*this.position[i].size);
                            vertex(0 -15*this.position[i].size, 0 -52*this.position[i].size);
                            vertex(0 -15*this.position[i].size, 0 -87*this.position[i].size);
                            vertex(0 -5*this.position[i].size, 0 -97*this.position[i].size);
                            vertex(0 -17*this.position[i].size, 0 -123*this.position[i].size);
                            vertex(0 +5*this.position[i].size, 0 -147*this.position[i].size);
                            vertex(0 +70*this.position[i].size, 0 -145*this.position[i].size);
                            vertex(0 +78*this.position[i].size, 0 -157*this.position[i].size);
                            vertex(0 +105*this.position[i].size, 0 -157*this.position[i].size);
                            vertex(0 +93*this.position[i].size, 0 -132*this.position[i].size);
                            vertex(0 +130*this.position[i].size, 0 -77*this.position[i].size);
                            vertex(0 +125*this.position[i].size, 0 -47*this.position[i].size);
                            vertex(0 +95*this.position[i].size, 0 -42*this.position[i].size);
                            vertex(0 +93*this.position[i].size, 0 -29*this.position[i].size);
                            vertex(0 +55*this.position[i].size, 0 -7*this.position[i].size);
                            vertex(0 +5*this.position[i].size, 0 +3*this.position[i].size);
                        endShape();

                        // Acorn
                        fill(topColor);
                        beginShape();
                            vertex(0 +0*this.position[i].size, 0 +0*this.position[i].size);
                            vertex(0 -20*this.position[i].size, 0 -55*this.position[i].size);
                            vertex(0 -20*this.position[i].size, 0 -90*this.position[i].size);
                            vertex(0 -10*this.position[i].size, 0 -100*this.position[i].size);
                            vertex(0 -22*this.position[i].size, 0 -126*this.position[i].size);
                            vertex(0 -0*this.position[i].size, 0 -150*this.position[i].size);
                            vertex(0 +65*this.position[i].size, 0 -148*this.position[i].size);
                            vertex(0 +73*this.position[i].size, 0 -160*this.position[i].size);
                            vertex(0 +100*this.position[i].size, 0 -160*this.position[i].size);
                            vertex(0 +88*this.position[i].size, 0 -135*this.position[i].size);
                            vertex(0 +125*this.position[i].size, 0 -80*this.position[i].size);
                            vertex(0 +120*this.position[i].size, 0 -50*this.position[i].size);
                            vertex(0 +90*this.position[i].size, 0 -45*this.position[i].size);
                            vertex(0 +88*this.position[i].size, 0 -32*this.position[i].size);
                            vertex(0 +50*this.position[i].size, 0 -10*this.position[i].size);
                            vertex(0 +0*this.position[i].size, 0 +0*this.position[i].size);
                        endShape();

                        fill(botomColour);
                        beginShape();
                            vertex(0 +53*this.position[i].size, 0 -95*this.position[i].size);
                            vertex(0 -10*this.position[i].size, 0 -100*this.position[i].size);
                            vertex(0 -22*this.position[i].size, 0 -126*this.position[i].size);
                            vertex(0 -0*this.position[i].size, 0 -150*this.position[i].size);
                            vertex(0 +65*this.position[i].size, 0 -148*this.position[i].size);
                            vertex(0 +88*this.position[i].size, 0 -135*this.position[i].size);
                            vertex(0 +125*this.position[i].size, 0 -80*this.position[i].size);
                            vertex(0 +120*this.position[i].size, 0 -50*this.position[i].size);
                            vertex(0 +90*this.position[i].size, 0 -45*this.position[i].size);
                            vertex(0 +53*this.position[i].size, 0 -95*this.position[i].size);
                        endShape();
                    pop();
                }
            }
        },
        
        // Function to check character has collected an item.
        found: function()
        {
            for(var i = 0; i < this.position.length; i++){
                collectableDist = dist(this.position[i].x, this.position[i].y, gameChar_world_x, squirrelObj.y);
                if(int(collectableDist < 30) && (this.position[i].isFound == false))
                {
                    this.position[i].isFound = true;
                    appleSound.play();
                    apples += 1;
                    gameScore += 10;
                    if(jumpPower < 7){
                        jumpPower += 0.5;
                    }
                }
            }
        }
        
    }
    return collObj;
}
//-----------------------------------------------------------------------------------
// End of the Create Collectable Function - Factory Pattern
//-----------------------------------------------------------------------------------