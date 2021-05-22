var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,groundSprite;
var engine,world;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-30, width,20);
	groundSprite.shapeColor = "lightblue";


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0, isStatic:true});
	World.add(world, packageBody);
	
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100;
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor = "red";

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor = "red";

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+25, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxrightSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxrightSprite.shapeColor = "red";

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);

	 //Engine.run(engine);
	console.log(packageBody);
	keyPressed();
}


function draw() {
  //Engine.run(engine);
  Engine.update(engine);
  rectMode(CENTER);
  background(0);
 
  packageSprite.x= packageBody.position.x;
  packageSprite.y= packageBody.position.y;
  
  keyPressed();

  if(packageSprite.isTouching(boxBase)){
	  packageBody.position.x = packageSprite.x;
	  packageBody.position.y = packageSprite.y;
	  Matter.Body.setStatic(packageBody,true);
  }
  
  if(keyDown(RIGHT_ARROW)){
	helicopterSprite.x +=20;
	packageBody.position.x +=20;
}

if(keyDown(LEFT_ARROW)){
	helicopterSprite.x -=20;
	packageBody.position.x -=20;
}

  drawSprites();
}

function keyPressed(){

	if(keyDown("space") || keyDown(DOWN_ARROW)){
		Matter.Body.setStatic(packageBody,false);
	}
}