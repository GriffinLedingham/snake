var grid_width = 18;
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
    player.room = this;
    this.players.push(player);
};

Room.prototype.start = function()
{
    var view = this;
    setInterval(function(){
            for(var i = 0;i<view.players.length;i++)
            {
                view.players[i].update();
                //console.log(view.players[i].head.pos.X(),view.players[i].head.pos.Y());
                //view.players[i].socket.emit('message', 'Player: '+view.players[i].id+' X: '+view.players[i].head.pos.X()+' Y: '+view.players[i].head.pos.Y());
            }   
            view.ticks++;
            /*console.log('--------------------------');
            for(var j = 0;j<grid_height;j++)
            {
                for(var i = 0;i<grid_width;i++)
                {
                    if(view.grid[i][j] === null)
                    {
                        process.stdout.write('0  ');
                    }
                    else
                    {
                        process.stdout.write('1  ');
                    }
                }
                console.log('\n');
            } 
            console.log('--------------------------');*/
        },(1000/60)
    );
};

// export the class
module.exports = Room;