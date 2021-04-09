//Screen Size
var canvas;

//Local storage
var localStorage;

//Intro Page
var introPageObj;

//Game Objects:
var squirrelObj;
var infoObj;
var infoDisplayObj;

// Telos Colours
var backgroundCol;
var orangeText;
var darkText;
var platformColor;

// Buttons
var buttonContinue;
var levelButtons;
var startButtonObj;
var fullScreenObj;
var linkButton1;
var linkButton2;
var answerCorrect = false;

// Game astectics
var cloudSet1;
var cloudSet2;
var cloudSet3;
var sunObj;
var wallObj;
var mountainObj;
var treesObj;
var treesArray = [];
var canyonObj;
var seasonalObj;
var collectableObj;
var flagPoleObj;
var magicPotionObj;
var extraLifeObj;
var platforms;
var bears;
var snakes;
var soundSwitch;
var soundEffects;

//Game variables
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var gameLevels;
var apples;
var gameScore;
var worldSize;
var catchByBear;
var dieByFall;

//Game Timer
var timer;

// Global Variables
var lives;
var playerDied;
var collectableDist;
var season;
var eyeSight = 0.33;
var revitalizeJumpPower;

//Jump vectors
var jumpResistance;
var jumpPower;

//Sounds
var level1Loaded = false;
var level2Loaded = false;
var level3Loaded = false;
var level4Loaded = false;
var level5Loaded = false;
var level6Loaded = false;
var level7Loaded = false;
var level8Loaded = false;
var level9Loaded = false;
var level10Loaded = false;
var level11Loaded = false;
var level12Loaded = false;
    
//Scale game
var gameScale;
var gameHeight;
var gameWidth;
var mousePosX;
var mousePosY;

