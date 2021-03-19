//-----------------------------------------------------------------------------------
//Snake Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createSnake(snakeX, snakeY, leftEdge, rightEdge, moveSpeed, snakeSize)
{
    skObj = {
        x: snakeX,
        y: snakeY,
        size: snakeSize,
        leftEdge: leftEdge,
        rightEdge: rightEdge,
        moveSpeed: moveSpeed,
        moveLeft: true,
        moveRight: false,
        increaseSize: false,
        draw: function()
        {
            //Snake Movements
            if(this.x <= this.leftEdge+15)
            {
                this.moveRight = true;
                this.moveLeft = false;
            }
            else if(this.x >= this.rightEdge-15)
            {
                this.moveLeft = true;
                this.moveRight = false;
            }
            if(this.x > leftEdge && this.moveLeft)
            {
                this.x -= this.moveSpeed;
            }
            else if(this.x < rightEdge && this.moveRight)
            {
                this.x += this.moveSpeed;
            }
            
            if(this.size >= 1.5){
                this.increaseSize = false;
            }else if(this.size <= 0.5){
                this.increaseSize = true;
            }
            if(this.size < 1.5 && this.increaseSize == true){
                this.size += 0.015;
            }
            else if(this.size > 0.5 && this.increaseSize == false){
                this.size -= 0.015;
            }
            
            //Body
            stroke(0);
            strokeWeight(0.5);
            noFill();
            if(season == 'spring' || season == 'summer'){
                fill(20,20,20);
            }else{
                fill(75,75,75);
            }
            

            beginShape();
                curveVertex(this.x-20, (this.y+5));
                curveVertex(this.x, (this.y+5));
                curveVertex(this.x+20, (this.y+5));
                curveVertex(this.x+20, (this.y-2));
                curveVertex(this.x+10, (this.y-5));
                curveVertex(this.x, (this.y-8));
                curveVertex(this.x-11+(5*this.size), (this.y-10)+(5*this.size));
                curveVertex(this.x+12+(5*this.size), (this.y-15)+(5*this.size));
                curveVertex(this.x-4+(5*this.size), (this.y-20)+(5*this.size));     //Top Points - Head
                curveVertex(this.x-8+(5*this.size), (this.y-20)+(5*this.size));   //Top Points - Head
                curveVertex(this.x+1+(5*this.size), (this.y-16)+(5*this.size));
                curveVertex(this.x-21+(5*this.size), (this.y-10)+(5*this.size));
                curveVertex(this.x+10, (this.y));
                curveVertex(this.x-17, (this.y+2));
                curveVertex(this.x-20, (this.y+5))
                curveVertex(this.x, (this.y+5));
            endShape(CLOSE);

            //Head
            ellipse(this.x-6+(5*this.size), (this.y-25)+(5*this.size), 10, 15);

            //Eyes
            if(timer%10 == 0){
                fill(255,255,50);
                ellipse(this.x-8+(5*this.size), (this.y-26)+(5*this.size), 3, 1);
                fill(50,50,50);
                ellipse(this.x-8+(5*this.size), (this.y-26)+(5*this.size), 1, 1);
                fill(255,255,50);
                ellipse(this.x-4+(5*this.size), (this.y-26)+(5*this.size), 3, 1);
                fill(50,50,50);
                ellipse(this.x-4+(5*this.size), (this.y-26)+(5*this.size), 1, 1);
            }
            else
            {
                fill(255,255,50);
                ellipse(this.x-8+(5*this.size), (this.y-26)+(5*this.size), 3, 5);
                fill(50,50,50);
                ellipse(this.x-8+(5*this.size), (this.y-26)+(5*this.size), 1, 1);
                fill(255,255,50);
                ellipse(this.x-4+(5*this.size), (this.y-26)+(5*this.size), 3, 5);
                fill(50,50,50);
                ellipse(this.x-4+(5*this.size), (this.y-26)+(5*this.size), 1, 1);
            }
            
        }
        
    }
    return skObj
}
//-----------------------------------------------------------------------------------
//End of Snake Function - Factory Pattern
//-----------------------------------------------------------------------------------