//-----------------------------------------------------------------------------------
// Mountain Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createMountain(){
    mObj = {
        
        mountainArray: [],
        
        setup: function(mountainSize, amount, season){
            for(var i = 0; i < amount; i++)
            {
                var sections = (width+1000)/amount;
                var xPoint = -100 + i*sections;
                this.mountainArray.push({
                    x: xPoint,
                    size: random(mountainSize*1.25, mountainSize*2.25),
                    colour: color(random(50,125)),
                    snowColour: color(random(210,250))
                });
            }
        },
        draw: function()
        {
            for(var i = 0; i < this.mountainArray.length; i++)
            {
                
                if(season == "spring" || season == "autumn"){
                    // Rounded Mountain
                    fill(this.mountainArray[i].colour);
                    beginShape();
                        curveVertex(this.mountainArray[i].x+0 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+0 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+50 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+100 * this.mountainArray[i].size, floorPos_y-250 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+150 * this.mountainArray[i].size, floorPos_y-280 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+200 * this.mountainArray[i].size, floorPos_y-250 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+250 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+300 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+300 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                    endShape();

                    if(season == "autumn"){
                        // Rounded Mountain Snow
                        fill(this.mountainArray[i].snowColour);
                        beginShape();
                            curveVertex(this.mountainArray[i].x+49 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+49 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+98 * this.mountainArray[i].size, floorPos_y-251 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+150 * this.mountainArray[i].size, floorPos_y-280 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+202 * this.mountainArray[i].size, floorPos_y-251 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+251 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+200 * this.mountainArray[i].size, floorPos_y-200 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+150 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+100 * this.mountainArray[i].size, floorPos_y-180 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+50 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                            curveVertex(this.mountainArray[i].x+50 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                        endShape();
                    }

                    // Rounded Mountain Shadow
                    fill(0,0,0,50)
                    beginShape();
                        curveVertex(this.mountainArray[i].x+200 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+200 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+150 * this.mountainArray[i].size, floorPos_y-100 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+180 * this.mountainArray[i].size, floorPos_y-200 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+130 * this.mountainArray[i].size, floorPos_y-250 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+150 * this.mountainArray[i].size, floorPos_y-280 * this.mountainArray[i].size);

                        curveVertex(this.mountainArray[i].x+199 * this.mountainArray[i].size, floorPos_y-255 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+252 * this.mountainArray[i].size, floorPos_y-150 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+300 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                        curveVertex(this.mountainArray[i].x+300 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                    endShape();

                }
                else if(season == "summer" || season == "winter")
                {
                    // Pointy Mountain.
                    fill(this.mountainArray[i].colour);
                    beginShape();
                        vertex(this.mountainArray[i].x+0 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+150 * this.mountainArray[i].size, floorPos_y-250 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+300 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                    endShape();

                    if(season == "winter"){
                        // Pointy Mountain Snow.
                        fill(this.mountainArray[i].snowColour);
                        beginShape();
                            vertex(this.mountainArray[i].x+78 * this.mountainArray[i].size, floorPos_y-130 * this.mountainArray[i].size);
                            vertex(this.mountainArray[i].x+150 * this.mountainArray[i].size, floorPos_y-250 * this.mountainArray[i].size);
                            vertex(this.mountainArray[i].x+222 * this.mountainArray[i].size, floorPos_y-130 * this.mountainArray[i].size);

                            vertex(this.mountainArray[i].x+190 * this.mountainArray[i].size, floorPos_y-160 * this.mountainArray[i].size);
                            vertex(this.mountainArray[i].x+138 * this.mountainArray[i].size, floorPos_y-135 * this.mountainArray[i].size);
                            vertex(this.mountainArray[i].x+120 * this.mountainArray[i].size, floorPos_y-170 * this.mountainArray[i].size);
                            vertex(this.mountainArray[i].x+78 * this.mountainArray[i].size, floorPos_y-130 * this.mountainArray[i].size);
                        endShape();
                    }

                    // Pointy Mountain Shadow
                    fill(0,0,0,50)
                    beginShape();
                        vertex(this.mountainArray[i].x+150 * this.mountainArray[i].size, floorPos_y-250 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+126 * this.mountainArray[i].size, floorPos_y-210 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+160 * this.mountainArray[i].size, floorPos_y-170 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+135 * this.mountainArray[i].size, floorPos_y-130 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+170 * this.mountainArray[i].size, floorPos_y-90 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+135 * this.mountainArray[i].size, floorPos_y-50 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+170 * this.mountainArray[i].size, floorPos_y-0 * this.mountainArray[i].size);
                        vertex(this.mountainArray[i].x+300 * this.mountainArray[i].size, floorPos_y+0 * this.mountainArray[i].size);
                    endShape();
                }
                
            }
        }
    }
    return mObj;
}
//-----------------------------------------------------------------------------------
// End Mountain Function - Factory Pattern
//-----------------------------------------------------------------------------------