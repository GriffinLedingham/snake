var grid_width = 10;
var grid_height = 10;

function Room(id) {
  this.id = id;
  this.players = []; // default value
  this.grid = new Array(grid_width);
  this.ticks = 0;

  for(var i = 0;i<grid_width;i++)
  {
    this.grid[i] = new Array(grid_height);
    for(var j = 0;j<grid_height;j++)
    {
        this.grid[i][j] = null;
    }
  }
}

// class functions
Room.prototype.getID = function() {
    console.log(this.id);
};

Room.prototype.updateGrid = function(body) {
    this.grid[body.last_pos.X()][body.last_pos.Y()] = null;
    this.grid[body.pos.X()][body.pos.Y()] = body;
};

Room.prototype.addPlayer = function(player){
    this.players.push(player);
};

Room.prototype.start = function()
{
    var view = this;
    setInterval(function(){
            for(var i = 0;i<view.players.length;i++)
            {
                view.players[i].update();
                console.log(view.players[i].head.pos.X(),view.players[i].head.pos.Y());
                io.sockets.in(view.id).emit('message', 'Player:',players[i].id,'X:',view.players[i].head.pos.X(),'Y:',view.players[i].head.pos.Y());
            }   
            view.ticks++; 
        },(1000/6)
    );
};

// export the class
module.exports = Room;