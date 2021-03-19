//-----------------------------------------------------------------------------------
//Platform function - Factory Pattern
//-----------------------------------------------------------------------------------
function createPlatform(x, y, moveHorDis, moveVerDis, moveSpeed, width){
    pObj = {
        x: x,
        originalX: x,
        moveLeft: false,
        y: y,
        originalY: y,
        moveUp: false,
        moveSpeed: moveSpeed,
        moveHorizontal: moveHorDis,
        moveVertical: moveVerDis,
        charOnPlatform: false,
        width: width,
        height: 30,
        
        draw: function()
        {

            if(infoDisplayObj.displayWin == false){
                
                //Vertical movement.
                if(this.moveVertical != 0)
                {
                    if(this.y > this.originalY+this.moveVertical/2)
                    {
                        this.moveUp = true;
                    }
                    else if(this.y < this.originalY-this.moveVertical/2)
                    {
                        this.moveUp = false;
                    }
                    if(this.moveUp){
                        this.y -= moveSpeed;
                    }
                    else
                    {
                        this.y += moveSpeed;
                    }
                }

                //Horizontal movement.
                 if(this.moveHorizontal != 0)
                {
                    if(this.x > this.originalX+this.moveHorizontal/2 && this.moveLeft == false)
                    {
                       this.moveLeft = true;
                    }
                    else if(this.x < this.originalX-this.moveHorizontal/2  && this.moveLeft == true)
                    {
                        this.moveLeft = false;
                    }

                    if(this.moveLeft)
                    {
                        this.x -= moveSpeed;
                    }
                    else
                    {
                        this.x += moveSpeed;
                    }
                }
            }
            stroke(0);
            strokeWeight(0.5);
            fill(171,123,103);
            rect(this.x, this.y, this.width, this.height, 20);
            
            // Grass on top
            fill(platformColor);
            beginShape();
                curveVertex(this.x, this.y)
                curveVertex(this.x + this.width, this.y);
                curveVertex(this.x + this.width, this.y + this.height-15);
                curveVertex(this.x + this.width*4/5, this.y + this.height - 18);
                curveVertex(this.x + this.width*3/5, this.y + this.height - 10);
                curveVertex(this.x + this.width*2/5, this.y + this.height - 18);
                curveVertex(this.x + this.width*1/5, this.y + this.height - 10);
                curveVertex(this.x, this.y + this.height - 15);
                curveVertex(this.x, this.y)
                curveVertex(this.x + this.width, this.y)
                curveVertex(this.x + this.width, this.y)
            endShape();
        }
    }
    
    return pObj;
}
//-----------------------------------------------------------------------------------
//End of the Platform function - Factory Pattern
//-----------------------------------------------------------------------------------