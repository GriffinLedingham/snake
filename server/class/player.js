var player_speed = 10;

var grid_width = 18;
var grid_height = 10;

function Player(id,socket) {
  this.id = id; // default value

  //-1 means this player needs to join a game to initialize
  this.tail_length = 0;
  this.room = null;
  this.head = new Head(0,0);
  this.speed = player_speed;
  this.direction = new Vector2(0,0);

  this.socket = socket;

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

Player.prototype.update = function(){
    if(this.ticks % this.speed === 0)
    {
        this.head.update(this.direction);
        this.room.updateGrid(this.head);
        this.socket.emit('playerUpdate', {x: this.head.pos.X(), y: this.head.pos.Y()});
    }
    this.ticks++;
};

// export the class
module.exports = Player;