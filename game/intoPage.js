//-----------------------------------------------------------------------------------
// Introduction and game info page
//-----------------------------------------------------------------------------------
function CreateIntroPage()
{
    this.textH = sqrt(width*height)*0.022;
    this.textP = sqrt(width*height)*0.020;
    this.isDisplayed = true;
    
    this.setup = function(){
        // Start Game Button
        startButtonObj = new StartGameButton(width - 150, height - 100, 100, 30); //x, y, w, h
        startButtonObj.setup();
        
        /*fullScreenObj = new FullScreenButton(width - 270, height - 100); //x, y, w, h
        fullScreenObj.setup();
        fullScreenObj.x = width - fullScreenObj.w - fullScreenObj.w*0.1 - startButtonObj.w - startButtonObj.w*1;*/
        
        // Level select Buttons
        levelButtons = [];
        for(var i = 0; i < 12; i++){    
            levelButtons.push(new LevelButton(width - 150, 50+(40*i), 100, 30, i)); //(x, y, w, h, num, text, num)
        }
        
        // Retrieve data from local storage and make those levels available.
        localStorage = window.localStorage.getItem('lastLevel');
        var localStorageNum = int(localStorage.lastLevel);
        if(localStorageNum != undefined){
            for(var i = 0; i < localStorageNum; i++){
                levelButtons[i].isUnlocked = true;
            }
        }
        
    }

    this.draw = function(){
        // Change the background Colour.
        background(backgroundCol);

        //Home Page info.
        textAlign(LEFT, TOP);
        noStroke();
        var spaceP = this.textP;

        //Introduction
        textSize(this.textH);
        fill(orangeText);
        text("Welcome to Matsuo, the Telos Squirrel.", 20, 20+this.textH);
        textSize(this.textP);
        fill(98,90,81);
        text("The aim of the game is to meet Chūemon, the Wizard and answer \nhis question correctly in order to move onto the next level.", 20, 20+this.textH+this.textP*1.25);

        //Game Info
        textSize(this.textH);
        fill(orangeText);
        text("Game Info:", 20, 20+this.textH*2+this.textP*2+spaceP);
        textSize(this.textP);
        fill(darkText);
        text("Everytime you jump, Matsuo, the squirrel loses energy, \nresulting in lower jump velocity. \nCollect acorns to restore your power and try to finish each level \nwith sufficient jump power. \nYou can drink Squirrel Potion to restore your jump power. \nWatch out for the Bears, they don't like squirrels very much and are aggressive. \n", 20, 20+this.textH*3+this.textP*2+spaceP);

        //Controls
        textSize(this.textH);
        fill(orangeText);
        text("Controls:", 20, 20+this.textH*4+this.textP*8+spaceP*2);
        textSize(this.textP);
        fill(darkText);
        text("Left: A or Left Arrow \nRight: D or Right Arrow \nJump: Spacebar.\nRevitalize Jump Power: R \n(Only available when jump level is below 75%)", 20, 20+this.textH*5+this.textP*8+spaceP*2);

        //Screen Size
         textSize(this.textH);
        fill(orangeText);
        text("Screen Size:", 20, 20+this.textH*6+this.textP*13+spaceP*3);
        textSize(this.textP);
        fill(darkText);
        text("The game is desinged with a resolution of 1280 x 960 and will scale \nautomatically based on the size of your browser window. \nYou can adjust the window size, but will have to refresh the page to \nreset the game conditions.", 20, 20+this.textH*7+this.textP*13+spaceP*3);

        //Draw the level selection buttons.
        for(var i = 0; i < levelButtons.length; i++){
            if(levelButtons[i].isUnlocked == true){
                levelButtons[i].draw();
            }
        }
        
        // Draw the start and fullscreen buttons
        startButtonObj.draw();
        //fullScreenObj.draw();
        
        // Change mouse cursor when mouse over button
        var levelBtnCount = 0;
        for(var i = 0; i < levelButtons.length; i++){
            if(levelButtons[i].isUnlocked){
                if(levelButtons[i].isHovering){
                    levelBtnCount += 1;
                }
            }
        }
        //if(levelBtnCount == 1 || startButtonObj.isHovering || fullScreenObj.isHovering){
        if(levelBtnCount == 1 || startButtonObj.isHovering){
            cursor(HAND);
        }
        else{
            cursor(ARROW);
        }
    }
    
    this.mouseClicked = function(){
        // Start and fullscreen buttons
        startButtonObj.clicked();
        //fullScreenObj.clicked();
        
        //Level Select buttons on the intro page
        for(var i = 0; i < levelButtons.length; i++){
            if(levelButtons[i].isUnlocked){
                levelButtons[i].clicked(i+1);
            }
        }
        
    }
            
}
//-----------------------------------------------------------------------------------
// End of Introduction and game info page
//-----------------------------------------------------------------------------------