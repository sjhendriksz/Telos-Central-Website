//-----------------------------------------------------------------------------------
// Create Wall Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createWall(wallWidth, wallHeight)
{
    wObj = {
        x1: worldSize.start,
        y1: floorPos_y - wallHeight,
        x2: worldSize.end+300,
        y2: floorPos_y - wallHeight,
        wallWidth: wallWidth,
        wallHeight: wallHeight,

        draw: function(){
            fill(150,75,75);
            strokeWeight(2);
            stroke(0);
            rect(this.x1, this.y1, this.wallWidth, this.wallHeight);
            rect(this.x2, this.y2, this.wallWidth, this.wallHeight);
            noFill();
            strokeWeight(1);
            var bricks = this.wallHeight/(this.wallWidth*1/3);
            for(var i = 0; i < bricks; i++)
            {
                if(i % 2 == 0){
                    rect(this.x1, this.y1 + i*this.wallWidth*1/3, this.wallWidth*2/3, this.wallWidth*1/3);
                    rect(this.x2, this.y2 + i*this.wallWidth*1/3, this.wallWidth*2/3, this.wallWidth*1/3);
                }
                else
                {
                    rect(this.x1+this.wallWidth*1/3, this.y1 + i*this.wallWidth*1/3, this.wallWidth*2/3, this.wallWidth*1/3);
                    rect(this.x2+this.wallWidth*1/3, this.y2 + i*this.wallWidth*1/3, this.wallWidth*2/3, this.wallWidth*1/3);
                }
                
            }
        }
    }
    return wObj;
}
//-----------------------------------------------------------------------------------
// End of the Create Wall Function - Factory Pattern
//-----------------------------------------------------------------------------------