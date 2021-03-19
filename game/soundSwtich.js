//-----------------------------------------------------------------------------------
// Create Sound Switch Function
//-----------------------------------------------------------------------------------
function CreateSoundSwitch()
{
    this.initialized = false;
    this.x = gameWidth - 50,
    this.y = 25,
    this.selectorOn = gameWidth - 50,
    this.selectorOff = gameWidth - 50 + 16,
    this.on = true,
    
    this.draw = function(selectorPos)
    {
        selectorPos = this.selectorOn;
        if(this.on) //Selector Switch On position.
        { 
            fill(0,200,0);
            strokeWeight(1);
            stroke(0);
            rect(this.x-7.5, this.y-7.5, 30,15,10);
            fill(0,0,0);
            ellipse(selectorPos, this.y, 10, 10);
        }
        else //Selector Switch Off position.
        {
            selectorPos = this.selectorOff;
            fill(200,0,0);
            strokeWeight(1);
            stroke(0);
            rect(this.x-7.5, this.y-7.5, 30,15,10);
            fill(0,0,0);
            ellipse(selectorPos, this.y, 10, 10);
        }

        //Descriptive Text - Sound.
        fill(0,0,0);
        stroke(0);
        strokeWeight(1);
        textSize(20);
        textAlign(LEFT, CENTER);
        text("Music",this.x-80,this.y);
        return(selectorPos);
    }
    
    this.checkMouse = function(){
        
        if(gameLevels != 0){
            //Scwitch Game Music on and off.
            var mouseDist;
            if(soundSwitch.on){
                mouseDist = dist(mousePosX, mousePosY, soundSwitch.selectorOn, soundSwitch.y);
            }
            else
            {
                mouseDist = dist(mousePosX, mousePosY, soundSwitch.selectorOff, soundSwitch.y);
            }

            if(mouseDist < 20){
                soundSwitch.on = !soundSwitch.on;
            }
            
        }
        
    }
        
}
//-----------------------------------------------------------------------------------
// End of Create Sound Switch Function
//-----------------------------------------------------------------------------------