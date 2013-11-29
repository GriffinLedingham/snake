;(function(namespace){
	"use strict";

	var Cartesian = Game.Math.Cartesian;

	function Food(x,y){
		this.initialize(x,y);	
	}

	Food.prototype = {


		initialize:function(x,y){
			var x = Game.randomNumber(0,57)
			var y = Game.randomNumber(0,30);
			this.value = 3;
			this.pos = new Cartesian(x, y);
		},

		draw:function(){
			var pos = this.pos.factor(20);			
			var x = pos.x;
			var y = pos.y;

			var context = Game.ctx;
		    context.beginPath();
		    context.rect(x, y, 20, 20);
		    context.fillStyle = '#8D38A2';
		    context.fill();
		    context.lineWidth = 1;
		    context.strokeStyle = '#000';
		    context.stroke();
		}

	}

	namespace.Food = Food;	

}(Game.Characters = Game.Characters || {}));
