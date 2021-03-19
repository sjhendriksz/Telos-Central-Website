//-----------------------------------------------------------------------------------
// Seasonal astetics
//-----------------------------------------------------------------------------------
function seasonalAstetics(){
    seObj = {
        seasonalArray: [],
        seasonalFlowers: [],
        
        // Create the flowers array.
        setup: function(){
            for(var i = 0; i < 50; i++){
                this.seasonalFlowers.push(createVector(random(worldSize.start - 500, worldSize.end + 500), random(floorPos_y+10, floorPos_y+50), random(4,6)));
            }
        },
        
        season: function(){
            
            //Colours to use
            var skyLayer1 = color(100, 155, 255);
            var layer1Ground = color(95,50,29);
            var layer2Ground = color(121,72,57);
            var layer3Ground = color(171,123,103);
            var grassOnTop = color(3,107,8);
            var flower1;
            var flower2;
            var flower3;
            
            // Sky & Grass colour will difer depending on the season.
            // Choose the colour for spring.
            if(season == "spring"){
                skyLayer1 = color(100, 155, 255);
                grassOnTop = color(0,150,0);
                platformColor = grassOnTop;
                flower1 = color(255,99,241);
                flower2 = color(89,12,232);
                flower3 = color(255,48,100);
            }
            // Choose the colours for summer.
            else if(season == "summer"){
                skyLayer1 = color(100, 155, 255);
                grassOnTop = color(3,107,8);
                platformColor = grassOnTop;
                flower1 = color(255,255,255);
                flower2 = color(250,150,150);
                flower3 = color(150,150,250);
            }
            // Choose the colour for autumn.
            else if(season == 'autumn'){
                skyLayer1 = color(90, 139, 230);
                grassOnTop = color(183,141,67);
                platformColor = grassOnTop;
                flower1 = color(200,200,200);
                flower2 = color(150,0,0);
                flower3 = color(0,0,150);
            }
            // Choose the colour for winter.
            else
            {
                skyLayer1 = color(76, 117, 194);
                grassOnTop = color(200,190,210);
                platformColor = grassOnTop;
                flower1 = color(0,200,0);
                flower2 = color(0,130,0);
                flower3 = color(0,50,0);
            }

            // Sky
            background(skyLayer1);

            // Layer 1 ground
            fill(layer1Ground);
            rect(-500, floorPos_y, worldSize.end + 1500, height-10);

            // Layer 2 ground
            fill(layer2Ground);
            beginShape();
                vertex(-500, floorPos_y)
                vertex(worldSize.end + 1500, floorPos_y);
                vertex(worldSize.end + 1500, floorPos_y+50);
                var pointX = worldSize.end + 1500;
                var count = (pointX/100)+5;
                for(var i = 0; i < count; i++){
                    if(i%2 == 1){
                        curveVertex(pointX-20, floorPos_y+210);
                    }else{
                        curveVertex(pointX-20, floorPos_y+180);
                    }
                    pointX = pointX - 100;
                }
            endShape(CLOSE);

            // Layer 3 ground
            fill(layer3Ground);
            beginShape();
                vertex(-500, floorPos_y)
                vertex(worldSize.end + 1500, floorPos_y);
                vertex(worldSize.end + 1500, floorPos_y+50);
                var pointX = worldSize.end + 1500;
                var count = (pointX/100)+5;
                for(var i = 0; i < count; i++){
                    if(i%2 == 1){
                        curveVertex(pointX+20, floorPos_y+140);
                    }else{
                        curveVertex(pointX+20, floorPos_y+110);
                    }
                    pointX = pointX - 100;
                }
            endShape(CLOSE);

            // Grass on top
            fill(grassOnTop);
            beginShape();
                vertex(-500, floorPos_y)
                vertex(worldSize.end + 1500, floorPos_y);
                vertex(worldSize.end + 1500, floorPos_y+50);
                var pointX = worldSize.end + 1500;
                var count = (pointX/100)+5;
                for(var i = 0; i < count; i++){
                    if(i%2 == 1){
                        curveVertex(pointX, floorPos_y+80);
                    }else{
                        curveVertex(pointX, floorPos_y+60);
                    }
                    pointX = pointX - 100;
                }
            endShape(CLOSE);
            
            // Flowers
            for(var i = 0; i < this.seasonalFlowers.length; i++){
                // Middle of the flower
                fill(255,255,0);
                ellipse(this.seasonalFlowers[i].x, this.seasonalFlowers[i].y, this.seasonalFlowers[i].z, this.seasonalFlowers[i].z);
                
                // Flower pedal colours
                if(i%3 == 0)
                {
                        fill(flower1);
                }
                else if(i%3 == 1)
                {
                        fill(flower2);
                }
                else if(i%3 == 2)
                {
                        fill(flower3);
                }
                
                // Draw the actual flower pedals
                // Left
                ellipse(this.seasonalFlowers[i].x-this.seasonalFlowers[i].z, this.seasonalFlowers[i].y, this.seasonalFlowers[i].z*1.5, this.seasonalFlowers[i].z);
                // Top
                ellipse(this.seasonalFlowers[i].x, this.seasonalFlowers[i].y-this.seasonalFlowers[i].z, this.seasonalFlowers[i].z, this.seasonalFlowers[i].z*1.5);
                // Right
                ellipse(this.seasonalFlowers[i].x+this.seasonalFlowers[i].z, this.seasonalFlowers[i].y, this.seasonalFlowers[i].z*1.5, this.seasonalFlowers[i].z);
                // Bottom
                ellipse(this.seasonalFlowers[i].x, this.seasonalFlowers[i].y+this.seasonalFlowers[i].z, this.seasonalFlowers[i].z, this.seasonalFlowers[i].z*1.5);
            }
        },
        
        // The Draw function
        draw: function(xPos){
            var leftSide;
            var rightSide;
            var centerPoint1;
            var centerPoint2;
            
            this.season();
        }
    }
    return seObj;
}
//-----------------------------------------------------------------------------------
// End of Seasonal astetics
//-----------------------------------------------------------------------------------
