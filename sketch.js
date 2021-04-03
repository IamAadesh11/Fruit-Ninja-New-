
//The variables to store various things
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var knife, knifeHolder;
var orang,orangeRand, pea,pearRand, appleRand, appl, banan,bananaRand, fruit1,fruit2, fruit3, fruit4, orangeGroup, pearGroup, bananaGroup, appleGroup; 
var monster, monsterHolder1,monsterHolder2, alien;
var gameOver, over;
var sound, sound1;
var rand, ran;
var score;

//preload function
function preload(){
  
  knifeHolder = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterHolder1 = loadImage("alien1.png");
  monsterHolder2 = loadImage("alien2.png");
  
  over = loadImage("gameover.png");
  
  sound = loadSound("knifeSwooshSound.mp3");
  sound1 = loadSound("gameover.mp3");
}

// setup function
function setup() {
  //creatin canvas
  createCanvas(500, 500);
  
  //Creating groups
  orangeGroup = new Group();
  appleGroup = new Group();
  bananaGroup = new Group();
  pearGroup = new Group();
  alien = new Group();
  
  //creating swords
  knife = createSprite(40, 360, 20, 20);
  knife.addImage("sword", knifeHolder);
  knife.scale = 0.7;
  knife.setCollider("rectangle",0, -20, 30, 100);

  score = 0;
  
}

function draw() {
  
  //background color
  background("lightBlue");
  
  
  
  //drawing the sprites
  drawSprites();
  
  //text for scores
  textAlign(CENTER);
  textSize(20);
  fill ("yellow");
  stroke ("black");
  text("SCORE = " + score, 200, 30);
  
  
  //if satement for play
  if (gameState === PLAY){
    //knife is moving with mouse
    knife.x = World.mouseX;
    knife.y = World.mouseY;

    //function for the monsters
    enemies();

  //if statement for making the fruits come
  if (frameCount % 80 === 0){
      rand = Math.round(random(1,4));
      console.log(rand);
      if(rand === 1){
         orange();
      }else if (rand === 2){
         apple();                                  
      }else if (rand === 3){
        pear();
      }else if (rand === 4){
        banana();       
      }
    }

    //If statements for the scorings
    if(knife.isTouching(orangeGroup)){
      orangeGroup.destroyEach();
      score = score + 1;
      sound.play();
       }
    if(knife.isTouching(appleGroup)){
      appleGroup.destroyEach();
      score = score + 1;
      sound.play();
       }
    if(knife.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 1;
      sound.play();
       }
    if(knife.isTouching(pearGroup)){
      pearGroup.destroyEach();
      score = score + 1;
      sound.play();
       }
  }  
  //Gamestate changes to end
  if(knife.isTouching(alien)){
    gameState = END;
    sound1.play();
  }
  
  //gamestate becomes end
  if(gameState === END){
    fill("black");
    textAlign(CENTER);
    textSize(70);
    text("SCORE = " + score, 200, 130);
  
    
    //text for gameover
    done();
    
    //Each and every thing is stopped
    knife.x = 200;
    knife.y = 300;
    orangeGroup.setVelocityXEach(0);
    orangeGroup.setLifetimeEach(-1); 
    appleGroup.setVelocityXEach(0);
    appleGroup.setLifetimeEach(-1); 
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1); 
    pearGroup.setVelocityXEach(0);
    pearGroup.setLifetimeEach(-1); 
    alien.setVelocityXEach(0); 
  }
  
}

//net function
function net() {
  for(var i = 0; i < 400; i = i + 50){
    line(i, 0, i, 400);
    stroke("skyblue");
    
    line(0, i, 400, i);
    stroke("skyblue"); 
  }
}

//orange fruit function 
function orange(){
 
  orang = createSprite(400,Math.round(random(50, 350)),20,20);
   orang.addImage(fruit1);        
   orang.scale = 0.15;
   orangeRand = Math.round(random(4,5))
  if(orangeRand === 4){
     orang.x = 0;
     orang.velocityX = 7 + score / 4;
     }else if (orangeRand === 5){
     orang.x = 400;
     orang.velocityX = -(7 + score / 4);
     }
  orang.lifetime = 100;
  orangeGroup.add(orang);
}

//apple fruit function 
function apple(){
  appl = createSprite(400,Math.round(random(50, 350)),20,20);
  appl.addImage(fruit2);        
  appl.scale = 0.15
  appleRand = Math.round(random(6,7));
  if(appleRand === 6){
     appl.x = 0;
     appl.velocityX = 7 + score / 4;
     }else if (appleRand === 7){
     appl.x = 400;
     appl.velocityX = -(7 + score / 4);
     }
  appl.lifetime = 100;
  appleGroup.add(appl);
}

//pear fruit function
function pear(){
  pea = createSprite(400,Math.round(random(50, 350)),20,20);
  pea.addImage(fruit3);                 
  pea.scale = 0.15;
  pearRand = Math.round(random(8,9));
  if(pearRand === 8){
     pea.x = 0;
     pea.velocityX = 7 + score / 4;
     }else if (pearRand === 9){
     pea.x = 400;
     pea.velocityX = -(7 + score / 4);
     }
  pea.lifetime = 100;
  pearGroup.add(pea);
}

//banana fruit function
function banana(){
  banan = createSprite(400,Math.round(random(50, 350)),20,20);
  banan.addImage(fruit4);       
  banan.scale = 0.15;
  bananaRand = Math.round(random(2,3))
  if(bananaRand === 2){
     banan.x = 0;
     banan.velocityX = 7 + score / 4;
     }else if (bananaRand === 3){
     banan.x = 400;
     banan.velocityX = -(7 + score / 4);
     }
  banan.lifetime = 100;
  bananaGroup.add(banan);
}

//Enemie function
function enemies(){
  if(frameCount % 200 === 0){
    monster = createSprite(400,Math.round(random(50, 350)),20,20);
    monster.velocityX = -(8 + score / 10);
    monster.setLifetime = 50;
    alien.add(monster);
    ran = Math.round(random(1, 2));
    if(ran === 1){
       monster.addImage("monster1", monsterHolder1);
    }else if (ran === 2){
       monster.addImage("monster2", monsterHolder2);
    }
  }
}

// Game is complete function 
function done(){

  gameOver = createSprite(200, 200, 20, 20);
  gameOver.addImage("over", over);
  gameOver.scale = 2;
}