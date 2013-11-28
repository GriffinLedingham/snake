var player_speed = 1;

var grid_width = 18;
var grid_height = 10;

function Player(id) {
  this.id = id; // default value

  //-1 means this player needs to join a game to initialize
  this.tail_length = 0;
  this.room = null;
  this.head = null;
  this.speed = -1;
  this.direction = new Vector2(0,0);

  this.ticks = 0;
}

// class functions
Player.prototype.getID = function() {
    console.log(this.id);
};

Player.prototype.getDirection = function(){
    return this.direction;
};

Player.prototype.addBody = function(){
    if(head.child === null)
    {
        head.food = true;
    }
    else
    {
        head.child.food = true;
    }
};

Player.prototype.initialize = function() {
    this.head = new Head(Math.floor((Math.random()*grid_width)+0),Math.floor((Math.random()*grid_height)+0));
    this.speed = player_speed;
};

Player.prototype.update = function(){
    if(this.ticks % this.speed === 0)
    {
        this.head.update(this.direction);
    }
    this.ticks++;
};

// export the class
module.exports = Player;