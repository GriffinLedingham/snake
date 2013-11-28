;(function(namespace){
	"use strict";

	//This is quick reference for the tick event,
	var SceneHandler = null;


	//Main Free Rider Singleton
	var Game = {


		/**
		 * Developer Mode
		 */
		developerMode:true,
		

		initialize:function(){
			var self = this;
			this.initializeGame();
		},



		/**
		 * Initialize Events
		 */
		initializeEvents:function(){
			this.events = new PubSub();
		},


		/**
		 * Initialize Game
		 */
		initializeGame:function(){
			this.canvas = document.getElementById('GameCanvas');
			this.ctx = this.canvas.getContext('2d');
			var stage = new createjs.Stage(this.canvas);
			stage.enableMouseOver();
			stage.autoClear = false;
			createjs.Touch.enable(stage);
			this.stage = stage;
			this.SceneManager = new Game.Scenes.SceneManager();
			createjs.Ticker.useRAF = true;
			createjs.Ticker.setFPS(60);				
			createjs.Ticker.addEventListener("tick", tick);	
		},

		/**
		 * Trace
		 */
		trace:function(log){
			if(this.developerMode === true){
				console.log(log);
			}
		},


		/**
		 * Generate ID Util
		 * @param  {[type]} size Size of the ID to generate
		 * @return {[type]} Unique ID
		 */
		generateID:function(size){
			var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i = 0; i < size; i++ ){
		        text += possible.charAt(Math.floor(Math.random() * possible.length));
			}

		    return text;
		},


		/**
		 * JavaScript does not provide method closure, so a proxy function can be used
		 * to maintain method scope. Any parameters called on the resulting function will be passed
		 * into the callback.
		 * @param {Function} method The method to call
		 * @param {Object} scope The object to call the method on
		 * @return {Function} A delegate (proxy) function that will maintain the proper scope when it is called.
		 * @static
		 */
	    proxy:function(method, scope) {
	        return function() {
				if (Game.developerMode === false) {
					try {
						return method.apply(scope, arguments);
					} catch(e) { }
				} else {
					return method.apply(scope, arguments);
				}
	        }
	    },




	    randomNumber:function(min, max){
	    	return Math.floor(Math.random() * (max - min + 1)) + min;
	    }

	}

	namespace.Game = Game;

}(window));





var time;
function tick(){
			if(!Game.paused){
				Game.stage.clear();
				var now = new Date().getTime();
				Game.deltaTime = now - ( time || now);
				time = now;	
				Game.SceneManager.update();		
			}
}
