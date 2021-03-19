//-----------------------------------------------------------------------------------
//Bear function - Constructor
//-----------------------------------------------------------------------------------
function Bear(bearX, bearY, left, right, speed, chargeDist){
        this.x = bearX;
        this.y = bearY;
        this.leftEdge = left;
        this.rightEdge = right;
        this.moveSpeed = speed;
        this.moveLeft = false;
        this.chargeSet = false;
        this.bearCharge = 0;
        this.chargeDistance = chargeDist;
    
        this.draw = function(){
            //Calculate the distance from any given bear to the Lego Man.
            var bearCharDist = int(dist(gameChar_world_x, squirrelObj.y, this.x, this.y));
            if(bearCharDist < 50 && playerDied == false)
            {
                catchByBear = true;
                squirrelObj.falling = true;
            }
            //Make the bear chase the character once close enough.
            if(gameChar_world_x < this.x && bearCharDist < this.chargeDistance && !this.chargeSet)
            {
                this.bearCharge = 2.5;
                this.moveLeft = true;
                this.chargeSet = true;
            }else if(gameChar_world_x > this.x && bearCharDist < this.chargeDistance && !this.chargeSet){
                this.bearCharge = 2.5;
                this.moveLeft = false;
                this.chargeSet = true;
            }
            else if(bearCharDist > this.chargeDistance+30 && this.chargeSet){
                this.bearCharge = 0;
                this.chargeSet = !this.chargeSet //reset the bear charge.
            }
            //Bear movement functions.
                //Move Left
                if(this.x < this.leftEdge + 30){
                    this.moveLeft = false;
                }
                //Move Right
                if(this.x > this.rightEdge - 30){
                    this.moveLeft = true;
                }
            
            if(this.moveLeft)
            {
                //Bear Spead
                if(catchByBear == false)
                {
                    this.x -= this.moveSpeed + this.bearCharge;
                }
                
                //Body
                stroke(0);
                strokeWeight(0.5);
                if(season == "winter" || season == "autumn"){fill(222,222,222);}else{fill("Sienna");}
                rect(this.x-20, this.y-42.5, 60, 40, 15);
                ellipse(this.x+45, this.y-22.5, 10, 10);

                //Head
                rect(this.x-44, this.y-52.5, 50, 40, 15);
                ellipse(this.x-30, this.y-60, 10, 15);
                ellipse(this.x-10, this.y-60, 10, 15);
                if(season == "winter" || season == "autumn"){fill(255,255,255);}else{fill(200,200,200);}
                ellipse(this.x-30, this.y-60, 5, 10);
                ellipse(this.x-10, this.y-60, 5, 10);
                rect(this.x-35, this.y-37.5, 30, 20, 10);
                fill(0,0,0);
                rect(this.x-30, this.y-32.5, 20, 10, 5);

                //Eyes
                if(timer%12 == 0)
                {
                    fill(0,0,0);
                    ellipse(this.x-30, this.y-42.5, 5, 1);
                    ellipse(this.x-10, this.y-42.5, 5, 1);
                }
                else
                {
                    ellipse(this.x-30, this.y-42.5, 5, 5);
                    ellipse(this.x-10, this.y-42.5, 5, 5);
                }

                //Legs
                if(timer%2 == 0)
                {
                    if(season == "winter" || season == "autumn"){fill(222,222,222);}else{fill("Sienna");}
                    ellipse(this.x-12, this.y-2.5, 10, 10);
                    line(this.x-10, this.y-2.5,this.x-7, this.y+2)
                    line(this.x-12, this.y-2.5,this.x-12, this.y+4)
                    line(this.x-14, this.y-2.5,this.x-17, this.y+2)
                    ellipse(this.x+23, this.y-2.5, 10, 10);
                    line(this.x+21, this.y-2.5,this.x+18, this.y+2)
                    line(this.x+23, this.y-2.5,this.x+23, this.y+4)
                    line(this.x+25, this.y-2.5,this.x+28, this.y+2)
                }else
                {
                    if(season == "winter" || season == "autumn"){fill(222,222,222);}else{fill("Sienna");}
                    ellipse(this.x-8, this.y-2.5, 10, 10);
                    line(this.x-6, this.y-2.5,this.x-3, this.y+2)
                    line(this.x-8, this.y-2.5,this.x-8, this.y+4)
                    line(this.x-10, this.y-2.5,this.x-13, this.y+2)
                    ellipse(this.x+27, this.y-2.5, 10, 10);
                    line(this.x+25, this.y-2.5,this.x+22, this.y+2)
                    line(this.x+27, this.y-2.5,this.x+27, this.y+4)
                    line(this.x+29, this.y-2.5,this.x+32, this.y+2)
                }
                
            }
            if(!this.moveLeft){
                //Bear speed.
                if(catchByBear == false)
                {
                    this.x += this.moveSpeed + this.bearCharge;
                }
                
                //Body
                stroke(0);
                strokeWeight(0.5);
                if(season == "winter" || season == "autumn"){fill(222,222,222);}else{fill("Sienna");}
                rect(this.x-40, this.y-42.5, 60, 40, 15);
                ellipse(this.x-45, this.y-22.5, 10, 10);

                //Head
                rect(this.x-6, this.y-52.5, 50, 40, 15);
                ellipse(this.x+10, this.y-60, 10, 15);
                ellipse(this.x+30, this.y-60, 10, 15);
                if(season == "winter" || season == "autumn"){fill(255,255,255);}else{fill(200,200,200);}
                ellipse(this.x+10, this.y-60, 5, 10);
                ellipse(this.x+30, this.y-60, 5, 10);
                rect(this.x+5, this.y-37.5, 30, 20, 10);
                fill(0,0,0);
                rect(this.x+10, this.y-32.5, 20, 10, 5);
                
                //Eyes
                if(timer%12 == 0)
                {
                    fill(0,0,0);
                    ellipse(this.x+10, this.y-42.5, 5, 1);
                    ellipse(this.x+30, this.y-42.5, 5, 1);
                }
                else
                {
                    ellipse(this.x+10, this.y-42.5, 5, 5);
                    ellipse(this.x+30, this.y-42.5, 5, 5);
                }

                //Legs
                if(timer%2 == 0)
                {
                    if(season == "winter" || season == "autumn"){fill(222,222,222);}else{fill("Sienna");}
                    ellipse(this.x+10, this.y-2.5, 10, 10);
                    line(this.x+12, this.y-2.5,this.x+15, this.y+2)
                    line(this.x+10, this.y-2.5,this.x+10, this.y+4)
                    line(this.x+8, this.y-2.5,this.x+5, this.y+2)
                    ellipse(this.x-25, this.y-2.5, 10, 10);
                    line(this.x-23, this.y-2.5,this.x-20, this.y+2)
                    line(this.x-25, this.y-2.5,this.x-25, this.y+4)
                    line(this.x-27, this.y-2.5,this.x-30, this.y+2)
                }else
                {
                    if(season == "winter" || season == "autumn"){fill(222,222,222);}else{fill("Sienna");}
                    ellipse(this.x+6, this.y-2.5, 10, 10);
                    line(this.x+8, this.y-2.5,this.x+11, this.y+2)
                    line(this.x+6, this.y-2.5,this.x+6, this.y+4)
                    line(this.x+4, this.y-2.5,this.x+1, this.y+2)
                    ellipse(this.x-29, this.y-2.5, 10, 10);
                    line(this.x-27, this.y-2.5,this.x-24, this.y+2)
                    line(this.x-29, this.y-2.5,this.x-29, this.y+4)
                    line(this.x-33, this.y-2.5,this.x-34, this.y+2)
                }
                
            }
        }
}
//-----------------------------------------------------------------------------------
//End of Bear Function - Factory Pattern
//-----------------------------------------------------------------------------------