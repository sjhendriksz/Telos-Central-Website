// #################################################################
// Side panel constructor function.
// #################################################################
function SidePanel(x, y, PanelWidth, PanelHeight)
{
    this.x = x;
    this.y = y;
    this.height = PanelHeight;
    this.width = PanelWidth;
    this.margin = 5;
    this.marginColour = color(255,255,255);
    this.canvas;
    this.icons = [];
    this.iconQty = 7;
    this.iconSelected = undefined;
    this.isLoaded = false;
    
    this.bubbleArray = [];
    this.histogramArray = [];
    this.radialArray = [];
    
    this.allBubblesInvisible = true;
    this.allHistogramBarsInvisible = true;
    this.allRadialBarsInvisible = true;
    
    // #################################################################
    // Setup function.
    // #################################################################
    this.setup = function()
    {
        if(this.isLoaded == false){
            // create the icons function createIcon(i, x, y, w, h, m)
            for(var i = 0; i < this.iconQty; i++){
                this.icons.push(new createIcon(i, this.x+this.margin/2,
                                               this.y+this.margin+(i*(this.height/this.iconQty)),
                                               this.width,
                                               (this.height/this.iconQty)-2*this.margin,
                                               this.margin));
            };
            this.isLoaded = true;
            
            // Set the dark background button to selected
            //canvasBackgroundColour = color(50);
            this.icons[5].isSelected = true;

        };
    };
    
    // #################################################################
    // Draw function.
    // #################################################################
    this.draw = function()
    {
        if(this.isLoaded){
            // Draw a dividing line
            push();
            stroke(this.marginColour);
            strokeWeight(3);
            line(this.x-this.margin, this.y, this.x-this.margin, this.y+this.height+this.margin);
            pop();
            
            // Make Icons to represent the different charts
            // Draw the chart icons
            for(var i = 0; i < this.icons.length; i++){
               this.icons[i].draw();
            }
            
            // Check the visibilities of all the objects
            this.checkVisibility(this.bubbleArray, this.histogramArray, this.radialArray);
        }
    };
    
    // #################################################################
    // Check visibility function.
    // #################################################################
    this.checkVisibility = function(bubbles, histogramBars, radialBars)
    {
        if(this.iconSelected != undefined)
        {
            // Cause a time delay when moving from the histogram to any other function.
            // This way the histogram bars have time to move down and don't overlap the bubbles.
            if(this.iconSelected == 0 || this.iconSelected == 1 || this.iconSelected == 2 || this.iconSelected == 3 || this.iconSelected == 4  || this.iconSelected == 5 || this.iconSelected == 6){
                // count the number of bars that have visibility set to false
                var bCount = 0;
                var hCount = 0;
                var rCount = 0;

                // Itterate through all the objects and count the visible properties of all.
                for(var i = 0; i < bubbles.length; i++){
                    
                    // bubble visibility count
                    if(bubbles[i].visible == false){
                        bCount += 1;
                    }
                    
                    // histogram bars visibility count
                    if(histogramBars[i].visible == false){
                        hCount += 1;
                    }
                    
                    // radial bars visibility count
                    if(radialBars[i].visible == false){
                        rCount += 1;
                    }
                    
                }

                // If the count and the array length is the same, all are invisible.
                // Check bubble count
                if(bCount == bubbles.length){
                    this.allBubblesInvisible = true;
                }
                else
                {
                    this.allBubblesInvisible = false;
                }
                
                // Check histogram bars count
                if(hCount == histogramBars.length){
                    this.allHistogramBarsInvisible = true;
                }
                else
                {
                    this.allHistogramBarsInvisible = false;
                }
                
                // Check radial bar count
                if(rCount == radialBars.length){
                    this.allRadialBarsInvisible = true;
                }
                else
                {
                    this.allRadialBarsInvisible = false;
                }
                
            }
        }
        
    }
    
    // #################################################################
    // Mouse clicked function.
    // #################################################################
    this.mouseClicked = function(bubbles, histogramBars, radialBars){
        
        this.bubbleArray = bubbles;
        this.histogramArray = histogramBars;
        this.radialArray = radialBars;
        
        // Call the mouseclicked function on the side control panel icons.
        // First iterate through the icons and get the currently seleted index number.
        // The index number will then be compared to the one that's clicked to prevent the same function from running again on the
        // currently selected icon.
        if(this.icons.length != 0){
                                
            // If no icon is selected, run the mouseclick method.
            if(this.iconSelected == undefined){
                for(var i = 0; i < this.iconQty; i++){
                    // Set the icons to unselected, only when the mouse is clicked on one of the icons.
                    if(mouseX > this.icons[i].x && mouseX < this.icons[i].x+this.icons[i].w && mouseY > this.icons[i].y && mouseY < this.icons[i].y + this.icons[i].h){
                        // Run the mouse clicked method in the constructor function where the icon will selected.
                        this.icons[i].mouseClicked(bubbles, histogramBars);
                    }
                }
            }
            
            // Here we only want to run the method, if a different icon is selected.
            else
            {
                for(var i = 0; i < this.iconQty; i++){
                    // Set the icons to unselected, only when the mouse is clicked on one of the icons.
                    if(mouseX > this.icons[i].x && mouseX < this.icons[i].x+this.icons[i].w && mouseY > this.icons[i].y && mouseY < this.icons[i].y + this.icons[i].h){
                        //console.log("Panel index: " + i);
                        if(i >= 0 && i <= 4){
                            // Only run the mouseclicked methods if a different icon than the currently selected one is clicked.
                            if(this.iconSelected != i){
                                // Set all icons to unselected.
                                for(var j = 0; j < this.iconQty-2; j++){
                                    this.icons[j].isSelected = false;
                                }
                                // Run the mouse clicked method in the constructor function where the icon will selected.
                                this.icons[i].mouseClicked(bubbles, histogramBars);
                            }
                        }
                        else if(i == 5){
                            this.icons[i].mouseClicked();
                            this.icons[6].isSelected = false;
                            
                            //Make changes to the colour scheme of the radial chart
                            for(var j = 0; j < this.radialArray.length; j++){
                                this.radialArray[j].hoverColour = color(0);
                            }
                        
                            
                        }
                        else if(i == 6){
                            this.icons[i].mouseClicked();
                            this.icons[5].isSelected = false;
                            
                            //Make changes to the colour scheme of the radial chart
                            for(var j = 0; j < this.radialArray.length; j++){
                                this.radialArray[j].hoverColour = color(250);
                            }
                        }
                        
                    }
                }   
            }
            
            // Keep track of which icon is selected
            for(var k = 0; k < this.iconQty; k++){
                if(this.icons[k].isSelected){
                    this.iconSelected = k;
                }
            }
            
            // Change the colour scheme
            if(this.icons[5].isSelected == true){
                this.marginColour = color(50);
                canvasBackgroundColour = color(250);
            }
            else if(this.icons[6].isSelected == true)
            {
                this.marginColour = color(250);
                canvasBackgroundColour = color('#100B00');
            }
            
        }
        
    };
     
}