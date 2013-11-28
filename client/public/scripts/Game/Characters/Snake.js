;(function(namespace){
	"use strict";

	/******** Classes / Namespaces ********/
	var Cartesian = Game.Math.Cartesian;
	var SnakeBody = Game.Characters.SnakeBody;
	var GamePad = Game.Utils.GamePad;
	/**************************************/

	function Snake(x,y){
		this.initialize(x,y);	
	}

	Snake.prototype = {


		initialize:function(x,y){
			this.path = [];
			this.head = new Cartesian(0,0);
			this.prevPos = new Cartesian(0,0);
			this.speed = 10;
			this.direction = new Cartesian(0,0);
			this.gamePad = new GamePad();
			this.gamePad.setAsMainPlayer();
			this.gamePad.onButtonDown = Game.proxy(this.handleButtonPress, this);
		},


		addPiece:function(x,y){
			var piece = new SnakeBody(x,y);
		},


		handleButtonPress:function(button){
			var message = null;
			switch(button){
				case 'up':
					message = {x:0,y:-1};
					break;
				case 'down':
					message = {x:0,y:1};
					break;
				case 'right':
					message = {x:1,y:0};				
					break;
				case 'left':
					message = {x:-1,y:0};				
					break;
			}
			if(message){
				if(Game.socket){
					Game.socket.emit('key',message);
				}
			}
		},


		update:function(){
			var tick = Game.SceneManager.currentScene.tick;
			this.gamePad.update();
			if(tick % this.speed == 0){
				this.control();
				this.prevPos.equ(this.head);
				this.head.inc(this.direction);
				if(this.child){
					this.child.update();
				}
			}
			

			if(this.head.x > 18){
				this.head.x = 0;
			}


		},

		control:function(){
			var gamePad = this.gamePad;
			var up = gamePad.isButtonDown('up');
			var down = gamePad.isButtonDown('down');
			var left = gamePad.isButtonDown('left');
			var right = gamePad.isButtonDown('right');
			var direction = this.direction;

			if(up){
				direction.y = -1;
				direction.x = 0;
				gamePad.setButtonUp('up');
				return;
			}

			if(down){
				direction.y = 1;
				direction.x = 0;
				gamePad.setButtonUp('down');	
				return;			
			}

			if(right){
				direction.y = 0;
				direction.x = 1;
				gamePad.setButtonUp('right');		
				return;		
			}

			if(left){
				direction.x = -1;
				direction.y = 0;
				gamePad.setButtonUp('left');	
				return;			
			}

		},

		draw:function(){

			var pos = this.head.factor(50);			
			var x = pos.x;
			var y = pos.y;

			var context = Game.ctx;
		    context.beginPath();
		    context.rect(x, y, 50, 50);
		    context.fillStyle = '#3D5FA2';
		    context.fill();
		    context.lineWidth = 1;
		    context.strokeStyle = '#000';
		    context.stroke();

		    if(this.child){
				this.child.draw();
			}
		}

	}

	namespace.Snake = Snake;	

}(Game.Characters = Game.Characters || {}));
