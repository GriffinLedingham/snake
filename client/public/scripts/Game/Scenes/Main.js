;(function(namespace){
	"use strict";

	var Snake = Game.Characters.Snake;

	function Main(){
		this.initialize();	
	}


	Main.prototype = {


		/**
		 * Intialize
		 */
		initialize:function(){
			this.snake = new Game.Characters.Snake(0,0);
			this.tick = 0;
			this.bindToSocketEvents();
			this.ready = true;
		},


		bindToSocketEvents:function(){
			Game.socket.on('playerUpdate', Game.proxy(this.updatePlayers, this));
		},

		updatePlayers:function(pos){
			var head = this.snake.head;
			head.x = pos.x;
			head.y = pos.y;
		},


		/**
		 * Update
		 */
		update:function(){
			if(this.ready){
				// this.snake.update();
				this.snake.draw();
				this.tick++;
			}
			console.log('scene update');
		},



		close:function(){
			console.log('scene closed');
		}
	}


	namespace.Main = Main;

}(Game.Scenes = Game.Scenes || {}));