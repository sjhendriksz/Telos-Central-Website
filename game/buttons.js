//-----------------------------------------------------------------------------------
// Function to create a button for the Questions during the info popup.
//-----------------------------------------------------------------------------------
function CreateButton(x, y, btnWidth, textInfo, textS, link){
    
    // Button object - Move on / Continue
    this.x = x;
    this.y = y;
    this.h = 50;
    this.colour = orangeText;
    this.isHovering = false;
    this.textInfo = textInfo;
    this.isPressed = false;
    this.link = link;
    this.padding = 20;
    this.textW = btnWidth;
    this.textS = textS;
    
    this.draw = function(){
        // Text styling & size
        textAlign(CENTER, CENTER);
        textSize(this.textS);
        
        // Button itself - draw
        fill(this.colour);
        rect(this.x-(this.padding/2), this.y, this.textW+(this.padding), this.h, 5);
        
        // Draw text on top of the button
        fill(250);
        text(this.textInfo, this.x+this.textW/2, this.y+this.h/2);
        
        // Call the hover function
        this.hover();
    },

    this.hover = function(){
        if(!this.isPressed){
            if(mousePosX > this.x-(this.padding/2) && mousePosX < this.x+this.textW+(this.padding/2) && mousePosY > this.y && mousePosY < this.y+this.h)
            {
                this.colour = color(150, 60, 30);
                this.isHovering = true;
            }
            else
            {
                this.colour = orangeText;
                this.isHovering = false;
            }
            
        }
    },

    this.press = function(num, buttonArray){
        
        if(mousePosX > this.x-(this.padding/2) && mousePosX < this.x+this.textW+(this.padding/2) && mousePosY > this.y && mousePosY < this.y+this.h)
        {
            // Toggle button
            this.isPressed = !this.isPressed;

            // Change the background colour of the button to show clicked
            if(this.isPressed){
                this.colour = color(150, 60, 30);
            }
            else
            {
                this.colour = orangeText;
            }
            
            // Follow the link, if any is available
            if(this.link != undefined){
                this.isPressed = false;
                window.open(this.link);
            }

            // Deselect all buttons when clicking on a new button
            if(num != undefined){
                for(var i = 0; i < buttonArray.length; i++){
                    if(i != num && buttonArray[i].isPressed == true){
                        buttonArray[i].isPressed = false;
                    }
                }
            }
            
        }
        
    }

}
//----------------------------------------------------------------------------------
// End of the Function to create a button for the Questions during the info popup.
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
// Function to create a button for Continue during the info popup.
//-----------------------------------------------------------------------------------
function CreateConButton(x, y, btnWidth, textInfo, textS){
    
    // Button object - Move on / Continue
    this.colour = orangeText;
    this.isHovering = false;
    this.textInfo = textInfo;
    this.isPressed = false;
    this.padding = 20;
    this.textW = btnWidth;
    this.textS = textS;
    
    this.x = x - btnWidth-2*this.padding;
    this.y = y;
    this.h = 50;
    
    this.draw = function(){
        // Text styling & size
        textAlign(CENTER, CENTER);
        textSize(this.textS);

        // Button itself - draw
        fill(this.colour);
        rect(this.x-(this.padding/2), this.y, this.textW+(this.padding), this.h, 5);
         
        // Draw text on top of the button
        fill(250);
        text(this.textInfo, this.x+this.textW/2, this.y+this.h/2);
        
        // Call the hover function
        this.hover();
    },

    this.hover = function(){
        if(!this.isPressed){
            if(mousePosX > this.x-(this.padding/2) && mousePosX < this.x+this.textW+(this.padding/2) && mousePosY > this.y && mousePosY < this.y+this.h)
            {
                this.colour = color(150, 60, 30);
                this.isHovering = true;
            }
            else
            {
                this.colour = orangeText;
                this.isHovering = false;
            }
        }
    },

    this.press = function(){
        if(mousePosX > this.x-(this.padding/2) && mousePosX < this.x+this.textW+(this.padding/2) && mousePosY > this.y && mousePosY < this.y+this.h)
        {
            // Toggle button
            this.isPressed = !this.isPressed;

            // Change the background colour of the button to show clicked
            if(this.isPressed){
                this.colour = color(150, 60, 30);
                this.isHovering = false;
            }
            else
            {
                this.colour = orangeText;
            }

        }
    }
}
//-----------------------------------------------------------------------------------
// End of the Function to create a button for Continue button during the info popup.
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//Start game Button
//-----------------------------------------------------------------------------------
function StartGameButton(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isClicked = false;
    this.colour = orangeText;
    this.isHovering = false;
    this.textVal = "Start";
    this.textS = sqrt(width*height)*0.018;
    
    this.setup = function(){
        // Calculate the height and width of the button based on the size of the text.
        textSize(this.textS);
        var tW = textWidth(this.textVal);
        /*this.w = tW + tW*2;
        this.h = this.textS*3;*/
    }

    this.draw = function(){
        // Hover colour and cursor
        this.hover();

        // Draw the button
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h, 5);

        // Draw the text.
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(this.textS);
        text(this.textVal, this.x+this.w/2, this.y+this.h/2);
    }
    
    this.hover = function(){
        // Only change hover colour when not clicked
        if(!this.isClicked){
            // Change the button colour when hovering
            if(this.x < mouseX && mouseX < this.x+this.w && this.y < mouseY && mouseY < this.y+this.h)
            {
                this.colour = color(100,100,100);
            }
            else
            {
                this.colour = orangeText;
            }
        }
        else
        {
            this.colour = color(50,50,50);
        }
        
        // Hover mouse Cursor
        if(this.x < mouseX && mouseX < this.x+this.w && this.y < mouseY && mouseY < this.y+this.h)
        {
            this.isHovering = true;
        }
        else
        {
            this.isHovering = false;
        }
    }

    this.clicked = function(){
        if(this.x < mouseX && mouseX < this.x+this.w && this.y < mouseY && mouseY < this.y+this.h)
        {
            
            // Set the button to clicked
            this.isClicked = true;
            
            // Initialize game.
            gallery.visuals[2].startSetParameters();
            gallery.visuals[2].startGame();
            
            // Close the intro page
            introPageObj.isDisplayed = false;
        }
        else
        {
            this.colour = orangeText;
        }
    }
}
//-----------------------------------------------------------------------------------
//Start game Button
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//Fullscreen Button
//-----------------------------------------------------------------------------------
function FullScreenButton(x, y){
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = 0;
    this.isVisible = false;
    this.colour = orangeText;
    this.isHovering = false;
    this.textVal = "Fullscreen";
    this.textS = sqrt(width*height)*0.018;
    
    this.setup = function(){
        // Calculate the height and width of the button based on the size of the text.
        textSize(this.textS);
        var tW = textWidth(this.textVal);
        
        this.w = tW + tW*0.5;
        this.h = this.textS*3;
    }

    this.draw = function(){
        // Only display if the isVisible property is true.
        if(this.isVisible == true){
            
            // Hover colour and cursor
            this.hover();

            // Draw the button
            fill(this.colour);
            rect(this.x, this.y, this.w, this.h, 5);

            // Draw the text.
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(this.textS);
            text(this.textVal, this.x+this.w/2, this.y+this.h/2);

        }
    }
    
    this.hover = function(){
        // Change the button colour when hovering
        if(this.x < mouseX && mouseX < this.x+this.w && this.y < mouseY && mouseY < this.y+this.h)
        {
            this.colour = color(100,100,100);
            this.isHovering = true;
        }
        else
        {
            this.colour = orangeText;
            this.isHovering = false;
        }

    }

    this.clicked = function(){
        // Only allow click if the isVisible property is true.
        if(this.isVisible == true){
            if(this.x < mouseX && mouseX < this.x+this.w && this.y < mouseY && mouseY < this.y+this.h)
            {
                var w = window.innerWidth;
                var h = window.innerHeight;
                
                document.getElementById('leftNavBarGrid').style.display = "none";
                document.getElementById('header').style.display = "none";
                /*document.getElementById('footerP').style.display = "none";
                document.getElementById('infoGrid').style.display = "none";*/
                document.getElementById('reports').style.display = "none";
                
                var canvasDiv = document.getElementById('canvasGrid');
                canvasDiv.style.width = '100%';
                canvasDiv.style.height = '100%';
                
                resizeCanvas(w, h);

                /*// Toggle fullscreen.
                let fs = fullscreen();
                fullscreen(!fs);*/
            }
            else
            {
                this.colour = orangeText;
            }
        }
    }

}
//-----------------------------------------------------------------------------------
//Fullscreen Button
//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
// LevelButton Buttons
//-----------------------------------------------------------------------------------
function LevelButton(x, y, w, h, num){
    //this.buttons = [];
    // Temp code, change true to false
    this.isUnlocked = false;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.num = num+1;
    this.text = "Level: " + this.num;
    this.isClicked = false;
    this.colour = orangeText;
    this.isHovering = false;
    this.textS = sqrt(width*height)*0.018;

    this.draw = function(){
        //Only draw the button if it has been unlocked by finishing that specific level.
        if(this.isUnlocked){
            
            // Check for mouse hover
            this.hover();
            
            //Draw the button
            fill(this.colour);
            rect(this.x, this.y, this.w, this.h, 5);

            // Draw the Text
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(this.textS);
            text(this.text, this.x + this.w/2, this.y+(this.h/2));

        }
        
    }
    
    this.hover = function(){
        // Only change hover colour when not clicked
        if(!this.isClicked){
            // Change the button colour when hovering
            if(this.x < mouseX && mouseX < this.x+this.w && this.y < mouseY && mouseY < this.y+this.h)
            {
                this.colour = color(100,100,100);
            }
            else
            {
                this.colour = orangeText;
            }
        }
        else
        {
            this.colour = color(50,50,50);
        }
        
        // Hover mouse Cursor
        if(this.x < mouseX && mouseX < this.x+this.w && this.y < mouseY && mouseY < this.y+this.h)
        {
            this.isHovering = true;
        }
        else
        {
            this.isHovering = false;
        }
    }
    
    this.clicked = function(level){
        // Clear the button if it has not been clicked
        if(this.isClicked == true){this.isClicked = false};
        
        // Hover
        if(this.x < mouseX && mouseX < this.x+this.w && this.y < mouseY && mouseY < this.y+this.h)
        {
            if(this.isClicked == false)
                {
                    this.isClicked = true;
                    gameLevels = level;
                }
            else if(this.isClicked == true)
                {
                    this.isClicked = false;
                }
        }
    }
    
}
//-----------------------------------------------------------------------------------
// LevelButton Buttons
//-----------------------------------------------------------------------------------