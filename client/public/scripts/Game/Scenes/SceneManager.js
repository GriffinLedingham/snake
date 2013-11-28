;(function(namespace){
	"use strict";


	function SceneManager(){
		this.initialize();	
	}


	SceneManager.prototype = {

		initializeScene:'Main',


		/**
		 * Intialize
		 */
		initialize:function(){
			this.currentScene = new namespace[this.initializeScene];
		},



		/**
		 * Update
		 */
		update:function(){
			this.currentScene.update();
		},


		/**
		 * Change Scene
		 * Close and Unbind events
		 * then intiailize new scene
		 * @param  {[type]} scene [description]
		 * @return {[type]}       [description]
		 */
		changeScene:function(scene){
			this.currentScene.close();
			this.currentScene = new namespace[scene];
		}

	}


	namespace.SceneManager = SceneManager;

}(Game.Scenes = Game.Scenes || {}));