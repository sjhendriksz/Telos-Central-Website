//-----------------------------------------------------------------------------------
// Create Tree Function - Factory Pattern
//-----------------------------------------------------------------------------------
function initTrees(amount, size, season){
    if(treesArray.length != 0){
        var arrayVal = treesArray.length;
        for(var i = 0; i < arrayVal; i++){
            treesArray.pop();
        }
    }
        
    //Generate all the trees and push them into the TreesArray.
    for(var i = 0; i < amount; i++)
    {
        //A Tree should not be positioned over a canyon or be positioned within 150 px of another tree.
        var randomX = int(random(worldSize.start + 100, worldSize.end));
        for(var m = 0; m < canyonObj.canyon.length; m++){
            
            var canyonLeftEdge = canyonObj.canyon[m].x - 75;
            var canyonRightEdge = canyonObj.canyon[m].x + canyonObj.canyon[m].z + 15;
            
            if(treesArray.length == 0){
                if((canyonLeftEdge < randomX) && (randomX < canyonRightEdge))
                {
                    break;
                }
                else
                {
                    treesObj = createTree(randomX, floorPos_y, random(size, size*1.75), int(random(1, 3)));
                    treesObj.setup(season);
                    treesArray.push(treesObj);
                }
            }
            
            for(var n = 0; n < treesArray.length; n++)
            {
                var treeLeftEdge = treesArray[n].x - 50;
                var treeRightEdge = treesArray[n].x + 75;
                
                while(((canyonLeftEdge < randomX) && (randomX < canyonRightEdge)) || ((treeLeftEdge < randomX) && (randomX < treeRightEdge)))
                {
                    randomX = int(random(worldSize.start + 200, worldSize.end-200));
                    
                    // Recheck the tree X postion before pushing.
                    if(((canyonLeftEdge < randomX) && (randomX < canyonRightEdge)) || ((treeLeftEdge < randomX) && (randomX < treeRightEdge))){
                        continue;
                    }
                    else
                    {
                        break;
                    }
                }
            }
        }
        
        treesObj = createTree(randomX, floorPos_y, random(size, size*1.75), int(random(1, 3)));
        treesObj.setup(season);
        treesArray.push(treesObj);
        
    }
    
}

