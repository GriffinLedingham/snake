;(function(namespace){
	"use strict";

	/******** Classes / Namespaces ********/
	var Cartesian = SheepTag.Math.Cartesian;
	/**************************************/

	function Screen(){
		this.initialize();	
	}

	Screen.prototype = {

		initialize:function(){
			this.size = new Cartesian(0,0);
			this.center = new Cartesian(0,0);
			this.setScreen();
			this.bindToEvents();
		},

		bindToEvents:function(){
			var events = SheepTag.events;
			events.subscribe('resize',SheepTag.proxy(this.setScreen,this));
		},

		setScreen:function(){
			var width = SheepTag.width;
			var height = SheepTag.height;
			this.width = width;
			this.height = height;
			this.size.x = width;
			this.size.y = height;
			this.center.x = width/2;
			this.center.y = height/2;
		}

	}

	namespace.Screen = Screen;	

}(SheepTag.View = SheepTag.View || {}));