function Game(){
    
    // Name for the visualisation to appear in the menu bar.
    // this.name = '<i class="gg-games"></i>Matsuo';
    this.name = '<i class="fas fa-gamepad fa-lg navicons"></i>Matsuo';

    // Each visualisation must have a unique ID with no special
    this.id = 'Game';

    // Title to display above the plot.
    this.title = 'Game';
    

    //--------------------------------------------------------------------------------
    //Preload Function
    //--------------------------------------------------------------------------------
    this.preload = function(){
        soundFormats('mp3');

        // Sounds effects.
        jumpSound = loadSound('game/sound/jumpSound.mp3');
        jumpSound.setVolume(1);

        fallSound = loadSound('game/sound/fallSound.mp3');
        fallSound.setVolume(0.3);

        appleSound = loadSound('game/sound/appleSound.mp3');
        appleSound.setVolume(1);

        gameWonSound = loadSound('game/sound/gameWonSound.mp3');
        gameWonSound.setVolume(0.4);

        bearSound = loadSound('game/sound/bearSound.mp3');
        bearSound.setVolume(0.8);

        dieSound1 = loadSound('game/sound/dieSound1.mp3');
        dieSound1.setVolume(0.8);

        dieSound2 = loadSound('game/sound/dieSound2.mp3');
        dieSound2.setVolume(0.8);

        extraLifeSound = loadSound('game/sound/extraLifeSound.mp3');
        extraLifeSound.setVolume(0.4);

        magicPotionSound = loadSound('game/sound/magicPotionSound.mp3');
        magicPotionSound.setVolume(0.8);

        potionDrinkSound = loadSound('game/sound/potionDrink.mp3');
        potionDrinkSound.setVolume(0.8);
        
        falseSound = loadSound('game/sound/wrong.mp3');
        falseSound.setVolume(0.6);
        
        // Level background music
        soundLevel1 = loadSound('game/sound/level1.mp3', function(){level1Loaded = true});
        soundLevel1.setVolume(0.8);
        soundLevel2 = loadSound('game/sound/level2.mp3', function(){level2Loaded = true});
        soundLevel2.setVolume(0.8);
        soundLevel3 = loadSound('game/sound/level3.mp3', function(){level3Loaded = true});
        soundLevel3.setVolume(0.8);
        soundLevel4 = loadSound('game/sound/level4.mp3', function(){level4Loaded = true});
        soundLevel4.setVolume(0.8);
        soundLevel5 = loadSound('game/sound/level5.mp3', function(){level5Loaded = true});
        soundLevel5.setVolume(0.8);
        soundLevel6 = loadSound('game/sound/level6.mp3', function(){level6Loaded = true});
        soundLevel6.setVolume(0.8);
        soundLevel7 = loadSound('game/sound/level7.mp3', function(){level7Loaded = true});
        soundLevel7.setVolume(0.8);
        soundLevel8 = loadSound('game/sound/level8.mp3', function(){level8Loaded = true});
        soundLevel8.setVolume(0.8);
        soundLevel9 = loadSound('game/sound/level9.mp3', function(){level9Loaded = true});
        soundLevel9.setVolume(0.8);
        soundLevel10 = loadSound('game/sound/level10.mp3', function(){level10Loaded = true});
        soundLevel10.setVolume(0.8);
        soundLevel11 = loadSound('game/sound/level11.mp3', function(){level11Loaded = true});
        soundLevel11.setVolume(0.8);
        soundLevel12 = loadSound('game/sound/level12.mp3', function(){level12Loaded = true});
        soundLevel12.setVolume(0.8);
    }
    //--------------------------------------------------------------------------------
    //End of Preload Function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Sound Effects Object
    //--------------------------------------------------------------------------------
    soundEffects = {
        gameWonSoundSet: false,
        playSounds: function()
        {
            //Squirrel Die Sound.
            if(squirrelObj.plumeting == true && playerDied == false && fallSound.isPlaying() == false){
                fallSound.play();
            }

            //Level completed Sound.
            if(answerCorrect == true)
            {  
                if(soundLevel1.isPlaying()){
                    soundLevel1.stop();
                }else if(soundLevel2.isPlaying()){
                    soundLevel2.stop();
                }else if(soundLevel3.isPlaying()){
                    soundLevel3.stop();
                }else if(soundLevel4.isPlaying()){
                    soundLevel4.stop();
                }else if(soundLevel5.isPlaying()){
                    soundLevel5.stop();
                }else if(soundLevel6.isPlaying()){
                    soundLevel6.stop();
                }else if(soundLevel7.isPlaying()){
                    soundLevel7.stop();
                }else if(soundLevel8.isPlaying()){
                    soundLevel8.stop();
                }else if(soundLevel9.isPlaying()){
                    soundLevel9.stop();
                }else if(soundLevel10.isPlaying()){
                    soundLevel10.stop();
                }else if(soundLevel11.isPlaying()){
                    soundLevel11.stop();
                }else if(soundLevel12.isPlaying()){
                    soundLevel12.stop();
                }
                
                if(this.gameWonSoundSet==false)
                {
                    gameWonSound.play();
                    this.gameWonSoundSet=true;
                }
            }
            
            //Switch on game background Music.
            timer = int(frameCount/15);
            if (timer%6 == 2){
                if(lives != 0 && soundSwitch.on && soundEffects.gameWonSoundSet==false){
                    if(!soundLevel1.isPlaying() && gameLevels == 1 && level1Loaded){
                        soundLevel1.play();
                    }else if(!soundLevel2.isPlaying() && gameLevels == 2 && level2Loaded){
                        soundLevel2.play();
                    }else if(!soundLevel3.isPlaying() && gameLevels == 3 && level3Loaded){
                        soundLevel3.play();
                    }else if(!soundLevel4.isPlaying() && gameLevels == 4 && level4Loaded){
                        soundLevel4.play();
                    }else if(!soundLevel5.isPlaying() && gameLevels == 5 && level5Loaded){
                        soundLevel5.play();
                    }else if(!soundLevel6.isPlaying() && gameLevels == 6 && level6Loaded){
                        soundLevel6.play();
                    }else if(!soundLevel7.isPlaying() && gameLevels == 7 && level7Loaded){
                        soundLevel7.play();
                    }else if(!soundLevel8.isPlaying() && gameLevels == 8 && level8Loaded){
                        soundLevel8.play();
                    }else if(!soundLevel9.isPlaying() && gameLevels == 9 && level9Loaded){
                        soundLevel9.play();
                    }else if(!soundLevel10.isPlaying() && gameLevels == 10 && level10Loaded){
                        soundLevel10.play();
                    }else if(!soundLevel11.isPlaying() && gameLevels == 11 && level11Loaded){
                        soundLevel11.play();
                    }else if(!soundLevel12.isPlaying() && gameLevels == 12 && level12Loaded){
                        soundLevel12.play();
                    }
                    
                }
            }
            
            // Pause sounds when toggeling the sound switch
            if(!soundSwitch.on){
                if(soundLevel1.isPlaying()){
                    soundLevel1.pause();
                }else if(soundLevel2.isPlaying()){
                    soundLevel2.pause();
                }else if(soundLevel3.isPlaying()){
                    soundLevel3.pause();
                }else if(soundLevel4.isPlaying()){
                    soundLevel4.pause();
                }else if(soundLevel5.isPlaying()){
                    soundLevel5.pause();
                }else if(soundLevel6.isPlaying()){
                    soundLevel6.pause();
                }else if(soundLevel7.isPlaying()){
                    soundLevel7.pause();
                }else if(soundLevel8.isPlaying()){
                    soundLevel8.pause();
                }else if(soundLevel9.isPlaying()){
                    soundLevel9.pause();
                }else if(soundLevel10.isPlaying()){
                    soundLevel10.pause();
                }else if(soundLevel11.isPlaying()){
                    soundLevel11.pause();
                }else if(soundLevel12.isPlaying()){
                    soundLevel12.pause();
                }
            }
            
            // Stop music when Game Over.
            if(lives <= 0){
                if(soundLevel1.isPlaying() && gameLevels == 1){
                    soundLevel1.stop();
                }else if(soundLevel2.isPlaying() && gameLevels == 2){
                    soundLevel2.stop();
                }else if(soundLevel3.isPlaying() && gameLevels == 3){
                    soundLevel3.stop();
                }else if(soundLevel4.isPlaying() && gameLevels == 4){
                    soundLevel4.stop();
                }else if(soundLevel5.isPlaying() && gameLevels == 5){
                    soundLevel5.stop();
                }else if(soundLevel6.isPlaying() && gameLevels == 6){
                    soundLevel6.stop();
                }else if(soundLevel7.isPlaying() && gameLevels == 7){
                    soundLevel7.stop();
                }else if(soundLevel8.isPlaying() && gameLevels == 8){
                    soundLevel8.stop();
                }else if(soundLevel9.isPlaying() && gameLevels == 9){
                    soundLevel9.stop();
                }else if(soundLevel10.isPlaying() && gameLevels == 10){
                    soundLevel10.stop();
                }else if(soundLevel11.isPlaying() && gameLevels == 11){
                    soundLevel11.stop();
                }else if(soundLevel12.isPlaying() && gameLevels == 12){
                    soundLevel12.stop();
                }
            }
            
        },
        
        stopSounds: function(){
            if(soundLevel1.isPlaying()){
                soundLevel1.stop();
            }else if(soundLevel2.isPlaying()){
                soundLevel2.stop();
            }else if(soundLevel3.isPlaying()){
                soundLevel3.stop();
            }else if(soundLevel4.isPlaying()){
                soundLevel4.stop();
            }else if(soundLevel5.isPlaying()){
                soundLevel5.stop();
            }else if(soundLevel6.isPlaying()){
                soundLevel6.stop();
            }else if(soundLevel7.isPlaying()){
                soundLevel7.stop();
            }else if(soundLevel8.isPlaying()){
                soundLevel8.stop();
            }else if(soundLevel9.isPlaying()){
                soundLevel9.stop();
            }else if(soundLevel10.isPlaying()){
                soundLevel10.stop();
            }else if(soundLevel11.isPlaying()){
                soundLevel11.stop();
            }else if(soundLevel12.isPlaying()){
                soundLevel12.stop();
            }
        }
    }
    //--------------------------------------------------------------------------------
    //End of Sound Effects Function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Setup Function
    //--------------------------------------------------------------------------------
    this.setup = function(){
        
        // Stop the music in case someone clicks on the Matsuo button
        soundEffects.stopSounds();
        
        // Disable normal scrolling from the spacebar
        window.addEventListener('keydown', function(e) {
            if(e.keyCode == 32 && e.target == document.body) {
                e.preventDefault();
            }
        });
 
        // Scale game normal size
        var maxArea = sqrt(1280*960)*0.001;
        var scaleNumb = sqrt(width*height)*0.001;
        gameScale = map(scaleNumb, 0, maxArea, 0, 1);
        //gameScale = 0.8;
        gameHeight = height/gameScale;
        gameWidth = width/gameScale;
        
        //Initialize the IntroPage
        introPageObj = new CreateIntroPage();
        introPageObj.setup();

        //Initialize the sound switch
        soundSwitch = new CreateSoundSwitch();

        gameLevels = 0;
        floorPos_y = gameHeight*3/4;
        squirrelObj = squirrel();

        // Telos Colours
        backgroundCol = color(246, 241, 225);
        orangeText = color(239, 104, 47);
        darkText = color(98,90,81);
        platformColor = color(3,107,8);

        // Use Degress and not Radians
        angleMode(DEGREES);

        // Set the textsize for everything as 22
        textSize(22);

    }
    //--------------------------------------------------------------------------------
    //End of Setup Function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Destroy Function
    //--------------------------------------------------------------------------------
    this.destroy = function(){
    
    }
    //--------------------------------------------------------------------------------
    //End of Destroy Function
    //--------------------------------------------------------------------------------
    
    //--------------------------------------------------------------------------------
    //Resize Function
    //--------------------------------------------------------------------------------
    this.windowResized = function(){

    }
    //--------------------------------------------------------------------------------
    //End of the Resize Function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Draw Function
    //--------------------------------------------------------------------------------
    this.draw = function(){
        
        var drawObjDist = 1.2;

        //console.log("X: "+ mouseX + "    Y: "+mouseY);
        if(introPageObj.isDisplayed == true)
        {  
            // Show the home page with intro
            introPageObj.draw();
            // Only show the fullscreen button on the intro page.
            //fullScreenObj.isVisible = true;
        }
        else
        {
            //scale the game
            scale(gameScale);
            mousePosX = mouseX / gameScale;
            mousePosY = mouseY / gameScale;

            noStroke();

            //Start the new drawing state.
            push();
                translate(scrollPos, 0);

                //Sky, floor and background
                seasonalObj.draw();

            //End the new drawing state.
            pop();

            // draw the sun behind everything
            sunObj.draw();

            //Run the sound effects function
            soundEffects.playSounds();

            //Translate: Mountains and clouds should move slower than the trees.
            push();
                translate(scrollPos*0.2, 0);
                mountainObj.draw();
                cloudSet1.moveClouds();
                cloudSet2.moveClouds();
                cloudSet3.moveClouds();
            pop();

            //Start the new drawing state.
            push();
                translate(scrollPos, 0);

                // Draw trees.
                for(var i = 0; i < treesArray.length; i++){
                    var treeDist = dist(gameChar_world_x, floorPos_y, treesArray[i].x, floorPos_y);
                    if(treeDist < width*drawObjDist){
                        treesArray[i].draw();
                    }
                }

                // Draw canyons & call function to check if squirrelObj is over canyon.
                for(var i = 0; i < canyonObj.canyon.length; i++)
                {
                    var canyDist = dist(gameChar_world_x, floorPos_y, canyonObj.canyon[i].x, floorPos_y);
                    if(canyDist < width*drawObjDist){
                        // Draw canyons
                        canyonObj.drawCanyon(canyonObj.canyon[i]);
                        this.checkCanyon(canyonObj.canyon[i]);
                        
                        //Draw the snakes in the snakepits
                        snakes[i].draw();
                    }
                }

                // Draw collectable items & check if found.
                collectableObj.draw();
                collectableObj.found();

                //Draw the flagpole
                flagPoleObj.draw();
                this.checkFlagpole();

                //End of world Wall
                wallObj.draw(); //Wall Width & Height

                //Draw the platforms
                for(var i = 0; i < platforms.length; i++)
                {
                    var platDist = dist(gameChar_world_x, floorPos_y, platforms[i].x, floorPos_y);
                    if(platDist < width*drawObjDist){
                        platforms[i].draw();
                    }
                }

                //Draw the bears / enemies
                for(var i = 0; i < bears.length; i++)
                {
                    bears[i].draw();
                }

                //Draw the magic potion graphics
                magicPotionObj.draw();

                //Draw the extra life graphics
                extraLifeObj.draw();

                //Draw the info Sign
                infoObj.draw();

            //End the new drawing state.
            pop();

            // Draw game character & ajust parameters.
            squirrelObj.draw();
            squirrelObj.controls();

            //Check character lives
            this.checkPlayerDie();

            // Draw the score counter & the number of lives & background Music Switch.
            fill(0);
            textSize(25);
            textAlign(LEFT);
            text("Level: " + (gameLevels), 20, 25);
            text("Acorns: " + apples + " out of " + collectableObj.position.length,20,50);
            text("Score: " + gameScore,20,75);
            if(jumpPower > 6){
                fill(0,0,0);
            }
            else
            {
                fill(250,0,0);
            }

            //Display how much jump Power you have left.
            jumpPowerFunc();

            //Display the lives left.
            livesDisplay();

            //Display potions left.
            potionsLeft();

            //Draw the soundswitch
            soundSwitch.draw();

            // Show message on screen when player loses a life or Game over
            this.message();
            
            // Update real position of gameChar for collision detection.
            gameChar_world_x = squirrelObj.x - scrollPos;

            if(infoDisplayObj.displayWin){
                infoDisplayObj.draw();
            }else{
                cursor(ARROW);
            }
            
        }


    }
    //--------------------------------------------------------------------------------
    // End of Draw Function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    // Message control function
    //--------------------------------------------------------------------------------
    this.message = function(){
        //Game Over or Level Completed
        push();
        textSize(30);
        fill(255,255,0);
        stroke(0);
        strokeWeight(2);
        textAlign(CENTER);
        //textStyle(BOLD);

        // Game Over message
        if(lives <= 0)
        {
            text("Game Over. Press Enter to restart the game.", width/2/gameScale, height/3/gameScale);
            return
        }

        // Level completed message
        if(answerCorrect == true)
        {
            var realLevel = gameLevels - 1;
            text("Level " + realLevel + " complete. Press Enter to move onto the next level.", width/2/gameScale, height/3/gameScale);
            return
        }

        // Squirrel Died message
        if(playerDied == true)
        {
            if(catchByBear == true)
            {
                text("You've been caught by a Bear. Press Enter to try again.", width/2/gameScale, height/3/gameScale);
            }
            else if(dieByFall == true)
            {
                text("You have strong legs, but not that strong. Don't fall from too high!", width/2/gameScale, height/3/gameScale);
            }
            else
            {
                text("You've fallen down a Snake pit. Press Enter to try again.", width/2/gameScale, height/3/gameScale);
            }
        }
        pop();
    }
    //--------------------------------------------------------------------------------
    // End of Message control function
    //--------------------------------------------------------------------------------
    
    //--------------------------------------------------------------------------------
    // Key Pressed control functions
    //--------------------------------------------------------------------------------
    this.keyPressed = function(){
        // if statements to control the animation of the character when
        // console.log(keyCode);
        if(key == "I"){
            infoDisplayObj.displayWin = true;
        }

        // Disable all controls once the level is completed.
        if(answerCorrect == false){
            // Left control
            if((keyCode == 37 || key == "A") && (!squirrelObj.plumeting && !catchByBear && !dieByFall))
            {
                if(infoDisplayObj.displayWin == false){
                    squirrelObj.left = true;
                    squirrelObj.lastLeft = true;
                    squirrelObj.right = false;
                    squirrelObj.lastRight = false;
                }
            }

            // Right control
            else if((keyCode == 39 || key == "D") && (!squirrelObj.plumeting && !catchByBear && !dieByFall))
            {
                if(infoDisplayObj.displayWin == false){
                    squirrelObj.right = true;
                    squirrelObj.lastRight = true;
                    squirrelObj.left = false;
                    squirrelObj.lastLeft = false;
                }
            }

            // Jump control
            if(keyCode == 32 && !squirrelObj.falling && !squirrelObj.plumeting && !catchByBear && !dieByFall)
            {
                if(infoDisplayObj.displayWin == false){
                    //Jump if on floor
                    if(squirrelObj.y >= floorPos_y)
                    {
                        jumpResistance = jumpPower;
                        if(jumpPower > 3){
                            jumpPower -= 0.25;
                        }
                        squirrelObj.jump = true;
                        jumpSound.play();
                    }

                    //Jump if on platform
                    if(this.checkIfOnPlatform()!=null){
                        if(squirrelObj.y >= platforms[this.checkIfOnPlatform()].y) //error sometimes
                        {
                            jumpResistance = jumpPower;
                            if(jumpPower > 3){
                                jumpPower -= 0.25;
                            }
                            squirrelObj.jump = true;
                            jumpSound.play();
                        }
                    }                 
                }
            }
            
            
            
        }

        //Reset game by pressing Enter or clicking the Start button
        if(keyCode == 13 && playerDied == true || keyCode == 13 && lives <= 0 || keyCode == 13 && gameLevels == 0 || keyCode == 13 && answerCorrect == true)
        {
            if(lives <= 0 || gameLevels == 12 && flagPoleObj.isReached){
                startButtonObj.isClicked = false;
                introPageObj.isDisplayed = true;
            }
            else
            {
                //Reset, next Level, etc.
                this.startGame();
            }
        }
        
        // Reset the game if level 12 is reached
        if(keyCode == 13 && gameLevels == 12){
            startButtonObj.isClicked = false;
            introPageObj.isDisplayed = true;
        }

        //Revitalize the characters Jump Power by pressing R
        if(keyCode == 82 && jumpPower < 6)
        {
            if(revitalizeJumpPower != 0){
                revitalizeJumpPower -= 1;
                potionDrinkSound.play();
                jumpPower = 8;
            }
        }
    }
    //--------------------------------------------------------------------------------
    //End of Key Pressed control functions
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Key Released control functions
    //--------------------------------------------------------------------------------
    this.keyReleased = function(){
        // if statements to control the animation of the character when
        // Left control
        if (keyCode == 37 || key == "A")
        {
            squirrelObj.left = false;
            squirrelObj.lastPos = "left";
        }
        // Right control
        else if(keyCode == 39 || key == "D")
        {
            squirrelObj.right = false;
            squirrelObj.lastPos = "right";
        }

    }
    //--------------------------------------------------------------------------------
    //End of Key Released control functions
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Mouse clicked control functions
    //--------------------------------------------------------------------------------
    this.mouseClicked = function(){
        
        // Display the following information when the page start up and the home button is selected.
        if(gallery.selectedVisual.id == "Game")
        {
              var chartHeading = "Learn about Telos with Matsuo.";
              var chartInfo = "Motsua is a Telos themed game that focuses on the key points that make the Telos blockchain special. \
              <br><br> \
              This game can serve as a way to introduce people to Telos and is focussed more on those not familiar with Telos, as a fun way to learn about the possibilities that blockchain has to offer. \
              <br><br> \
              If you're already familiar  with Telos, just enjoy playing the game.";

              var htmlP = select('#chartInfo');
              htmlP.html(chartInfo);

              var htmlH3 = select('#chartInfoHeading');
              htmlH3.html(chartHeading);
        }
        
        //The intro page
        if(!startButtonObj.isClicked){
            // click functions on intropage
            introPageObj.mouseClicked();
        }

        //Disable interactives till game starts.
        if(startButtonObj.isClicked == true){
            // Monitor the sound switch
            soundSwitch.checkMouse();
             //Only enable the info buttons once game starts
            if(infoDisplayObj.displayWin)
            {
                // Monitor buttons for pressed function
                infoDisplayObj.mouseClicked();
            }
            
        }

    }
    //--------------------------------------------------------------------------------
    //Mouse clicked control functions
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Game level parameters function.
    //--------------------------------------------------------------------------------
    this.initializeStartGame = function(levelNum, selectSeason, worldSizeEnd, cloudsAmt, cloudSize, sunX, sunY, sunSize, wallHeight, canyonAmt, canyonSize, mountainSize, mountainAmt, treesAmt, treesSize, treeColl, platColl, bearNum){

        //Initialize, These items will vary for every level.
        season = selectSeason;
        worldSize = {
            start: 0,
            end: worldSizeEnd //3200
        }

        //This is the same for every level.
        timer = 0;
        collectableDist = 0;
        apples = 0;
        playerDied = false;
        catchByBear = false;
        dieByFall = false;
        soundEffects.gameWonSoundSet = false;
        answerCorrect = false;

        squirrelObj.reset();
        scrollPos = 0;
        gameChar_world_x = squirrelObj.x - scrollPos;

        //These items vary by level.
        cloudSet1 = new Clouds(); //New Cloudset.
        cloudSet1.setup(cloudsAmt,cloudSize,255); //Number in Set, Avg Size, Ave Shade.
        cloudSet2 = new Clouds(); //New Cloudset.
        cloudSet2.setup(cloudsAmt,cloudSize+10,240); //Number in Set, Avg Size, Ave Shade.
        cloudSet3 = new Clouds(); //New Cloudset.
        cloudSet3.setup(cloudsAmt,cloudSize+10,225); //Number in Set, Avg Size, Ave Shade.

        sunObj = createSun(sunX,sunY,sunSize); // x, y, Size.
        wallObj = createWall(50,wallHeight); // width, height.

        canyonObj = createCanyon();
        canyonObj.setup(canyonAmt,canyonSize); //Amount, Avg Size

        //Mountain Size, Amount, Season: summer, winter, spring, autumn.
        mountainObj = createMountain();
        mountainObj.setup(mountainSize, mountainAmt, season); 

        // Create the trees
        initTrees(treesAmt, treesSize, season);

        seasonalObj = seasonalAstetics(); //Setup the seasonal theme.
        seasonalObj.setup();

        flagPoleObj = createFlag(worldSize.end + 100);

        //Factory Method for the Lego platforms.
        this.platformsLevel(levelNum);

        //createCollectable(treesBool, platformsBool, treeAmt, platformAmt) platformAmt should ideally be prime numbers from 5 upwards.
        collectableObj = createCollectable(true, true, treeColl, platColl);
        collectableObj.setup();

        //Constructor Function for creating bears. Bear(bearX, bearY, left, right, speed, chargeDist)
        bears = [];
        var left = 0;
        var right = 0;
        for(var j = 0; j < canyonObj.canyon.length - 1; j++)
        {
            if(j != 0){
                left = canyonObj.canyon[j].x + canyonObj.canyon[j].z;
                right = canyonObj.canyon[j+1].x;
                if(bearNum == 1)
                {
                    bears.push(new Bear(random(left+20, right-20), floorPos_y, left, right, random(0.5, 2), 200));
                }
                else if(bearNum == 2)
                {
                    bears.push(new Bear(random(left+20, right-20), floorPos_y, left, right, random(0.5, 2), 200));
                    bears.push(new Bear(random(left+20, right-20), floorPos_y, left, right, random(1, 2.5), 300));
                }
                else
                {
                    bears.push(new Bear(random(left+20, right-20), floorPos_y, left, right, random(0.5, 2), 200));
                    bears.push(new Bear(random(left+20, right-20), floorPos_y, left, right, random(1, 2.5), 300));
                    bears.push(new Bear(random(left+20, right-20), floorPos_y, left, right, random(1.5, 3), 400));
                }

            }
        }

        //Factory Method for creating snakes. createSnake(snakeX, snakeY, leftEdge, rightEdge, moveSpeed, snakeSize)
        snakes = [];
        var left = 0;
        var right = 0;
        for(var j = 0; j < canyonObj.canyon.length; j++)
        {
            left = canyonObj.canyon[j].x+10;
            right = canyonObj.canyon[j].x + canyonObj.canyon[j].z - 10;
            snakes.push(createSnake(random(left, right), floorPos_y+(gameHeight-floorPos_y)-26, left, right, random(0.05, 0.2), 1));
        }

        //Extra life function
        var extraPos = int(random(0, platforms.length));
        var magicPos = int(random(0, platforms.length));
        extraLifeObj = createExtraLife(extraPos);
        magicPotionObj = createMagicPotion(magicPos);

        // Create the Info Object
        infoObj = createInfo();
        infoObj.setup();
        infoDisplayObj = new TelosInfo();
        infoDisplayObj.setup(levelNum);

    }
    //--------------------------------------------------------------------------------
    //End of the Game level parameters function.
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    // Ingame Reset function
    //--------------------------------------------------------------------------------
    this.ingameReset = function(){

        //Initialize the game character position.
        squirrelObj.reset();

        // Variable to control the background scrolling.
        scrollPos = 0;

        // Variable to store the real position of the gameChar in the game world. Needed for collision detection.
        gameChar_world_x = squirrelObj.x - scrollPos;

        //Keep score of the collectables & game lives
        if(lives <= 0)
        {
            lives = 3;
            apples = 0;
            gameLevels = 0;
        }

        // Reset conditions
        jumpResistance = 0;
        catchByBear = false;
        dieByFall = false;
        playerDied = false;
    }
    //--------------------------------------------------------------------------------
    // End of the Ingame Reset function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    // Initializing platforms function
    //--------------------------------------------------------------------------------
    this.platformsLevel = function(levelNum){
        platforms = [];

        //Platform parameters for level 1. (x, y, moveHorDis, moveVerDis, moveSpeed, width)
        if(levelNum == 1)
        {
            platforms.push(platformObj = createPlatform(2600, floorPos_y-440, 0, 0, 0, random(100, 300)));
            platforms.push(platformObj = createPlatform(2200, floorPos_y-360, 0, 70, 0.3, 150));
            platforms.push(platformObj = createPlatform(2900, floorPos_y-360, 0, 0, 0, random(100, 300)));
            platforms.push(platformObj = createPlatform(2550, floorPos_y-280, 0, 0, 0, random(100, 300)));
            platforms.push(platformObj = createPlatform(1800, floorPos_y-280, 0, 60, 0.3, 200));
            platforms.push(platformObj = createPlatform(700, floorPos_y-250, 50, 80, 0.3, 100));
            platforms.push(platformObj = createPlatform(300, floorPos_y-220, 0, 100, 0.4, 150));
            platforms.push(platformObj = createPlatform(1400, floorPos_y-200, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(2900, floorPos_y-200, 0, 0, 0, random(100, 300)));
            platforms.push(platformObj = createPlatform(1100, floorPos_y-150, 100, 0, 0.5, 100));
            platforms.push(platformObj = createPlatform(600, floorPos_y-120, 100, 0, 0.3, 200));
            platforms.push(platformObj = createPlatform(2500, floorPos_y-120, 0, 0, 0, random(100, 300)));
        }
        //Platform parameters for level 2.
        else if(levelNum == 2)
        {
            platforms.push(platformObj = createPlatform(2600, floorPos_y-440, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(2200, floorPos_y-360, 0, 70, 0.3, 150));
            platforms.push(platformObj = createPlatform(2950, floorPos_y-360, 0, 0, 0, 300));
            platforms.push(platformObj = createPlatform(2550, floorPos_y-280, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(1800, floorPos_y-280, 0, 60, 0.3, 200));
            platforms.push(platformObj = createPlatform(4000, floorPos_y-280, 0, 60, 0.2, 200));
            platforms.push(platformObj = createPlatform(700, floorPos_y-250, 50, 80, 0.3, 100));
            platforms.push(platformObj = createPlatform(300, floorPos_y-220, 0, 100, 0.4, 150));
            platforms.push(platformObj = createPlatform(1400, floorPos_y-200, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(2900, floorPos_y-200, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(3500, floorPos_y-200, 0, 0, 0, 300));
            platforms.push(platformObj = createPlatform(4400, floorPos_y-200, 80, 0, 0.4, 200));
            platforms.push(platformObj = createPlatform(1100, floorPos_y-150, 100, 0, 0.5, 100));
            platforms.push(platformObj = createPlatform(600, floorPos_y-120, 100, 0, 0.3, 200));
            platforms.push(platformObj = createPlatform(2500, floorPos_y-120, 0, 0, 0, 200));
        }
        //Platform parameters for level 3.
        else if(levelNum == 3)
        {
            platforms.push(platformObj = createPlatform(150, floorPos_y-280, 0, 100, 0.6, 250));
            platforms.push(platformObj = createPlatform(550, floorPos_y-120, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(900, floorPos_y-220, 0, 100, 0.3, 250));
            platforms.push(platformObj = createPlatform(1400, floorPos_y-220, 200, 0, 0.8, 100));
            platforms.push(platformObj = createPlatform(1700, floorPos_y-240, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(2100, floorPos_y-300, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(2500, floorPos_y-360, 200, 0, 0.5, 100));
            platforms.push(platformObj = createPlatform(2900, floorPos_y-220, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(3300, floorPos_y-200, 150, 50, 0.7, 200));
            platforms.push(platformObj = createPlatform(3700, floorPos_y-340, 0, 0, 0, 300));
            platforms.push(platformObj = createPlatform(4250, floorPos_y-220, 0, 0, 0, 200));
        }
        //Platform parameters for level 4.
        else if(levelNum == 4)
        {
            platforms.push(platformObj = createPlatform(500, floorPos_y-120, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(900, floorPos_y-120, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(1300, floorPos_y-200, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(1700, floorPos_y-280, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(2100, floorPos_y-360, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(2500, floorPos_y-440, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(2900, floorPos_y-360, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(3300, floorPos_y-420, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(3700, floorPos_y-360, 0, 0, 0, random(150, 300)));
            platforms.push(platformObj = createPlatform(4100, floorPos_y-300, 0, 0, 0, random(150, 300)));
        }
        //Platform parameters for level 5.(x, y, moveHorDis, moveVerDis, moveSpeed, width)
        else if(levelNum == 5)
        {
            platforms.push(platformObj = createPlatform(150, floorPos_y-280, 0, 100, 0.6, 200));
            platforms.push(platformObj = createPlatform(525, floorPos_y-180, 0, 0, 0, 50));
            platforms.push(platformObj = createPlatform(750, floorPos_y-120, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(1125, floorPos_y-180, 0, 0, 0, 50));
            platforms.push(platformObj = createPlatform(1350, floorPos_y-160, 0, 120, random(0.3,0.6), 200));
            platforms.push(platformObj = createPlatform(1725, floorPos_y-200, 0, 0, 0, 50));
            platforms.push(platformObj = createPlatform(1950, floorPos_y-220, 0, 120, random(0.2,0.6), 150));
            platforms.push(platformObj = createPlatform(2275, floorPos_y-210, 0, 0, 0, 50));
            platforms.push(platformObj = createPlatform(2500, floorPos_y-280, 0, 120, random(0.3,0.6), 175));
            platforms.push(platformObj = createPlatform(2850, floorPos_y-230, 0, 0, 0, 50));
            platforms.push(platformObj = createPlatform(3075, floorPos_y-220, 80, 120, random(0.2,0.6), 200));
            platforms.push(platformObj = createPlatform(3450, floorPos_y-260, 0, 0, 0, 50));
            platforms.push(platformObj = createPlatform(3675, floorPos_y-400, 120, 80, random(0.2,0.6), 200));
            platforms.push(platformObj = createPlatform(4050, floorPos_y-300, 80, 0, random(0.2,0.6), 175));
            platforms.push(platformObj = createPlatform(4400, floorPos_y-200, 80, 0, random(0.2,0.6), 175));
        }
        //Platform parameters for level 6.(x, y, moveHorDis, moveVerDis, moveSpeed, width)
        else if(levelNum == 6)
        {
            platforms.push(platformObj = createPlatform(150, floorPos_y-280, 0, 0, 0.6, 200));
            platforms.push(platformObj = createPlatform(525, floorPos_y-180, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(750, floorPos_y-120, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(1125, floorPos_y-180, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(1350, floorPos_y-160, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(1725, floorPos_y-200, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(1950, floorPos_y-220, 0, 0, 0, 150));
            platforms.push(platformObj = createPlatform(2275, floorPos_y-210, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(2500, floorPos_y-280, 0, 0, 0, 175));
            platforms.push(platformObj = createPlatform(2850, floorPos_y-230, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(3075, floorPos_y-220, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(3450, floorPos_y-260, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(3675, floorPos_y-400, 0, 0, 0, 200));
            platforms.push(platformObj = createPlatform(4050, floorPos_y-300, 0, 0, 0, 175));
            platforms.push(platformObj = createPlatform(4400, floorPos_y-200, 0, 0, 0, 175));
        }
        //Platform parameters for level 7.(x, y, moveHorDis, moveVerDis, moveSpeed, width)
        else if(levelNum == 7)
        {
            platforms.push(platformObj = createPlatform(150, floorPos_y-280, 100, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(525, floorPos_y-180, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(750, floorPos_y-120, 100, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(1125, floorPos_y-180, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(1350, floorPos_y-160, 100, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(1725, floorPos_y-200, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(1950, floorPos_y-220, 100, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(2275, floorPos_y-210, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(2500, floorPos_y-280, 100, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(2850, floorPos_y-230, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(3075, floorPos_y-220, 100, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(3450, floorPos_y-260, 0, 100, random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(3675, floorPos_y-400, 100, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(4050, floorPos_y-300, 0, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(4400, floorPos_y-200, 0, 0, random(0.3,0.6), 100));
        }
        //Platform parameters for level 8.(x, y, moveHorDis, moveVerDis, moveSpeed, width)
        else if(levelNum == 8)
        {
            platforms.push(platformObj = createPlatform(150, floorPos_y-280, random(80, 120), random(80, 120), random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(525, floorPos_y-180, random(80, 120), random(80, 120), random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(750, floorPos_y-120, random(80, 120), random(80, 120), random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(1125, floorPos_y-180, random(80, 120), random(80, 120), random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(1350, floorPos_y-160, random(80, 120), random(80, 120), random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(1725, floorPos_y-200, random(80, 120), random(80, 120), random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(1950, floorPos_y-220, random(80, 120), random(80, 120), random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(2275, floorPos_y-210, random(80, 120), random(80, 120), random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(2500, floorPos_y-280, random(80, 120), random(80, 120), random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(2850, floorPos_y-230, random(80, 120), random(80, 120), random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(3075, floorPos_y-220, random(80, 120), random(80, 120), random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(3450, floorPos_y-260, random(80, 120), random(80, 120), random(0.3,0.6), 50));
            platforms.push(platformObj = createPlatform(3675, floorPos_y-400, random(80, 120), random(80, 120), random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(4050, floorPos_y-300, 0, 0, random(0.3,0.6), 100));
            platforms.push(platformObj = createPlatform(4400, floorPos_y-200, 0, 0, random(0.3,0.6), 100));
        }
        //Platform parameters for level 9.(x, y, moveHorDis, moveVerDis, moveSpeed, width)
        else if(levelNum == 9)
        {
            var gapDist = 250;
            var top = 300;
            var bottom = 120;

            for(var i = 0; i < 20; i++){

                var platPosX = 150+gapDist*i;
                var platPosY = floorPos_y-(random(bottom,top));
                var horizontal = 0;
                var vertical = 0;
                var moveSpeed = 0;
                var set1w = random(100, 150);
                var set2w = random(50, 100);

                if(i%2 == 0){
                    platforms.push(platformObj = createPlatform(platPosX, platPosY, horizontal, vertical, moveSpeed, set1w));
                }else{
                    platforms.push(platformObj = createPlatform(platPosX+((set1w-set2w)/2), platPosY, horizontal, vertical, moveSpeed, set2w));
                }
            }
        }
        //Platform parameters for level 10.(x, y, moveHorDis, moveVerDis, moveSpeed, width)
        else if(levelNum == 10)
        {
            var gapDist = 300;
            var top = 250;
            var bottom = 120;

            for(var i = 0; i < 16; i++){

                var platPosX = 150+gapDist*i;
                var platPosY = floorPos_y-(random(bottom+5*i,top+5*i));
                var horizontal = random(50, 100);
                var vertical = random(50, 150);
                var moveSpeed = random(0.6, 0.9);
                var set1w = random(100, 150);
                var set2w = random(50, 100);

                if(i%2 == 0){
                    platforms.push(platformObj = createPlatform(platPosX, platPosY, 0, 0, moveSpeed, set1w));
                }else{
                    platforms.push(platformObj = createPlatform(platPosX+((set1w-set2w)/2), platPosY, 0, vertical, moveSpeed, set2w));
                }
            }
        }
        //Platform parameters for level 11.(x, y, moveHorDis, moveVerDis, moveSpeed, width)
        else if(levelNum == 11)
        {
            var gapDist = 350;
            var top = 260;
            var bottom = 120;

            for(var i = 0; i < 14; i++){

                var platPosX = 150+gapDist*i;
                var platPosY = floorPos_y-(random(bottom+5*i,top+5*i));
                var horizontal = random(50, 100);
                var vertical = random(50, 150);
                var moveSpeed = random(0.6, 0.9);
                var set1w = random(100, 150);
                var set2w = random(50, 100);

                if(i%2 == 0){
                    platforms.push(platformObj = createPlatform(platPosX, platPosY, 0, 0, 0, set1w));
                }else{
                    platforms.push(platformObj = createPlatform(platPosX+((set1w-set2w)/2), platPosY, horizontal, vertical, moveSpeed, set2w));
                }
            }
        }
        //Platform parameters for level 12.(x, y, moveHorDis, moveVerDis, moveSpeed, width)
        else if(levelNum == 12)
        {
            var gapDist = 380;
            var top = 260;
            var bottom = 120;

            for(var i = 0; i < 12; i++){

                var platPosX = 150+gapDist*i;
                var platPosY = floorPos_y-(random(bottom,top));
                var horizontal = random(50, 100);
                var vertical = random(50, 150);
                var moveSpeed = random(0.7, 1);
                var set1w = random(75, 125);
                var set2w = random(50, 75);

                if(i%2 == 0){
                    platforms.push(platformObj = createPlatform(platPosX, platPosY, horizontal, vertical, moveSpeed, set1w));
                }else{
                    platforms.push(platformObj = createPlatform(platPosX+((set1w-set2w)/2), platPosY, horizontal, vertical, moveSpeed, set2w));
                }
            }
        }

        return platforms;
    }
    //--------------------------------------------------------------------------------
    // End of the Initializing platforms function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    // Start Game Function. Levels 1 to 12.
    //--------------------------------------------------------------------------------
    //Information about the initializeStartGame function.
    //(levelNum, selectSeason, worldSizeEnd, cloudsAmt, cloudSize, sunX, sunY, sunSize, wallHeight, canyonAmt, canyonSize, mountainSize, mountainAmt, treesAmt, treesSize, treeColl, platColl, bearNum)
    this.startSetParameters = function(){
        //Set the Start Game parameters.
        gameScore = 0;
        jumpResistance = 0;
        jumpPower = 6;
        lives = 3;
        revitalizeJumpPower = 3;
    }

    this.startGame = function(){
        //Game Level 1
        if((gameLevels == 0) || (gameLevels == 1 && levelButtons[0].isClicked == true))
        {
            //Set the level parameters.
            levelButtons[0].isUnlocked = true;
            levelButtons[0].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 1){
                window.localStorage.setItem('lastLevel', 1);
            }
            if(gameLevels == 0){gameLevels = 1};
            this.initializeStartGame(1, "spring", 3200, 10, 40, 150, 100, 100, 600, 3, 100, 1, 4, 7, 1, 1, 7, 1);
        }
        //Game Level 1 ingame Reset.
        else if(gameLevels == 1 && answerCorrect == false && levelButtons[0].isClicked == false)
        {
            this.ingameReset();
        }
        //Game Level 2
        else if((gameLevels == 2  && answerCorrect == true)||(gameLevels == 2 && levelButtons[1].isClicked == true))
        {
            levelButtons[1].isUnlocked = true;
            levelButtons[1].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 2){
                window.localStorage.setItem('lastLevel', 2);
            }
            this.initializeStartGame(2, "summer", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 6, 10, 1, 1, 7, 1);
        }
        //Game Level 2 ingame Reset.
        else if(gameLevels == 2 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 3
        else if((gameLevels == 3  && answerCorrect == true)||(gameLevels == 3 && levelButtons[2].isClicked == true))
        {   
            levelButtons[2].isUnlocked = true;
            levelButtons[2].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 3){
                window.localStorage.setItem('lastLevel', 3);
            }
            this.initializeStartGame(3, "autumn", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 1);
        }
        //Game Level 3 ingame Reset.
        else if(gameLevels == 3 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 4
        else if((gameLevels == 4 && answerCorrect == true)||(gameLevels == 4 && levelButtons[3].isClicked == true))
        {   
            levelButtons[3].isUnlocked = true;
            levelButtons[3].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 4){
                window.localStorage.setItem('lastLevel', 4);
            }
            this.initializeStartGame(4, "winter", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 1);
        }
        //Game Level 4 ingame Reset.
        else if(gameLevels == 4 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 5
        else if((gameLevels == 5  && answerCorrect == true)||(gameLevels == 5 && levelButtons[4].isClicked == true))
        {
            levelButtons[4].isUnlocked = true;
            levelButtons[4].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 5){
                window.localStorage.setItem('lastLevel', 5);
            }
            this.initializeStartGame(5, "spring", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 2);
        }
        //Game Level 5 ingame Reset.
        else if(gameLevels == 5 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 6
        else if((gameLevels == 6  && answerCorrect == true)||(gameLevels == 6 && levelButtons[5].isClicked == true))
        {
            levelButtons[5].isUnlocked = true;
            levelButtons[5].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 6){
                window.localStorage.setItem('lastLevel', 6);
            }
            this.initializeStartGame(6, "summer", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 2);
        }
        //Game Level 6 ingame Reset.
        else if(gameLevels == 6 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 7
        else if((gameLevels == 7  && answerCorrect == true)||(gameLevels == 7 && levelButtons[6].isClicked == true))
        {
            levelButtons[6].isUnlocked = true;
            levelButtons[6].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 7){
                window.localStorage.setItem('lastLevel', 7);
            }
            this.initializeStartGame(7, "autumn", 4800, 10, 30, 500, 100, 75, 400, 5, 200, 1, 5, 10, 1, 1, 6, 2);
        }
        //Game Level 7 ingame Reset.
        else if(gameLevels == 7 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 8
        else if((gameLevels == 8 && answerCorrect == true)||(gameLevels == 8 && levelButtons[7].isClicked == true))
        {
            levelButtons[7].isUnlocked = true;
            levelButtons[7].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 8){
                window.localStorage.setItem('lastLevel', 8);
            }
            this.initializeStartGame(8, "winter", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 2);
        }
        //Game Level 8 ingame Reset.
        else if(gameLevels == 8 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 9
        else if((gameLevels == 9 && answerCorrect == true)||(gameLevels == 9 && levelButtons[8].isClicked == true))
        {
            levelButtons[8].isUnlocked = true;
            levelButtons[8].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 9){
                window.localStorage.setItem('lastLevel', 9);
            }
            this.initializeStartGame(9, "spring", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 3);
        }
        //Game Level 9 ingame Reset.
        else if(gameLevels == 9 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 10
        else if((gameLevels == 10 && answerCorrect == true)||(gameLevels == 10 && levelButtons[9].isClicked == true))
        {
            levelButtons[9].isUnlocked = true;
            levelButtons[9].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 10){
                window.localStorage.setItem('lastLevel', 10);
            }
            this.initializeStartGame(10, "summer", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 3);
        }
        //Game Level 10 ingame Reset.
        else if(gameLevels == 10 && answerCorrect == false)
        {
            this.ingameReset();
        }
        //Game Level 11
        else if((gameLevels == 11 && answerCorrect == true)||(gameLevels == 11 && levelButtons[10].isClicked == true))
        {
            levelButtons[10].isUnlocked = true;
            levelButtons[10].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 11){
                window.localStorage.setItem('lastLevel', 11);
            }
            this.initializeStartGame(11, "autumn", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 3);
        }
        //Game Level 11 ingame Reset.
        else if(gameLevels == 11 && answerCorrect == false)
        {

            this.ingameReset();
        }
        //Game Level 12
        else if((gameLevels == 12 && answerCorrect == true)||(gameLevels == 12 && levelButtons[11].isClicked == true))
        {
            levelButtons[11].isUnlocked = true;
            levelButtons[11].isClicked = false;
            // Save data to local storage.
            if(window.localStorage.getItem('lastLevel') < 12){
                window.localStorage.setItem('lastLevel', 12);
            }
            this.initializeStartGame(12, "winter", 4800, 10, 30, 300, 100, 75, 500, 4, 130, 1, 5, 10, 1, 1, 7, 3);
        }
        //Game Level 12 ingame Reset.
        else if(gameLevels == 12 && answerCorrect == false)
        {
            this.ingameReset();
        }

    }
    //--------------------------------------------------------------------------------
    //End of the Reset game Function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Function to check if character is over a canyon.
    //--------------------------------------------------------------------------------
    this.checkCanyon = function(t_canyon){
        //Detect if the character is close to the canyon.
        if((t_canyon.x+15 < gameChar_world_x && gameChar_world_x < (t_canyon.x + t_canyon.z-20)) && squirrelObj.y >= floorPos_y)
        {
            squirrelObj.charOverCanyon = true;
            squirrelObj.plumeting = true;
        }
    }
    //--------------------------------------------------------------------------------
    //End of the Function to check if character is over a canyon.
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //The Check Flagpole function
    //--------------------------------------------------------------------------------
    this.checkFlagpole = function(){
        //Check the distance to the flag
        var d = int(dist(gameChar_world_x, squirrelObj.y, flagPoleObj.flagpole.x_pos, flagPoleObj.flagpole.y_pos));
        if(d <= 30 && !flagPoleObj.flagpole.isReached && !playerDied)
        {
            flagPoleObj.flagpole.isReached = true;
            infoDisplayObj.displayWin = true;
        }
        else if(flagPoleObj.flagpole.isReached && d > 30){
            flagPoleObj.flagpole.isReached = false;
        }
    }
    //--------------------------------------------------------------------------------
    //End of The Check Flagpole function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //The lives check function
    //--------------------------------------------------------------------------------
    this.checkPlayerDie = function(){
        if((squirrelObj.y > gameHeight-20 && playerDied == false || catchByBear == true && playerDied == false || dieByFall == true && playerDied == false) && flagPoleObj.flagpole.isReached == false)
        {
            //Deduct one life and play the relevant sound.
            lives -= 1;
            playerDied = true;
            if(catchByBear == true)
            {
                bearSound.play();
                dieSound1.play();
            }
            else if(dieByFall == true)
            {
                dieSound2.play();
            }

            //Revitalize jumpstrength.
            if(jumpPower < 6){
                jumpPower = 6;
            }
        }
    }
    //--------------------------------------------------------------------------------
    //End of The lives check function
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    //Check if squirrelObj is on a Platform function
    //--------------------------------------------------------------------------------
    this.checkIfOnPlatform = function(){
        var platformNumber = null;
        for(var i = 0; i < platforms.length; i++)
        {
            if((gameChar_world_x > platforms[i].x-10 && (gameChar_world_x < (platforms[i].x+10 + platforms[i].width+1))) && squirrelObj.y < platforms[i].y+10)
            {
                platforms[i].charOnPlatform = true;
                platformNumber = i;
                break;
            }
            else
            {
                platforms[i].charOnPlatform = false;
            }
        }
        return platformNumber;
    }
    //--------------------------------------------------------------------------------
    //End of the Check if squirrelObj is on a Platform function
    //--------------------------------------------------------------------------------


}