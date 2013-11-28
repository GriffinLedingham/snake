;(function(namespace){
	"use strict";

	/******** Classes / Namespaces ********/
	var Cartesian = SheepTag.Math.Cartesian;
	/**************************************/


	function Camera(){
		this.initialize();	
	}

	Camera.prototype = {

		initialize:function(){
			this.zoom = 1;
			this.position = new Cartesian(0,0);
			this.bindToEvents();
			this.modelFocus = null;
		},

		update:function(){
			if(!this.modelFocus){
				return;
			}

			var cameraFocus = this.modelFocus.head;
			var position = this.position;
			position.x += (cameraFocus.pos.x - position.x) / 3;
			position.y += (cameraFocus.pos.y - position.y) / 3;
		},

		setModel:function(model){
			this.modelFocus = model;
			this.position.x - model.head.pos.x;
			this.position.y - model.head.pos.y;
			this.update();
		},

		bindToEvents:function(){
			var events = SheepTag.events;
			events.subscribe('mousedown',SheepTag.proxy(this.mouseDown, this));
			events.subscribe('mousemove',SheepTag.proxy(this.mouseMove, this))
			events.subscribe('mouseup',SheepTag.proxy(this.mouseUp, this));
			events.subscribe('mousewheel',SheepTag.proxy(this.mouseWheelZoom, this));
		},

		mouseDown:function(evt){
			this.model = null;
			this.lastX = evt.x;
			this.lastY = evt.y;
		},

		mouseMove:function(evt){
			if(this.lastX && this.lastY){
				var stageX = evt.x;
				var stageY = evt.y;
				var diffX = this.lastX - stageX;
				var diffY = this.lastY - stageY;
				this.lastX = stageX;
				this.lastY = stageY;
				this.position.x += diffX / SheepTag.Camera.zoom;
				this.position.y += diffY / SheepTag.Camera.zoom;
			}
		},

		mouseUp:function(){
			this.lastX = null;
			this.lastY = null;
		},


		mouseWheelZoom:function(evt){

		},

		focusModel:function(model){

		},

		close:function(){

		}
	}

	namespace.Camera = Camera;

}(SheepTag.View = SheepTag.View || {}));