//-----------------------------------------------------------------------------------
// Create Flag Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createFlag(x)
{
    flagObj = {
        flagpole: {
            x_pos: x,
            y_pos: floorPos_y,
            size: 0.5,
            isReached: false
        },
        
        // Character colours
        tailColor: color(56,62,98), //Tail colour
        bodyLightColour: color(120,128,164), //Body colour light
        bodyDarkColour: color(86,92,128), //Body colour dark
        moustash: color(190,152,163),
        
        //Draw the flagpole.
        draw: function()
        {
            
            // Standing facing left
            noStroke();

            // Body, back part
            fill(this.tailColor);
            rect(this.flagpole.x_pos-20*this.flagpole.size, this.flagpole.y_pos-10*this.flagpole.size, 40*this.flagpole.size, 10*this.flagpole.size, 30*this.flagpole.size,0*this.flagpole.size,30*this.flagpole.size,0*this.flagpole.size);
            ellipse(this.flagpole.x_pos+10*this.flagpole.size, this.flagpole.y_pos-30*this.flagpole.size,50*this.flagpole.size,50*this.flagpole.size);

            // Arm, back side
            fill(this.tailColor);
            beginShape();
                curveVertex(this.flagpole.x_pos+18*this.flagpole.size, this.flagpole.y_pos-60*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-54*this.flagpole.size);

                curveVertex(this.flagpole.x_pos-10*this.flagpole.size, this.flagpole.y_pos-54*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-18*this.flagpole.size, this.flagpole.y_pos-59*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-12*this.flagpole.size, this.flagpole.y_pos-64*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-8*this.flagpole.size, this.flagpole.y_pos-60*this.flagpole.size);

                curveVertex(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-69*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+15*this.flagpole.size, this.flagpole.y_pos-84*this.flagpole.size);
            endShape();

            // Body, middle part
            fill(this.bodyLightColour);
            beginShape();
                curveVertex(this.flagpole.x_pos+30*this.flagpole.size, this.flagpole.y_pos+0*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+30*this.flagpole.size, this.flagpole.y_pos+0*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-5*this.flagpole.size, this.flagpole.y_pos-20*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+20*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+20*this.flagpole.size, this.flagpole.y_pos-20*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+20*this.flagpole.size, this.flagpole.y_pos-20*this.flagpole.size);
            endShape();

            // Tail Shadow.
            fill(0,0,0,50);
            beginShape();
                curveVertex(this.flagpole.x_pos+53*this.flagpole.size, this.flagpole.y_pos-18*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+63*this.flagpole.size, this.flagpole.y_pos-18*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+83*this.flagpole.size, this.flagpole.y_pos-23*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+88*this.flagpole.size, this.flagpole.y_pos-48*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+78*this.flagpole.size, this.flagpole.y_pos-78*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+83*this.flagpole.size, this.flagpole.y_pos-123*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+53*this.flagpole.size, this.flagpole.y_pos-98*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+38*this.flagpole.size, this.flagpole.y_pos-68*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+43*this.flagpole.size, this.flagpole.y_pos-38*this.flagpole.size);
            endShape(CLOSE);

            // Tail.
            fill(this.tailColor);
            beginShape();
                curveVertex(this.flagpole.x_pos+50*this.flagpole.size, this.flagpole.y_pos-20*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+60*this.flagpole.size, this.flagpole.y_pos-20*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+80*this.flagpole.size, this.flagpole.y_pos-25*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+85*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+75*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+80*this.flagpole.size, this.flagpole.y_pos-125*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+50*this.flagpole.size, this.flagpole.y_pos-100*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+35*this.flagpole.size, this.flagpole.y_pos-70*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+40*this.flagpole.size, this.flagpole.y_pos-40*this.flagpole.size);
            endShape(CLOSE);

            // Foot Front Shadow
            fill(0,0,0,50);
            rect(this.flagpole.x_pos+2*this.flagpole.size, this.flagpole.y_pos-10*this.flagpole.size, 40*this.flagpole.size, 10*this.flagpole.size, 30*this.flagpole.size,0*this.flagpole.size,30*this.flagpole.size,0*this.flagpole.size);

            // Foot Front
            fill(this.bodyDarkColour);
            rect(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-10*this.flagpole.size, 40*this.flagpole.size, 10*this.flagpole.size, 30*this.flagpole.size,0*this.flagpole.size,30*this.flagpole.size,0*this.flagpole.size);

            // Body Shadow.
            fill(0,0,0,50);
            beginShape();
                curveVertex(this.flagpole.x_pos+33*this.flagpole.size, this.flagpole.y_pos-3*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+33*this.flagpole.size, this.flagpole.y_pos-3*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+18*this.flagpole.size, this.flagpole.y_pos-10*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+9*this.flagpole.size, this.flagpole.y_pos-25*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+10*this.flagpole.size, this.flagpole.y_pos-40*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+23*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+21*this.flagpole.size, this.flagpole.y_pos-56*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+3*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);

                curveVertex(this.flagpole.x_pos-7*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-15*this.flagpole.size, this.flagpole.y_pos-55*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-9*this.flagpole.size, this.flagpole.y_pos-60*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-5*this.flagpole.size, this.flagpole.y_pos-56*this.flagpole.size);

                curveVertex(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-65*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+18*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+28*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+33*this.flagpole.size, this.flagpole.y_pos-70*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+48*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+58*this.flagpole.size, this.flagpole.y_pos-35*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+56*this.flagpole.size, this.flagpole.y_pos-20*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+48*this.flagpole.size, this.flagpole.y_pos-10*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+33*this.flagpole.size, this.flagpole.y_pos-5*this.flagpole.size);
            endShape();

            // Body, front side
            fill(this.bodyDarkColour);
            beginShape();
                curveVertex(this.flagpole.x_pos+30*this.flagpole.size, this.flagpole.y_pos-5*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+30*this.flagpole.size, this.flagpole.y_pos-5*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+15*this.flagpole.size, this.flagpole.y_pos-10*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+6*this.flagpole.size, this.flagpole.y_pos-25*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+7*this.flagpole.size, this.flagpole.y_pos-40*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+20*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+18*this.flagpole.size, this.flagpole.y_pos-56*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);

                curveVertex(this.flagpole.x_pos-10*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-18*this.flagpole.size, this.flagpole.y_pos-55*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-12*this.flagpole.size, this.flagpole.y_pos-60*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-8*this.flagpole.size, this.flagpole.y_pos-56*this.flagpole.size);

                curveVertex(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-65*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+15*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+25*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+30*this.flagpole.size, this.flagpole.y_pos-70*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+45*this.flagpole.size, this.flagpole.y_pos-50*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+55*this.flagpole.size, this.flagpole.y_pos-35*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+53*this.flagpole.size, this.flagpole.y_pos-20*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+45*this.flagpole.size, this.flagpole.y_pos-10*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+30*this.flagpole.size, this.flagpole.y_pos-5*this.flagpole.size);
            endShape();

            // Left Ear Outer Shadow
            fill(0,0,0,50);
            beginShape();
                curveVertex(this.flagpole.x_pos+9*this.flagpole.size, this.flagpole.y_pos-115*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+4*this.flagpole.size, this.flagpole.y_pos-135*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-135*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-7*this.flagpole.size, this.flagpole.y_pos-115*this.flagpole.size);
            endShape(CLOSE);

            // Left Ear Outer
            fill(this.bodyDarkColour);
            beginShape();
                curveVertex(this.flagpole.x_pos+7*this.flagpole.size, this.flagpole.y_pos-115*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+2*this.flagpole.size, this.flagpole.y_pos-135*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-2*this.flagpole.size, this.flagpole.y_pos-135*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-9*this.flagpole.size, this.flagpole.y_pos-115*this.flagpole.size);
            endShape(CLOSE);

            // Left Ear Inner
            fill(this.bodyLightColour);
            beginShape();
                curveVertex(this.flagpole.x_pos+5*this.flagpole.size, this.flagpole.y_pos-112*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+1*this.flagpole.size, this.flagpole.y_pos-130*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-1*this.flagpole.size, this.flagpole.y_pos-130*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-7*this.flagpole.size, this.flagpole.y_pos-112*this.flagpole.size);
            endShape(CLOSE);

            // Right Ear Outer Shadow
            fill(0,0,0,50);
            beginShape();
                curveVertex(this.flagpole.x_pos+26*this.flagpole.size, this.flagpole.y_pos-112*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+21*this.flagpole.size, this.flagpole.y_pos-134*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+17*this.flagpole.size, this.flagpole.y_pos-134*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+10*this.flagpole.size, this.flagpole.y_pos-112*this.flagpole.size);
            endShape(CLOSE);

            // Right Ear Outer
            fill(this.bodyDarkColour);
            beginShape();
                curveVertex(this.flagpole.x_pos+24*this.flagpole.size, this.flagpole.y_pos-112*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+19*this.flagpole.size, this.flagpole.y_pos-134*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+15*this.flagpole.size, this.flagpole.y_pos-134*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-112*this.flagpole.size);
            endShape(CLOSE);

            // Right Ear Inner
            fill(this.bodyLightColour);
            beginShape();
                curveVertex(this.flagpole.x_pos+22*this.flagpole.size, this.flagpole.y_pos-112*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+18*this.flagpole.size, this.flagpole.y_pos-129*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+15*this.flagpole.size, this.flagpole.y_pos-129*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+10*this.flagpole.size, this.flagpole.y_pos-112*this.flagpole.size);
            endShape(CLOSE);

            // Chin Shaddow
            fill(0,0,0,50);
            arc(this.flagpole.x_pos+6*this.flagpole.size, this.flagpole.y_pos-88*this.flagpole.size, 48*this.flagpole.size, 40*this.flagpole.size, 5, 185);

            // Chin
            fill(this.bodyLightColour);
            arc(this.flagpole.x_pos+6*this.flagpole.size, this.flagpole.y_pos-91*this.flagpole.size, 50*this.flagpole.size, 40*this.flagpole.size, 5, 185);
            ellipse(this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-91*this.flagpole.size, 20*this.flagpole.size, 15*this.flagpole.size);

            // Head Shadow
            fill(0,0,0,50);
            beginShape();
                curveVertex(this.flagpole.x_pos+7*this.flagpole.size, this.flagpole.y_pos-119*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+7*this.flagpole.size, this.flagpole.y_pos-119*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-10*this.flagpole.size, this.flagpole.y_pos-114*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-14*this.flagpole.size, this.flagpole.y_pos-99*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-19*this.flagpole.size, this.flagpole.y_pos-91*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-5*this.flagpole.size, this.flagpole.y_pos-89*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-94*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+20*this.flagpole.size, this.flagpole.y_pos-85*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+31*this.flagpole.size, this.flagpole.y_pos-87*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+27*this.flagpole.size, this.flagpole.y_pos-97*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+25*this.flagpole.size, this.flagpole.y_pos-113*this.flagpole.size);
            endShape(CLOSE);

            // Head
            fill(this.bodyDarkColour);
            beginShape();
                curveVertex(this.flagpole.x_pos+7*this.flagpole.size, this.flagpole.y_pos-120*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+7*this.flagpole.size, this.flagpole.y_pos-120*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-10*this.flagpole.size, this.flagpole.y_pos-115*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-14*this.flagpole.size, this.flagpole.y_pos-100*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-19*this.flagpole.size, this.flagpole.y_pos-92*this.flagpole.size);
                curveVertex(this.flagpole.x_pos-5*this.flagpole.size, this.flagpole.y_pos-90*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+20*this.flagpole.size, this.flagpole.y_pos-86*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+31*this.flagpole.size, this.flagpole.y_pos-88*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+27*this.flagpole.size, this.flagpole.y_pos-98*this.flagpole.size);
                curveVertex(this.flagpole.x_pos+25*this.flagpole.size, this.flagpole.y_pos-114*this.flagpole.size);
            endShape(CLOSE);

            // Moustash
            fill(200);
            beginShape();
            vertex(this.flagpole.x_pos+8, this.flagpole.y_pos-95*this.flagpole.size);

            bezierVertex(this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size, // Anchor Point 1
                        this.flagpole.x_pos+26*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size, // Bend Point
                        this.flagpole.x_pos+41*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size); // Anchor Point 2

            bezierVertex(this.flagpole.x_pos+41*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size, // Anchor Point 1
                        this.flagpole.x_pos+16*this.flagpole.size, this.flagpole.y_pos-60*this.flagpole.size, // Bend Point
                        this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size); // Anchor Point 2

            bezierVertex(this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size, // Anchor Point 1
                        this.flagpole.x_pos-10*this.flagpole.size, this.flagpole.y_pos-80*this.flagpole.size, // Bend Point
                        this.flagpole.x_pos-23*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size); // Anchor Point 2

            bezierVertex(this.flagpole.x_pos-23*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size, // Anchor Point 1
                        this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-60*this.flagpole.size, // Bend Point
                        this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size); // Anchor Point 2
            endShape();

            // Eyebrow right
            fill(200);
            beginShape();
            vertex(this.flagpole.x_pos+11*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size);

            bezierVertex(this.flagpole.x_pos+11*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size, // Anchor Point 1
                        this.flagpole.x_pos+24*this.flagpole.size, this.flagpole.y_pos-120*this.flagpole.size, // Bend Point
                        this.flagpole.x_pos+29*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size); // Anchor Point 2

            bezierVertex(this.flagpole.x_pos+29*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size, // Anchor Point 1
                        this.flagpole.x_pos+21*this.flagpole.size, this.flagpole.y_pos-110*this.flagpole.size, // Bend Point
                        this.flagpole.x_pos+11*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size); // Anchor Point 2
            endShape();

            // Eyebrow left
            beginShape();
            vertex(this.flagpole.x_pos+6*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size);

            bezierVertex(this.flagpole.x_pos+6*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size, // Anchor Point 1
                        this.flagpole.x_pos-7*this.flagpole.size, this.flagpole.y_pos-120*this.flagpole.size, // Bend Point
                        this.flagpole.x_pos-12*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size); // Anchor Point 2

            bezierVertex(this.flagpole.x_pos-12*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size, // Anchor Point 1
                        this.flagpole.x_pos-7*this.flagpole.size, this.flagpole.y_pos-110*this.flagpole.size, // Bend Point
                        this.flagpole.x_pos+6*this.flagpole.size, this.flagpole.y_pos-105*this.flagpole.size); // Anchor Point 2
            endShape();
            
            //Nose
            fill(0);
            ellipse(this.flagpole.x_pos+8*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size, 8*this.flagpole.size, 5*this.flagpole.size);
            noFill();
            stroke(0);

            /*// Right side of mouth
            //fill(this.moustash);
            arc(this.flagpole.x_pos+16*this.flagpole.size, this.flagpole.y_pos-94*this.flagpole.size, 16*this.flagpole.size, 20*this.flagpole.size, 90, 180);

            // Left side of mouth
            arc(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-95*this.flagpole.size, 16*this.flagpole.size, 20*this.flagpole.size, 0, 90);*/

            //Eyes
            noStroke();
            fill(250);
            ellipse(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-101*this.flagpole.size, 7*this.flagpole.size, 7*this.flagpole.size);
            ellipse(this.flagpole.x_pos+15*this.flagpole.size, this.flagpole.y_pos-100*this.flagpole.size, 7*this.flagpole.size, 7*this.flagpole.size);

            // Pupils
            fill(0);
            ellipse(this.flagpole.x_pos-1*this.flagpole.size, this.flagpole.y_pos-100*this.flagpole.size, 4*this.flagpole.size, 4*this.flagpole.size);
            ellipse(this.flagpole.x_pos+14*this.flagpole.size, this.flagpole.y_pos-99*this.flagpole.size, 4*this.flagpole.size, 4*this.flagpole.size);
            
            // Blink eyes every now and again
            if(timer % 11 == 0){
                fill(this.tailColor);
                ellipse(this.flagpole.x_pos+0*this.flagpole.size, this.flagpole.y_pos-101*this.flagpole.size, 7*this.flagpole.size, 7*this.flagpole.size);
                ellipse(this.flagpole.x_pos+15*this.flagpole.size, this.flagpole.y_pos-100*this.flagpole.size, 7*this.flagpole.size, 7*this.flagpole.size);
            }
            
        }
    }
    return flagObj;
}
//-----------------------------------------------------------------------------------
// End of the Create Flag Function - Factory Pattern
//-----------------------------------------------------------------------------------