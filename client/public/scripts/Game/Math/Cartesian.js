;(function(namespace){
	"use strict";


	function Cartesian(pX, pY){
		this.initialize(pX, pY);	
	}

	Cartesian.prototype = {
		
		initialize:function(pX,pY){
			this.x = pX;
			this.y = pY;
		},


		toReal:function(){

			var camera = Game.Camera;
			var screen = Game.Screen;

			var cx = (this.x - screen.center.x) / camera.zoom + camera.position.x;
			var cy = (this.y - screen.center.y) / camera.zoom + camera.position.y;

			return new Cartesian(cx, cy);

		},

		toScreen:function(){

			var camera = Game.Camera;
			var screen = Game.Screen;
			
			var cx = (this.x - camera.position.x) * camera.zoom + screen.center.x;
			var cy = (this.y - camera.position.y) * camera.zoom + screen.center.y;

			return new Cartesian(cx, cy);

		},


		lenSqr:function(){
			return Math.pow(this.x,2) + Math.pow(this.y,2);
		},


		mag:function(){
			return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
		},

		dot:function(p){
			return this.x * p.x + this.y * p.y;
		},

		factor:function(p){
			return new Cartesian(this.x * p, this.y * p);
		},

		dec:function(p){
			this.x -= p.x;
			this.y -= p.y;
		},

		inc:function(p){
			this.x += p.x;
			this.y += p.y;
		},

		add:function(p){
			return new Cartesian(this.x + p.x, this.y + p.y);
		},

		sub:function(p){
			return new Cartesian( this.x - p.x, this.y - p.y);
		},

		equ:function(p){
			this.x = p.x;
			this.y = p.y;
		}


	}

	namespace.Cartesian = Cartesian;	

}(Game.Math = Game.Math || {}));