// #########################################
// BP Line constructor function.
// #########################################
function bpLine(x, y, w, h, rank, logo, name, location, blocksProduced, votes){
    
    // Function arguments
    this.rank = rank;
    this.logo = logo;
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
    this.col4 = 7*this.colInt;
    this.col5 = 10*this.colInt;
    this.col6 = 13*this.colInt;
    
    // setup method
    this.setup = function()
    {
        
    }
    
    // draw method
    this.draw = function()
    {
        // draw the line
        fill(50,50,50);
        rect(this.x, this.y, this.w, this.h);
        
        // set the textsize
        textSize(this.txtSize/2.5);
        textAlign(LEFT, CENTER);
        fill(250,250,250);
        
        // draw the BP rank
        text(this.rank, this.x+this.col1, this.y+this.h/2);
        
        // draw the BP logo
        text(this.logo, this.x+this.col2, this.y+this.h/2);
        
        // draw the BP name
        text(this.name, this.x+this.col3, this.y+this.h/2);
        
        // draw the BP location
        text(this.location, this.x+this.col4, this.y+this.h/2);
        
        // draw the BP blocks produced
        text(this.blocks, this.x+this.col5, this.y+this.h/2);
        
        // draw the BP votes
        text(this.votes, this.x+this.col6, this.y+this.h/2);
    }
    
}

