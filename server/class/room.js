var grid_width = 57;
var grid_height = 30;

function Room(id) {
  this.id = id;
  this.players = []; // default value
  this.grid = new Array(grid_width);
  this.ticks = 0;

  this.food = [];

  for(var i = 0;i<grid_width;i++)
  {
    this.grid[i] = new Array(grid_height);
    for(var j = 0;j<grid_height;j++)
    {
        this.grid[i][j] = null;
    }
  }

  for(var j = 0;j<10;j++)
  {
  	var x = Math.floor((Math.random()*grid_width)+0);
  	var y = Math.floor((Math.random()*grid_height)+0);
  	var temp_food = new Power(x,y,guid());
  	this.food.push(temp_food);

  	this.grid[x][y] = temp_food;
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

    if(this.grid[x][y] !== null && typeof this.grid[x][y].type !== 'undefined' && this.grid[x][y].type === 'food')
    {
    	body.food = true;	
    }


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

                var player_update_arr = view.players[i].update();
                player_update_arr.unshift({id: view.players[i].id});
                player_array.push(player_update_arr);
            }   
            view.ticks++;
            io.sockets.in(view.id).emit('playerUpdate',{players: player_array, food: view.food});
        },(1000/6)
    );
};

function s4(){
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

function guid(){
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
}

// export the class
module.exports = Room;