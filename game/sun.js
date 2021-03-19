//-----------------------------------------------------------------------------------
// Sun Function - Factory Pattern
//-----------------------------------------------------------------------------------
function createSun(SunX, SunY, Size){
    sObj = {
        //Setup Function
        x: SunX,
        y: SunY,
        size: Size,
        colour: {
            red: 255,
            green: 255,
            blue: 0,
            alpha: 200
        },
        draw: function(){
            for(var i = 1; i < 6; i++)
            {
                var r = this.colour.red - this.colour.red*i/20;
                var g = this.colour.green - this.colour.green*i/20;
                var b = this.colour.blue;
                var a = this.colour.alpha - this.colour.alpha*i/5;
                fill(r, g, b, a);
                ellipse(this.x, this.y, this.size + this.size*i/3, this.size + this.size*i/3);
            }
        }
    }
    return sObj;
}  
//-----------------------------------------------------------------------------------
// End Sun Function - Factory Pattern
//-----------------------------------------------------------------------------------