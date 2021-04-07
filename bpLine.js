// #########################################
// BP Line constructor function.
// #########################################
function bpLine(x, y, w, h, rank, logoName, name, location, blocksProduced, votes){
    
    // Function arguments
    this.rank = rank;
    this.logoName = logoName;
    this.logo;
    this.imgLoaded = false;
    this.name = name;
    this.location = location;
    this.blocks = blocksProduced;
    this.votes = votes;
    
    this.visible = false;
    
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    
    this.txtSize = textSiz*9/10;
    
    this.colInt = w/20;
    
    this.col1 = 10;
    this.col2 = 2*this.colInt;
    this.col3 = 4*this.colInt;
    this.col4 = 8*this.colInt;
    this.col5 = 12*this.colInt;
    this.col6 = 13*this.colInt;
    
    // Colours
    this.lightBackCol = color('#EEEEEE');
    this.lightForeCol = color('#100B00');
    this.darkBackCol = color('#100B00');
    this.darkForeCol = color('#88A2AA');
    
    // Current colour selection
    this.backgroundCol = this.lightBackCol;
    this.foregroundCol = this.lightForeCol;
    
    // Hover colours
    this.hover = false;
    
    // setup method
    this.setup = function()
    {
        var tmpVotes = str(this.votes);
        tmpVotes = tmpVotes.slice(-9,-6) + "," + tmpVotes.slice(-6,-3) + "," + tmpVotes.slice(-3);
        this.votes = tmpVotes;
    }
    
    // draw method
    this.draw = function()
    {
        push();
        
        // set the colour
        if(this.hover){
            fill(this.foregroundCol);
            stroke(this.backgroundCol);
        }else{
            fill(this.backgroundCol);
            stroke(this.foregroundCol);
        }
        
        // draw the line
        rect(this.x, this.y, this.w, this.h);
        
        // set the textsize
        //textStyle(NORMAL);
        textSize(this.txtSize/2.5);
        textAlign(LEFT, CENTER);
        noStroke();
        
        // set the text colour
        if(this.hover){
            fill(this.backgroundCol);
        }else{
            fill(this.foregroundCol);
        }
        
        // draw the BP rank
        text(this.rank, this.x+this.col1, this.y+this.h/2);
        
        // draw the BP logo
        if(this.logoName == "LOGO"){
            text(this.logoName, this.x+this.col2, this.y+this.h/2);
        }
        else
        {
            if(this.imgLoaded){
                imageMode(CENTER);
                image(this.logo, this.x + this.col2 + this.h*4/10, this.y+this.h/2, this.h*9/10, this.h*9/10);
            }
            else // When no logo is available
            {
                ellipse(this.x + this.col2 + this.h*4/10, this.y+this.h/2, this.h*9/10);
            }
        }

        // draw the BP name
        text(this.name, this.x+this.col3, this.y+this.h/2);
        
        // draw the BP location
        text(this.location, this.x+this.col4, this.y+this.h/2);
        
        // draw the BP blocks produced
        // text(this.blocks, this.x+this.col5, this.y+this.h/2);
        
        // draw the BP votes
        text(this.votes, this.x+this.col5, this.y+this.h/2);
        
        pop();
        
        this.mouseHover();
    }
    
    
    
    this.mouseHover = function(){
        
        if(mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y+this.h){
            this.hover = true;
        }
        else
        {
            this.hover = false;
        }
    }
    
}

