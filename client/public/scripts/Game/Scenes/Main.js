;(function(namespace){
	"use strict";

	var Snake = Game.Characters.Snake;
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
			this.singlePlayer = true;

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

		updatePlayers:function(players){
			var snakes = this.snakes;
			for(var i in players){
				var player = players[i];
				if(snakes[player.id]){
					var snake = snakes[player.id];
					snake.sync = player;
				} else {
					console.log('Creating Snake ' + player.id);
					var snake = new Snake(player.x, player.y);
					snakes[player.id] = snake;
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