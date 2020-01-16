//var posX =500;
//var posY =500;
////Variables to refernce the positions of my character sprite
//
//
//
//function setup() 
//{
//    createCanvas(innerWidth,innerHeight);
//}
////this creates a plain canvas
//
//function draw()
//{
//    background(73,213,240);
////colours the bacground light blue
//    
//    strokeWeight(4);
//    stroke(51);
//    fill(230,230,230)
//    rect(0, height * 3/4, width, height/4); 
//Draws white ring/floor


//standing still sprite
//}

var posX ;
var posY ;

var floorPos_y;

var isLeft;      
var isRight;

var isPunching;

function setup()
{
    isLeft = false;
    isRight = false;
    isPunching = false;
    //    isJumping = false

    
    createCanvas(1024, 576);
    floorPos_y = height * 3/4;
    posX = width/2;
    posY = floorPos_y;
}

function draw()
{
    background(100,155,255); //fill the sky blue

    noStroke();
    fill(150,200,150);
    rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

//the game character

    if(isLeft)
    {
//Moving left code
 strokeWeight(3);
        stroke(50);
        fill(255);
        rect(posX-300, posY-150, 60, 50);
        fill(0);
        rect(posX-265, posY-130, 25, 20)
        fill(255);
        rect(posX-310, posY-20, 80, -80);
        fill(0,0,0);
        rect(posX-300, posY-20, 60, 20);
    
    }
    
    else if(isRight)
    {
//Moving right code
        strokeWeight(3);
        stroke(50);
        fill(255);
        rect(posX-300, posY-150, 60, 50);
        fill(0);
        rect(posX-265, posY-130, 25, 20)
        fill(255);
        rect(posX-310, posY-20, 80, -80);
        fill(0,0,0);
        rect(posX-300, posY-20, 60, 20);

    }
    
    else if(isPunching)
    {
//Punching right code
        strokeWeight(3);
        stroke(50);
        fill(255);
        rect(posX-300, posY-150, 60, 50);
        fill(0);
        rect(posX-265, posY-130, 25, 20)
        fill(255);
        rect(posX-310, posY-20, 80, -80);
        fill(255);
        rect(posX-290, posY-60, 100, -30);
        fill(0,0,0);
        rect(posX-300, posY-20, 60, 20);
    }
        
    else
    {
//Standing Sprite code
        strokeWeight(3);
        stroke(50);
        fill(255);
        rect(posX-300, posY-150, 60, 50);
        fill(0);
        rect(posX-265, posY-130, 25, 20)
        fill(255);
        rect(posX-310, posY-20, 80, -80);
        fill(0,0,0);
        rect(posX-300, posY-20, 60, 20);
    }
    
    if(isLeft == true)
    {
        posX -= 3;
    }
    
    if(isRight == true)
    {
        posX += 3;
    }
             
}

function keyPressed()
{
    // if statements to control the animation of the character when
    // keys are pressed.
      if(keyCode == LEFT_ARROW)
    {
       isLeft = true;
        console.log("left press");
    }
    
    if(keyCode == RIGHT_ARROW)
    {    
        isRight = true;
        console.log("right press");
    }
    
//    if(keyCode == A)
//    {
//        isPunching = true;
//        console.log("A press");
//    }

}
function keyTyped()
{
    if(key == 'a')
    {
        isPunching = true;
        console.log("a press");
    }
    else if(key !== 'a')
    {
        isPunching = false;
        console.log("no punching");
    }
}

function keyReleased()
{
    // if statements to control the animation of the character when
    // keys are released.
    {
    if(keyCode == LEFT_ARROW ) {
        isLeft = false;
        console.log("left release");
        }
    }
    
    {
    if(keyCode == RIGHT_ARROW ) {
        isRight = false;
        console.log("right release");
        }
    }
    
    {
    if(key == 'a'){
        isPunching = false;
        console.log("a release");
        }
    }

}