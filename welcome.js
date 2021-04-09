// ####################################
// Welcome page constructor function
// ####################################
function Welcome(){
    // Name for the visualisation to appear in the menu bar.
    // this.name = '<i class="gg-home-alt"></i>Home';
    this.name = '<i class="fas fa-home fa-lg navicons"></i>Home';

    // Each visualisation must have a unique ID with no special
    this.id = 'Welcome-Animation';

    // Title to display above the plot.
    this.title = 'Welcome to Telos Central';
    
    // Position and radius
    this.midpoint = createVector(0, 0);
    this.radius = 200;
    this.shapePoints = [];
    this.linePoints = [];
    this.lines = [];
    this.strokeSize = 3;
    this.lerpNum = 0.01;
    this.tanslate = createVector(width/2, height/2);
    this.scale = 1;
    
    // Booleans
    this.step2 = false;
    this.welcomeMessage = false;
    
    // Colour
    this.logoBackground = color(220);
    
    // Welcome message
    var opac = 0;
    this.welcomeM = {
        font: 'Georgia',
        text: "Welcome to EOSio Central.",
        textS: textSiz*1.5,
        colour: color(50,50,50,0)
    }
    
    // ####################################
    // Setup method
    // ####################################
    this.setup = function(){
        
        // Calculate the radius based on the canvas size
        if(width < height){
            this.radius = width/2 * 0.8;
        }else{
            this.radius = height/2 * 0.8;
        }

        // Calculate the stroke Width based on the logo size
        this.strokeSize = this.radius * 0.025;
        
        // Setup the Logo points to be drawn
        angleMode(DEGREES);
        var angleNum = 60;
        var angle = angleNum;
        var angOffset = 90 - angle;
        var itterations = 360/angle;
        
        // Push the points to the array
        for(var i = 0; i < itterations; i++){
            // Calculate the x and y positions
            var xPos = this.midpoint.x + cos(angle+angOffset)*this.radius;
            var yPos = this.midpoint.y + sin(angle+angOffset)*this.radius;
            
            // Push the calculated points to the array for the shape
            var logoPoints = createVector(xPos, yPos);
            this.shapePoints.push(logoPoints);

            angle += angleNum;
        }
        
        // Line 1: 70 and 200
        this.lines.push(new Line(70, 200, this.radius, this.strokeSize, this.midpoint));
        
        // Line 2: 110 and 310
        this.lines.push(new Line(110, 310, this.radius, this.strokeSize, this.midpoint));
        
        // Line 3: 130 and 280
        this.lines.push(new Line(130, 280, this.radius, this.strokeSize, this.midpoint));
        
        // Line 4: 40 and 250
        this.lines.push(new Line(40, 250, this.radius, this.strokeSize, this.midpoint));
        
        // Line 5: 70 and 350
        this.lines.push(new Line(70, 350, this.radius, this.strokeSize, this.midpoint));
        
        this.mouseClicked();

    }
    
    // ####################################
    // Draw method
    // ####################################
    this.draw = function(){
        
        push();
        translate(this.tanslate.x, this.tanslate.y);
        scale(this.scale);
        
        // Draw the surrounding circle
        stroke(50);
        strokeWeight(this.strokeSize);
        fill(this.logoBackground);
        ellipse(this.midpoint.x, this.midpoint.y, this.radius*2 + (this.radius*0.2));
        
        // Draw the hectagon symbol for the logo
        noStroke();
        fill(50);
        beginShape();
        for(var i = 0; i < this.shapePoints.length; i++){
            vertex(this.shapePoints[i].x, this.shapePoints[i].y);         
        }
        endShape();

        // Draw the lines going through the logo.
        for(var i = 0; i < this.lines.length; i++){
            this.lines[i].draw();
            this.lines[i].update();
        }
        
        if(this.welcomeMessage == true){
            noStroke();
            fill(this.welcomeM.colour);
            textSize(this.welcomeM.textS);
            textFont(this.welcomeM.font);
            textAlign(CENTER, CENTER);
            text(this.welcomeM.text, this.midpoint.x, this.midpoint.y + this.radius + this.radius*0.4);
        }
        
        pop();
        
        // Monitor step 1, animation.
        if(!this.step2){
            this.monitorAnamation1();
        }else{
            this.animation2();
        }
        
    }
    
    // ####################################
    // Monitor first animation method
    // ####################################
    this.monitorAnamation1 = function(){
        
        var count = 0;
        for(var i = 0; i < this.lines.length; i++){
            if(this.lines[i].finished == true){
                count += 1;
            }
        }
        
        if(count == this.lines.length){
            this.step2 = true;
        }
        
    }
    
    // ####################################
    // Second animation method
    // ####################################
    this.animation2 = function(){
        
        // Reduce the logo size and move to the left
        if(this.scale > 0.8){
            this.scale -= 0.005;
            this.tanslate.y = this.tanslate.y * 0.995;
        }
        // Then add the EOSio text and welcome message.
        else{
            this.welcomeMessage = true;
            if(opac < 255){
                opac += 2.5;
                this.welcomeM.colour = color(50,50,50,opac);
            }
        }

    }
    
    // ####################################
    // Mouse Click method
    // ####################################
    this.mouseClicked = function(){
        // Display the following information when the page start up and the home button is selected.
        if(gallery.selectedVisual.id == "Welcome-Animation")
        {
              var chartHeading = "Welcome to the EOSio Central portal.";
              var chartInfo = "We're striving to create a central portal of information on all things related to EOSio based blockchains. \
              <br><br> \
              Stating that things in the blockchain space move at lightning speed is a gross understatement and keeping up with all the latest developments is quite difficult and could be overwhelming for those truly interested in being up to date. We aim to make it a little easier by gathering and compiling all that information in a central portal that is easy to use and filled with useful information and links to everything in the ecosystem. \
              <br><br> \
              This is not an easy task though, so if you notice anything missing, feel free to contact us and we'll make the necessary updates.";

              var htmlP = select('#chartInfo');
              htmlP.html(chartInfo);

              var htmlH3 = select('#chartInfoHeading');
              htmlH3.html(chartHeading);
        }
    }

}

// ####################################
// Line constructor function
// ####################################
function Line(startAng, endAng, radius, lineWidth, midpoint){
    
    this.midpoint = midpoint;
    this.startPoint = createVector(this.midpoint.x + cos(startAng)*radius, this.midpoint.y + sin(startAng)*radius);
    this.endPoint = createVector(this.midpoint.x + cos(endAng)*radius, this.midpoint.y + sin(endAng)*radius);
    this.linePos = createVector(this.startPoint.x, this.startPoint.y);
    this.lineWidth = lineWidth;
    this.velocity = random(4,7);
    this.finished = false;
    
    // Draw method
    this.draw = function(){
        stroke(255);
        strokeWeight(this.lineWidth);
        line(this.startPoint.x, this.startPoint.y, this.linePos.x, this.linePos.y);
    }
    
    // Update method
    this.update = function(){
        
        // Only run this code until the animation part is finished.
        if(this.finished == false){
            // Check the distance between the two vectors
            var dir = p5.Vector.sub(this.endPoint, this.startPoint);
            dir.normalize();
            dir.mult(this.velocity);

            var dist = this.linePos.dist(this.endPoint);
            
            // Increase line length until endpoint is reached.
            if(dist > this.velocity+1){
                this.linePos.add(dir);
            }
            else{
                this.finished = true;
            }
        }
        
    }
    
}