function createTree(x, y, size, type){
treeObj = {
        x: x,
        y: y,
        size: size,
        type: type,
        
        colour1: color(166, 81, 40), // Dark stump colour
        colour2: color(233, 155, 73), // Line colours accross the treestumps
        holeColour: color(50, 30, 50),
        leavePositions: [],
        treesDetails: [],
        
        //Setup function.
        setup: function(season){
            
            // Leaves
                var angle = 20;
                for(var l = 0; l < 160/angle + 1; l++){
                    
                    var leaveSize = random(30 * this.size, 35 * 3 * this.size);
                    var leaves = createVector(this.x + 20 * this.size + (random(60,100) * this.size) * sin(100+angle*l),
                                              this.y - 235 * this.size + (random(60,100) * this.size) * cos(100+angle*l),
                                              leaveSize);
                    this.leavePositions.push(leaves);
                    
                    var leaveSize = random(30 * this.size, 35 * this.size * 3);
                    var leaves1 = createVector(this.x + 20*this.size + (random(30,60) * this.size) * sin(100+angle*l),
                                               this.y - 235 * this.size + (random(30,60) * this.size) * cos(100+angle*l),
                                               leaveSize);
                    this.leavePositions.push(leaves1);
                    
                    var s
                    if(season == "spring"){
                        s = {
                            red: 50,
                            green: int(random(200,255)),
                            blue: 50,
                            alpha: 200
                        };
                    }
                    else if(season == "summer"){
                        s = {
                            red: 50,
                            green: int(random(100,205)),
                            blue: 50,
                            alpha: 200
                        };
                    }
                    else if(season == "autumn")
                    {
                        s = {
                            red: int(random(100,200)),
                            green: int(random(100,200)),
                            blue: 50,
                            alpha: 200
                        }; 
                    }
                    else if(season == "winter")
                    {
                        s = {
                            red: int(random(200,250)),
                            green: int(random(200,250)),
                            blue: int(random(200,250)),
                            alpha: 200
                        }; 
                    }
                    this.treesDetails.push(s);
                    this.treesDetails.push(s);
                }
            
        }, // End of the Setup function
            
        
        // Draw the tree function
        draw: function(){
            
            noFill();
            stroke(0);
            strokeWeight(1);

            // Treetype 1
            fill(166, 81, 40);
            beginShape();
            //Left half of the tree
                vertex(this.x +0 * this.size, this.y +0 * this.size);
                vertex(this.x +0 * this.size, this.y - 135 * this.size);
                bezierVertex(this.x +0 * this.size, this.y - 135 * this.size, this.x - 18 * this.size, this.y - 150 * this.size, this.x-17 * this.size, this.y - 180 * this.size);
                vertex(this.x-50 * this.size, this.y - 250 * this.size);
                vertex(this.x-43 * this.size, this.y - 250 * this.size);
                vertex(this.x-18 * this.size, this.y - 195 * this.size);
                vertex(this.x-20 * this.size, this.y - 250 * this.size);
                vertex(this.x-12 * this.size, this.y - 250 * this.size);
                bezierVertex(this.x-12 * this.size, this.y - 230 * this.size, this.x - 15 * this.size, this.y - 160 * this.size, this.x +0 * this.size, this.y - 155 * this.size);
                vertex(this.x +0 * this.size, this.y - 270 * this.size);

            //Right half of the tree
                vertex(this.x + 35 * this.size, this.y - 270 * this.size);
                vertex(this.x + 35 * this.size, this.y - 205 * this.size);
                bezierVertex(this.x + 35 * this.size, this.y - 205 * this.size, this.x + 40 * this.size, this.y - 210 * this.size, this.x + 55 * this.size, this.y - 212 * this.size);
                bezierVertex(this.x + 55 * this.size, this.y - 212 * this.size, this.x + 45 * this.size, this.y - 220 * this.size, this.x + 45 * this.size, this.y - 250 * this.size);
                vertex(this.x + 50 * this.size, this.y - 250 * this.size);
                bezierVertex(this.x + 50 * this.size, this.y - 250 * this.size, this.x + 50 * this.size, this.y - 230 * this.size, this.x + 60 * this.size, this.y - 215 * this.size);
                bezierVertex(this.x + 60 * this.size, this.y - 215 * this.size, this.x + 80 * this.size, this.y - 230 * this.size, this.x + 80 * this.size, this.y - 250 * this.size);
                vertex(this.x + 90 * this.size, this.y - 250 * this.size);
                bezierVertex(this.x + 90 * this.size, this.y - 250 * this.size, this.x + 80 * this.size, this.y - 200 * this.size, this.x + 35 * this.size, this.y - 190 * this.size);
                vertex(this.x + 35 * this.size, this.y +0 * this.size);
                vertex(this.x +0 * this.size, this.y +0 * this.size);
            endShape();

            noStroke();

            if(this.type == 1 || this.type == 3){
                // Stripes over the trees.
                fill(233, 155, 73);
                quad(this.x +1 * this.size, this.y - 10 * this.size, this.x +1 * this.size, this.y - 20 * this.size, this.x + 34 * this.size, this.y - 25 * this.size, this.x + 34 * this.size, this.y -15 * this.size);
                quad(this.x +1 * this.size, this.y - 60 * this.size, this.x +1 * this.size, this.y - 70 * this.size, this.x + 34 * this.size, this.y - 65 * this.size, this.x + 34 * this.size, this.y -55 * this.size);
                quad(this.x +1 * this.size, this.y - 110 * this.size, this.x +1 * this.size, this.y - 120 * this.size, this.x + 34 * this.size, this.y - 125 * this.size, this.x + 34 * this.size, this.y -115 * this.size);
                quad(this.x +1 * this.size, this.y - 160 * this.size, this.x +1 * this.size, this.y - 170 * this.size, this.x + 34 * this.size, this.y - 165 * this.size, this.x + 34 * this.size, this.y -155 * this.size);
                quad(this.x +1 * this.size, this.y - 200 * this.size, this.x +1 * this.size, this.y - 210 * this.size, this.x + 34 * this.size, this.y - 220 * this.size, this.x + 34 * this.size, this.y -210 * this.size);
            }
            if(this.type == 2 || this.type == 3){
                stroke(0);
                fill(this.holeColour);
                ellipse(this.x + 16 * this.size, this.y - 130 * this.size, 14 * this.size, 28 * this.size);
            }

            noStroke();

            // Shadow 1
            fill(50,50,50,50);
            beginShape();
            //Left half of the tree
                vertex(this.x +0 * this.size, this.y +0 * this.size);
                vertex(this.x +0 * this.size, this.y - 135 * this.size);
                bezierVertex(this.x +0 * this.size, this.y - 135 * this.size, this.x - 18 * this.size, this.y - 150 * this.size, this.x-17 * this.size, this.y - 180 * this.size);
                vertex(this.x-50 * this.size, this.y - 250 * this.size);
                vertex(this.x-43 * this.size, this.y - 250 * this.size);
                vertex(this.x-18 * this.size, this.y - 195 * this.size);
                vertex(this.x-20 * this.size, this.y - 250 * this.size);
                vertex(this.x-12 * this.size, this.y - 250 * this.size);
                bezierVertex(this.x-12 * this.size, this.y - 230 * this.size, this.x - 15 * this.size, this.y - 160 * this.size, this.x +0 * this.size, this.y - 155 * this.size);
                vertex(this.x +0 * this.size, this.y - 270 * this.size);

            //Right half of the tree
                vertex(this.x + 30 * this.size, this.y - 270 * this.size);
                bezierVertex(this.x + 35 * this.size, this.y - 270 * this.size,
                             this.x + 10 * this.size, this.y - 200 * this.size,
                             this.x + 35 * this.size, this.y - 0 * this.size);
            endShape();

            // Shadow 2
            fill(50,50,50,50);
            beginShape();
            //Left half of the tree
            vertex(this.x +0 * this.size, this.y +0 * this.size);
                vertex(this.x +0 * this.size, this.y - 135 * this.size);
                bezierVertex(this.x +0 * this.size, this.y - 135 * this.size, this.x - 18 * this.size, this.y - 150 * this.size, this.x-17 * this.size, this.y - 180 * this.size);
                vertex(this.x-50 * this.size, this.y - 250 * this.size);
                vertex(this.x-43 * this.size, this.y - 250 * this.size);
                vertex(this.x-18 * this.size, this.y - 195 * this.size);
                vertex(this.x-20 * this.size, this.y - 250 * this.size);
                vertex(this.x-12 * this.size, this.y - 250 * this.size);
                bezierVertex(this.x-12 * this.size, this.y - 230 * this.size, this.x - 15 * this.size, this.y - 160 * this.size, this.x +0 * this.size, this.y - 155 * this.size);
                vertex(this.x +0 * this.size, this.y - 270 * this.size);

            vertex(this.x + 20 * this.size, this.y - 270 * this.size);
            bezierVertex(this.x + 20 * this.size, this.y - 270 * this.size,
                             this.x + 0 * this.size, this.y - 210 * this.size,
                             this.x + 20 * this.size, this.y - 0 * this.size);
            endShape();

            //Draw the leaves.
            noStroke();
            for(var j = 0; j < this.leavePositions.length; j++)
            {
                fill(this.treesDetails[j].red, this.treesDetails[j].green, this.treesDetails[j].blue, this.treesDetails[j].alpha);
                ellipse(this.leavePositions[j].x, this.leavePositions[j].y, this.leavePositions[j].z, this.leavePositions[j].z);
            }

            
        } // End of the Draw Function
    } // End of the object
    return treeObj;
}
//-----------------------------------------------------------------------------------
// End of Create Tree Function - Factory Pattern
//-----------------------------------------------------------------------------------