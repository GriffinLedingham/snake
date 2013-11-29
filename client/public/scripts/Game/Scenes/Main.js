;(function(namespace){
	"use strict";

	var Snake = Game.Characters.Snake;
	var SnakeBody = Game.Characters.SnakeBody;
	var Food = Game.Characters.Food;

	function Main(){
		this.initialize();	
	}


	Main.prototype = {


		/**
		 * Intialize
		 */
		initialize:function(){
			this.snakes = {};
			this.food = [];
			this.ticks = 0;
			this.bindToSocketEvents();
			this.ready = true;
			this.singlePlayer = false;

			if(this.singlePlayer){
				this.snakes[1] = new Snake(0,0);
				for(var i = 0; i < 4; i++){
					this.food.push(new Food());
				}
			}
		},

		collideWithFood:function(head){
			var allfood = this.food;
			for(var i in allfood){
				var food = allfood[i];
				var food_pos = food.pos;
				if(food_pos.x == head.x && food_pos.y == head.y){
					head.food = food.value;
					allfood[i] = new Food();					
				}
			}
		},

		bindToSocketEvents:function(){
			if(Game.socket){
				Game.socket.on('playerUpdate', Game.proxy(this.updatePlayers, this));
				Game.socket.on('newPlayer', Game.proxy(this.newPlayer, this));			
				Game.socket.on('removePlayer', Game.proxy(this.removePlayer, this));			
			}
		},

		removePlayer:function(player){
			if(this.snakes[player.id]){
				delete this.snakes[player.id];
			}
		},

		newPlayer:function(player){
			var snake = new Snake(player.x, player.y);
			this.snakes[player.id] = snake;
		},

		updatePlayers:function(state){


			console.log(state);
			var players = state.players;

			var food = state.food;
			this.food = [];

			for(var i in food){
				var f = food[i];
				var yum = new Food();
				yum.pos.x = f.x;
				yum.pos.y = f.y;
				yum.draw();
				this.food.push(yum)
			}

			var snakes = this.snakes;
			for(var i in players){
				var player = players[i];

				var id = player[0].id;
				var head = player[1];
				var pieces = player.length;
				var part;

				if(snakes[id]){
					var snake = snakes[id];
					snake.head.x = head.x;
					snake.head.y = head.y
					part = snake;
				} else {
					console.log('Creating Snake ' + id);
					var snake = new Snake(head.x, head.y);
					snakes[id] = snake;
					part = snake;
				}
				for(var i = 2; i < pieces; i++){
					var o = player[i];
					if(part.child == null){
						console.log('Creating SnakeBody')
						var newPiece = new SnakeBody();
						part.child = newPiece;
					} else {
						part.child.pos.x = o.x;
						part.child.pos.y = o.y;
					}
					part = part.child;
				}
			}
		},


		/**
		 * Update
		 */
		update:function(){
			if(this.ready){
				var snakes = this.snakes;
				var food = this.food;
				
				for(var i in snakes){
					snakes[i].update();
					snakes[i].draw();
				}

				for(var i in food){
					food[i].draw(); 
				}

				this.ticks++;
			}
		},



		close:function(){
			console.log('scene closed');
		}
	}


	namespace.Main = Main;

}(Game.Scenes = Game.Scenes || {}));