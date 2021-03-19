// #################################################################
// Sketch
// #################################################################
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
var gallery;
var canvasBackgroundColour;
var c;
var canvasContainer;
var textSiz = null;

// #################################################################
// Preload function.
// #################################################################
function preload(){

}

// #################################################################
// Setup function.
// #################################################################
function setup() {

    // Create a canvas to fill the content div from index.html
    var canvasContainer = select('#canvasGrid');
    c = createCanvas(canvasContainer.width, canvasContainer.height);
    c.parent('#canvasGrid');
    c.center('vertical');
    
    // Calculate the textsize
    textSiz = (sqrt(width*height)*0.04);
    console.log("TextSize: " + textSiz);

    // Set the background colour
    canvasBackgroundColour = color(250);

    // Create a new gallery object.
    gallery = new Gallery();

    // Add the visualisation objects here.
    gallery.addVisual(new Welcome());
    gallery.addVisual(new VotingData());
    gallery.addVisual(new Game());
    gallery.addVisual(new MarketData());

    initializeStarupVisual();

}

// #################################################################
// Window resized function.
// #################################################################
function windowResized() {
    var canvasContainer = select('#canvasGrid');
    resizeCanvas(canvasContainer.width, canvasContainer.height);
}

// #################################################################
// Draw function.
// #################################################################
function draw() {
    background(canvasBackgroundColour);
    if (gallery.selectedVisual != null) {
        gallery.selectedVisual.draw();
    }
}

// #################################################################
// keyPressed function.
// #################################################################
function keyPressed(){
    // call the keyPressed function if it exists
    if(gallery.selectedVisual != null){
        if(gallery.selectedVisual.hasOwnProperty("keyPressed")){
            gallery.selectedVisual.keyPressed();
        }
    }
}

// #################################################################
// keyReleased function.
// #################################################################
function keyReleased(){
    // call the keyPressed function if it exists
    if(gallery.selectedVisual != null){
        if(gallery.selectedVisual.hasOwnProperty("keyReleased")){
            gallery.selectedVisual.keyReleased();
        }
    }
}

// #################################################################
// Mouse clicked function.
// #################################################################
function mouseClicked(){
    // call the mouseClicked function if it exists
    if(gallery.selectedVisual != null){
        if(gallery.selectedVisual.hasOwnProperty("mouseClicked")){
            gallery.selectedVisual.mouseClicked();
        }
    }

}


// #################################################################
// Mouse pressed function.
// #################################################################
function mousePressed(){
    // call the mouse Pressed function if it exists
    if(gallery.selectedVisual != null){
        if(gallery.selectedVisual.hasOwnProperty("mousePressed")){
            gallery.selectedVisual.mousePressed();
        }
    }
}

// #################################################################
// Mouse released function.
// #################################################################
function mouseReleased(){
    // call the mouse released function an all objects
    if(gallery.selectedVisual != null){
        if(gallery.selectedVisual.hasOwnProperty("mouseReleased")){
            gallery.selectedVisual.mouseReleased();
        }
    }

}

// #################################################################
// Mouse wheel function.
// #################################################################
function mouseWheel(){
    // call the Mouse wheel function if it exists
    if(gallery.selectedVisual != null){
        if(gallery.selectedVisual.hasOwnProperty("mouseWheel")){
            if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
                return(gallery.selectedVisual.mouseWheel());
            }
        }
    }
}

// #################################################################
// Mouse drag function.
// #################################################################
function mouseDragged(){
    // call the Mouse wheel function if it exists
    if(gallery.selectedVisual != null){
        if(gallery.selectedVisual.hasOwnProperty("mouseDragged")){
            if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
                return(gallery.selectedVisual.mouseDragged());
            }
        }
    }
}

// #################################################################
// Initialize visual function on startup.
// #################################################################
function initializeStarupVisual(){
    // call the gallery function to select the home page
    if(gallery.selectedVisual == null){
        gallery.selectVisual('Welcome-Animation');
        var el = select('#Welcome-Animation');
        el.addClass('selected');
    }
}

