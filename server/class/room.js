var grid_width = 57;
var grid_height = 30;

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
    var last_x = body.last_pos.X(); 
    var last_y = body.last_pos.Y(); 

    var y = body.pos.Y(); 
    var x = body.pos.X(); 


    this.grid[last_x][last_y] = null;
    this.grid[x][y] = body;
};

Room.prototype.addPlayer = function(player){
    player.room = this;
    this.players.push(player);
    player.socket.broadcast.to(this.id).emit('newPlayer',{x:player.head.pos.X(),y:player.head.pos.Y(),id:player.id});
};

Room.prototype.removePlayer = function(player){
    for(var i = 0;i<this.players.length;i++)
    {
        if(this.players[i].udid === player.udid)
        {
            console.log('found player');
            this.players.splice(i,1);
            this.grid[player.head.pos.X()][player.head.pos.Y()] = null;
            player.socket.broadcast.to(this.id).emit('removePlayer',{id:player.id});
            break;
        }
    }
};

Room.prototype.start = function()
{
    var view = this;
    setInterval(function(){
            var player_array = [];
            for(var i = 0;i<view.players.length;i++)
            {
                view.players[i].update();
                player_array.push({x:view.players[i].head.pos.X(),y:view.players[i].head.pos.Y(),id:view.players[i].id});
                //console.log(view.players[i].head.pos.X(),view.players[i].head.pos.Y());
                //view.players[i].socket.emit('message', 'Player: '+view.players[i].id+' X: '+view.players[i].head.pos.X()+' Y: '+view.players[i].head.pos.Y());
            }   
            view.ticks++;

            io.sockets.in(view.id).emit('playerUpdate',player_array);
/*process.stdout.write('\u001B[2J\u001B[0;0f');
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
                        process.stdout.write('[] ');
                    }
                }
                console.log('\n');
            } */
        },(1000/6)
    );
};

// export the class
module.exports = Room;