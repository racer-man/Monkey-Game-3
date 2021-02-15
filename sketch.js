var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImg, bananaGroup;
var rock, rockImg, rockGroup;

var score;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
}

function setup() {
  createCanvas(1600,900);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=3.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-14;
  
  player = createSprite(100,791,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(700,900,2050,100);
  ground.x=ground.width/2;
  ground.shapeColor = "green";

  bananaGroup = new Group();
  rockGroup = new Group();
  score = 0;
}

function draw() { 
  background(0);
  console.log(player.y);

  if(gameState===PLAY){

    spawnFriut();
    spawnRock();

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -25;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(bananaGroup.isTouching(player)){
      score = score+1;
      bananaGroup.destroyEach();
      player.scale += + 0.1;
    }

    if(player.scale === 0.5){
      player.scale === 0.1;
    }

    if(rockGroup.isTouching(player) && player.scale > 0.1){
      gameState === END;
    }
  }else if(gameState === END){
    bananaGroup.setVelocityXEach(0);
    rockGroup.setVelocityXEach(0);
    textSize(50);
    text("GAME OVER!!! Press 'r' to respawn", 800, 450);
  }

  drawSprites();
  textSize(50);
  fill("green");
  strokeWeight(6);
  stroke("lime");
  text("Your score: " + score, 50, 190);
}

function spawnFriut(){
  if(frameCount % 150 === 0){
  banana = createSprite(1800, 791, 3, 20);
  banana.velocityX = -14;
  banana.addImage(bananaImg);
  banana.scale = 0.1; 
  bananaGroup.add(banana)
  banana.lifetime = 300;
}
}

function spawnRock(){
  if(frameCount % 180 === 0){
    rock = createSprite(1900, 799, 3, 20);
    rock.velocityX = -14;
    rock.addImage(rockImg);
    rock.scale = 0.3;
    rock.lifetime = 300;
    rockGroup.add(rock);
  }
}