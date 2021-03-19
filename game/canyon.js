//-----------------------------------------------------------------------------------
// Canyon Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createCanyon(){
    cObj = {
        //Setup Function
        canyon: [],
        stones: [],
        setup: function(amount,avgWidth)
        {
            var evenDis = (worldSize.start + worldSize.end)/amount;
            
            for(var i = 0; i < amount; i++){
                var pos = createVector((int(worldSize.start + 150 + evenDis*i)), gameHeight*1/2, int(random(avgWidth-10,avgWidth+10)));              
                //Don't initialize canyons under game character.
                var left = (width/2)-100;
                var right = (width/2)+100;
                while(left < pos.x && pos.x < right){
                    pos.x = pos.x + 200;
                    //console.log("Canyon initialized under char, new x coordinate: " + pos.x);
                }
                this.canyon.push(pos);
                this.stones.push([]);
            }
            
            for(var i = 0; i < this.canyon.length; i++)
                {
                    for(var j = 0; j < 10; j++)
                    {
                        var x = this.canyon[i].x + 10 + random(0, this.canyon[i].z-10);
                        var y = floorPos_y + 5 + random(0, gameHeight - floorPos_y - 30);
                        var z = random(1,5);
                        var stonePoints = createVector(x, y, z);
                        this.stones[i].push(stonePoints);
                    }
                }
        },
                
        //Draw Function
        drawCanyon: function(t_canyon)
        {
            //draw the canyon
            strokeWeight(1);
            noStroke();
            fill(154, 81, 40);
            rect(t_canyon.x, floorPos_y, t_canyon.z, gameHeight-floorPos_y-20, 0, 0, 10, 5);
            
            //shadow
            fill(0,0,0,80);
            triangle(t_canyon.x, floorPos_y,
                     t_canyon.x, gameHeight-20,
                     t_canyon.x+t_canyon.z/2, gameHeight-20);
            fill(0);
            for(var i = 0; i < this.stones.length; i++)
            {
                for(var j = 0; j < this.stones[i].length; j++){
                    ellipse(this.stones[i][j].x, this.stones[i][j].y, this.stones[i][j].z, this.stones[i][j].z);
                }
            }
        },
    }
    return cObj
}
//-----------------------------------------------------------------------------------
// Canyon Function - Factory Pattern
//-----------------------------------------------------------------------------------