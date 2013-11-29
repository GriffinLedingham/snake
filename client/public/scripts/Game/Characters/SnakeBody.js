;(function(namespace){
	"use strict";

	/******** Classes / Namespaces ********/
	var Cartesian = Game.Math.Cartesian;
	/**************************************/

	function SnakeBody(x,y){
		this.initialize(x,y);	
	}

	SnakeBody.prototype = {


		initialize:function(x,y){
			this.pos = new Cartesian(x,y);
			this.prevPos = new Cartesian(x,y);
			this.isTail = false;
			this.parent = null;
			this.child = null;
			this.food = false;
		},

		setParent:function(snakeBody){
			this.parent = snakeBody;
		},

		digest:function(){
			if(this.food && this.child){
				this.child.food = this.food;
				this.food = false;
			}

			if(this.food && !this.child){
				this.child = new SnakeBody(0,0);
				this.child.pos.equ(this.prevPos);
				this.child.setParent(this);
				this.child.food = this.food;
				this.child.food--;
				this.food = false;
			}
		},

		update:function(){
			this.digest();
			this.prevPos.equ(this.pos);
			this.pos.equ(this.parent.prevPos);
			if(this.child){
				this.child.update();
			}
		},

		draw:function(){

			var pos = this.pos.factor(20);			
			var x = pos.x;
			var y = pos.y;

			var context = Game.ctx;
		    context.beginPath();
		    context.rect(x, y, 20, 20);
		    context.fillStyle = '#3C87B9';
		    context.fill();
		    context.lineWidth = 1;
		    context.strokeStyle = '#000';
		    context.stroke();

		    if(this.child){
		    	this.child.draw();
		    }

		}

	}

	namespace.SnakeBody = SnakeBody;	

}(Game.Characters = Game.Characters || {}));