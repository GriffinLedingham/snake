;(function(namespace){
	"use strict";

	var FPSMeter = function(stage, color) {
	//	if (!Atari.developerMode) { return; }
		this.initialize(stage, color);
	}

    FPSMeter.prototype = {

	    text: null,
	    stage: null,

	    initialize: function() {
	    	var stage = SheepTag.stage;
	    	var color = "#000000";
		    createjs.Ticker.addEventListener('tick',SheepTag.proxy(this.tick,this));
			var text = this.text = new createjs.Text("--", "19px robotobold", color==null?"#FFFFFF":color);
		    text.textBaseline = "alphabetic";
			text.maxWidth = 200;
			text.x = 10;
			this.stage = stage;
			stage.addChild(text);
	    },

	    tick: function(){
	    	
		    var stage = this.stage;
		    var text = this.text;
	        if(stage.getChildIndex(text)+1 < stage.getNumChildren()){
	            stage.addChild(text);
	        }
	        text.text = createjs.Ticker.getMeasuredFPS() + 0.5 | 0;
			text.text += 'fps';
			text.y = SheepTag.height - 10;
	    }

	}

	namespace.FPSMeter = FPSMeter;

}(SheepTag.Utils = SheepTag.Utils || {}));