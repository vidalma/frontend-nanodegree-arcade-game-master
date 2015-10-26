var debug = false;
var state = "menu";
var spriteHeight = 171;
var spriteWidth = 101;
var tileWidth = 83;
var tileHeight = 101;
var maxcols = 5;
var maxrows = 6;
//  sets state function
// Input -> Output : "string" -> state = "string"
// This function sets the state of the game
var setState = function(newState) {
	state = newState;
};
//Heart constructor object , using new Heart() creates a new Heart object
var Heart = function() {
	this.sprite = 'images/Heart.png';
	this.x = 0;
	this.y = 0;
	this.speed = 0;
	this.startPos = {x:0, y:0};
	this.height = spriteHeight;
	this.width = spriteWidth;
	this.center = {x: this.width * .5, y: this.height * .3};
	this.radius = 45;	
};
// Input -> Output : () -> sets Hearts initial position
//This function sets the Heart's position to a random position on the canvas and ensures it will be full displayed
Heart.prototype.spawn = function() {
	this.x = Math.random() * (ctx.canvas.width - spriteWidth);
	this.y = Math.random() * (ctx.canvas.height - spriteHeight);
	this.center.x = this.x + this.width * .5;
	this.center.y = this.y + this.height * .5;
}
// Draw the heart on the screen
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	if(debug == true){
		ctx.beginPath();
		ctx.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI);
		ctx.strokeStyle = "red";
		ctx.stroke();
	}
};
Heart.prototype.update = function(dt) {
	
}
Heart.prototype.collected = function() {
	this.x = 0 - spriteWidth;
	this.y = 0 - spriteHeight; 
	this.center.x = this.x + this.width * .5;
	this.center.y = this.y + this.height * .5;	
}
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = 0;
	this.y = 0;
	this.speed = 10;
	this.startPos = {x:0 - spriteWidth, y:0};
	this.width = spriteWidth;
	this.height = spriteHeight;
	this.center = {x: this.width * .5, y: this.height * .6};
	this.radius = 30;
};
// Input -> Output : () -> sets Enemy initial position
//This function sets the Enemy's position to a random position on the canvas and ensures it will be full displayed
Enemy.prototype.restart = function (){
	this.x = this.startPos.x;
	this.y = this.startPos.y;
	this.center.x = this.x + this.width * .5;
	this.center.y = this.y + this.height * .65;	
}
//Input -> Output : float -> updates Enemies position
//This function continuously updates the enemies function and checks if it ever goes past the right edge of the canvas it resets it back to the beginning
Enemy.prototype.move = function(dt) {
	// start position = 0 
	// speed = 1
	// time = dt
	// position += speed * time
	// position -= speed * time
	this.x += this.speed * dt;	
	this.center.x = this.x + this.width * .5;
	this.center.y = this.y + this.height * .65;
	if (this.x >= 505 + spriteWidth)
		this.restart();
};
Enemy.prototype.checkpos = function() {
	/*
	if(this.x + this.width < player.x || 
	   this.y + this.height < player.y ||
	   this.x > player.x + player.width || 
	   this.y > player.y + player.height){
		return false;
	}
	return true;*/
	/*
	if(this.x < player.x + player.width-50 &&
		this.x + this.width > player.x+50 &&
		this.y < player.y + player.height-75 &&
		this.y + this.height > player.y+75)
  		return true;
		
	return false;*/
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	if(state == "game"){
	this.move(dt);
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	if(debug == true){
		ctx.beginPath();
		ctx.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI);
		ctx.strokeStyle = "red";
		ctx.stroke();
	}
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//  canvas.width = 505;
//  canvas.height = 606;
var Player = function() {
	this.sprite = 'images/char-cat-girl.png';
	this.selector = 0;
	this.allChar = [
		'images/char-cat-girl.png',
		'images/char-princess-girl.png',	
		'images/char-pink-girl.png',
		'images/char-horn-girl.png',	
		'images/char-boy.png'
	];
	this.x = 0;
	this.y = 0;
	this.score = 0;
	this.speedx = 101;
	this.speedy = 83;
	this.width = spriteWidth;
	this.height = spriteHeight ;
	this.startpos = {x:505 - this.width *3, y:606 - this.height-30};
	this.center = {x:this.width *.5, y: this.height *.5};
	this.radius = 40;
};
//Input -> Output : "string" -> moves player
//This function moves player in the game state and doesn't do too much else in other states, though it could always be extended
Player.prototype.handleInput = function(direction) {	
	switch(state){
		case "game":
			if(direction == 'left' && this.x > 0 ) {
				this.x -= this.speedx;
			}
			else if(direction == 'up' && this.y > 0 ){
				this.y -= this.speedy;
				console.log(this.y);
			}
			else if(direction == 'right' && this.x < ctx.canvas.width - this.width){
				this.x += this.speedx;
			}
			else if(direction == 'down' && this.y < ctx.canvas.height - this.height - 45){
				this.y += this.speedy;
			}
			this.center.x = this.x + this.width * .5;
			this.center.y = this.y + this.height * .6;
			break;
		case "menu":
			//console.log("menu");
			break;
		case "score":
			//console.log("SCORE!");
			break;
		default :
			
	}
}
//
Player.prototype.levelUp = function() {
	this.spawn();
	
}
Player.prototype.checkCollision = function(other) {
	//circle collision test
	//input: other object
	//output true if they collide
	// calculate difference between centers
	var distX = this.center.x - other.center.x;
	var distY = this.center.y - other.center.y;
	// get the distance with Pythagoras
	var dist = Math.sqrt((distX * distX) + (distY * distY));
	return dist <= this.radius + other.radius;
}
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	switch(state){
		case "game":
		if(this.y < 0) {
				this.score += 100;
				allPickups.forEach(function(pickup){
					pickup.spawn();
				});
				setState("score");
		}
		for(var i = 0; i < allEnemies.length; i++){
			if(player.checkCollision(allEnemies[i])){
				this.score += -25;
				player.spawn();
			}
		}
		for(var i = 0; i < allPickups.length; i++){
			if(player.checkCollision(allPickups[i])){
				this.score += 75;
				allPickups[i].collected();
			}
		}
		
			break;
		case "menu":
			//console.log("MENU");
			break;
		case "score":
			this.levelUp();
			break;
		default:
	}
};
//this function checks the state the game is in 
// it draws different things on the canvas depending on the state
Player.prototype.render = function() {
	if(state == "menu"){
		ctx.save();
		ctx.fillStyle = "#f9f9f9";
		ctx.fillRect(0, 202, ctx.canvas.width, 105 );
		ctx.font = "45px, Verdana";
		ctx.textBaseline = 'top';
		ctx.fillStyle = "#6600CC";
		ctx.fillText("<- -> Select Character", 100, 200);
		ctx.fillText("Enter to Start", 150, 250);
		
		ctx.restore();
	}
	if(state == "score"){
		setTimeout(function(){ ctx.clearRect(0, 202, ctx.canvas.width, 55); setState("game");}, 3000);
		console.log("anything");
		ctx.save();
		ctx.fillStyle = "#f9f9f9";
		ctx.fillRect(0, 202, ctx.canvas.width, 55);
		ctx.font = "45px, Verdana";
		ctx.textBaseline = 'top';
		ctx.fillStyle = "#6600CC";
		ctx.fillText("SCORE: " + this.score + "!!", 168, 202);
		ctx.restore();
	}
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	ctx.font = "35px Helvetica";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Score: " + this.score,10,606 - 30);
	if(debug == true){
		ctx.beginPath();
		ctx.arc(this.center.x,this.center.y,this.radius,0,2*Math.PI);
		ctx.strokeStyle = "cyan";
		ctx.stroke();
	}
};
//set initial position of Player
Player.prototype.spawn = function() {
	this.x = this.startpos.x;
	this.y = this.startpos.y;
	this.center.x = this.x + this.width * .5;
	this.center.y = this.y + this.height * .6;
//sets position of enemies as well	
	for(var i = 0; i < allEnemies.length; i++){
		allEnemies[i].restart();
	}
	
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var allPickups = [];
var numHearts = Math.floor((Math.random() * 5 )+ 1);
var numEnemies = 4;
for(var i = 0; i < numEnemies; i++){
	var enemy = new Enemy();
	enemy.speed = (i+1) * 50;
	enemy.x = enemy.startPos.x;
	if(i == 0)
		enemy.y = i * tileHeight -  20; //tileHeight = 83
	else
		enemy.y = i * tileHeight - (i * 25);
		
	enemy.startPos.y = enemy.y;
	allEnemies.push(enemy);
}
for(var i = 0; i < numHearts; i++){
	var heart = new Heart();
	heart.spawn();
	allPickups.push(heart);
}
var player = new Player();
player.spawn();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
	console.log(e.keyCode);
	if(e.keyCode == 187)
		debug = !debug;
    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('keydown', function(e) {
	var menuKeys = {
		13: 'enter',
		32: 'spacebar',
		37: 'left',
		39: 'right'
	};
	if(state == "menu"){
		if(menuKeys[e.keyCode] == 'enter'){
			setState("game");	
		}
		if(menuKeys[e.keyCode] == 'left'){
			player.selector--;
			if(player.selector <= 0){
				player.selector = player.allChar.length - 1;
			}
			player.sprite = player.allChar[player.selector];
		}
		if(menuKeys[e.keyCode] == 'right'){
			player.selector++;
			if(player.selector >= player.allChar.length - 1){
				player.selector = 0;
			}
			player.sprite = player.allChar[player.selector];	
		}
	}
});
