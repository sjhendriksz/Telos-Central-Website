//-----------------------------------------------------------------------------------
//Clouds Constructor Function
//-----------------------------------------------------------------------------------
function Clouds()
{
    this.cloudsArray = [];
    this.cloudShades = [];
    this.moveSpeed = [];
    this.setup = function(amount, size, shade)
    {
        for(var i = 0; i < amount; i++)
        {
            var v = createVector(random(worldSize.start,worldSize.end),int(random(0,gameHeight/4)), int(random(size,size*2)));
            this.cloudsArray.push(v);
                
            var s = random(0.05,0.25);
            this.moveSpeed.push(s);
                
            var c = int(random(shade-25,shade));
            this.cloudShades.push(c);
        }
    }
    this.moveClouds = function()
    {
        for(var j = 0; j < this.cloudsArray.length; j++)
        {
            // Draw clouds.
            noStroke();
            fill(100,100,100,100);
            ellipse(this.cloudsArray[j].x+this.cloudsArray[j].z/15, this.cloudsArray[j].y+this.cloudsArray[j].z/10, this.cloudsArray[j].z, this.cloudsArray[j].z*4/5);                                              //Middle
            ellipse(this.cloudsArray[j].x + (90*((this.cloudsArray[j].z*3/5)/100))+this.cloudsArray[j].z/10, this.cloudsArray[j].y+this.cloudsArray[j].z/15, this.cloudsArray[j].z*4/5, this.cloudsArray[j].z*3/5); //Right
            ellipse(this.cloudsArray[j].x - (90*((this.cloudsArray[j].z*3/5)/100))+this.cloudsArray[j].z/10, this.cloudsArray[j].y+this.cloudsArray[j].z/15, this.cloudsArray[j].z*4/5, this.cloudsArray[j].z*3/5); //Left
            
            fill(this.cloudShades[j],this.cloudShades[j],this.cloudShades[j],250);
            ellipse(this.cloudsArray[j].x, this.cloudsArray[j].y, this.cloudsArray[j].z, this.cloudsArray[j].z*4/5);                                                //Middle
            ellipse(this.cloudsArray[j].x + (90*((this.cloudsArray[j].z*3/5)/100)), this.cloudsArray[j].y, this.cloudsArray[j].z*4/5, this.cloudsArray[j].z*3/5);   //Right
            ellipse(this.cloudsArray[j].x - (90*((this.cloudsArray[j].z*3/5)/100)), this.cloudsArray[j].y, this.cloudsArray[j].z*4/5, this.cloudsArray[j].z*3/5);   //Left
            
            if(this.cloudsArray[j].x > worldSize.end+500){
                this.cloudsArray[j].x = worldSize.start-500;
            }
            else
            {
                this.cloudsArray[j].x += this.moveSpeed[j];
            }
        }
    }
}
//-----------------------------------------------------------------------------------
// End of Clouds Constructor Function
//-----------------------------------------------------------------------------------