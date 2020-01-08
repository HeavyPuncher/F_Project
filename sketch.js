function setup() 
{
    createCanvas(innerWidth,innerHeight);
}
//this creates a plain canvas

function draw()
{
    background(73,213,240);
//colours the bacground light blue
    
    strokeWeight(4);
    stroke(51);
    fill(230,230,230)
    rect(0, height * 3/4, width, height/4); 
//Draws white ring/floor
}