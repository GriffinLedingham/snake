var player_speed = 1;

var grid_width = 57;
var grid_height = 30;

function Player(id,socket) {
  this.id = id; // default value

  //-1 means this player needs to join a game to initialize
  this.tail_length = 0;
  this.room = null;
  this.head = new Head(0,0);
  this.speed = player_speed;
  this.direction = new Vector2(-1,0);

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
        var update_array = [];
        var head_obj = this.head.update(this.direction);
        update_array.push(head_obj);
        var body_pointer = this.head.child;
        while(body_pointer !== null)
        {
            var body_pointer_obj = body_pointer.update(this.direction);
            update_array.push(body_pointer_obj);
            body_pointer = body_pointer.child;
        }
        this.room.updateGrid(this.head);

        return update_array;
    }
    this.ticks++;
};

// export the class
module.exports = Player;