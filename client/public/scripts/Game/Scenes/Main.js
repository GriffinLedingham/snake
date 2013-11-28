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
			this.snake = new Game.Characters.Snake();
			this.tick = 0;
		},

		/**
		 * Update
		 */
		update:function(){
			this.snake.update();
			this.snake.draw();
			this.tick++;
			console.log('scene update');
		},



		close:function(){
			console.log('scene closed');
		}
	}


	namespace.Main = Main;

}(Game.Scenes = Game.Scenes || {}));