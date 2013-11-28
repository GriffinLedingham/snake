;(function(namespace){
	"use strict";
	
		var GAME_PAD = {
			UP:'up',
			DOWN:'down',
			LEFT:'left',
			RIGHT:'right',
			SPACE:'space',
			ENTER:'enter',
			SHIFT:'shift',
			CTRL:'ctrl',
			Z:'z',
			BACKSPACE:'backspace',
			TAB:'tab',
			R:'r',
			TILDE:'tilde',
			V:'v',
			PLUS:'+',
			MINUS:'-'
		}

		var KEYS_TO_RECORD = [
			'up',
			'down',
			'left',
			'right',
			'z',
			'enter',
			'backspace'
		];


		var KEY_CODES = {
			W:87,
			A:65,
			S:83,
			D:68,
			Z:90,
			UP:38,
			DOWN:40,
			LEFT:37,
			RIGHT:39,
			SPACE:32,
			CTRL:17,
			SHIFT:16,
			ENTER:13,
			BACKSPACE:8,
			TAB:9,
			R:82,
			TILDE:192,
			V:86,
			PLUS:187,
			MINUS:189
		}


		var KEY_MAP = {};
		KEY_MAP[KEY_CODES.W] = GAME_PAD.UP;
		KEY_MAP[KEY_CODES.A] = GAME_PAD.LEFT
		KEY_MAP[KEY_CODES.S] = GAME_PAD.DOWN;
		KEY_MAP[KEY_CODES.D] = GAME_PAD.RIGHT;
		KEY_MAP[KEY_CODES.Z] = GAME_PAD.Z;
		KEY_MAP[KEY_CODES.UP] = GAME_PAD.UP;
		KEY_MAP[KEY_CODES.DOWN] = GAME_PAD.DOWN;
		KEY_MAP[KEY_CODES.LEFT] = GAME_PAD.LEFT;
		KEY_MAP[KEY_CODES.RIGHT] = GAME_PAD.RIGHT;
		KEY_MAP[KEY_CODES.SPACE] = GAME_PAD.SPACE;
		KEY_MAP[KEY_CODES.CTRL] = GAME_PAD.CTRL;
		KEY_MAP[KEY_CODES.SHIFT] = GAME_PAD.SHIFT;
		KEY_MAP[KEY_CODES.ENTER] = GAME_PAD.ENTER;
		KEY_MAP[KEY_CODES.BACKSPACE] = GAME_PAD.BACKSPACE;
		KEY_MAP[KEY_CODES.TAB] = GAME_PAD.TAB;
		KEY_MAP[KEY_CODES.R] = GAME_PAD.R;
		KEY_MAP[KEY_CODES.TILDE] = GAME_PAD.TILDE;
		KEY_MAP[KEY_CODES.V] = GAME_PAD.V;
		KEY_MAP[KEY_CODES.PLUS] = GAME_PAD.PLUS;
		KEY_MAP[KEY_CODES.MINUS] = GAME_PAD.MINUS;


		var PREVIOUS_DOWN_BUTTONS = [];

		/**
		 * Static Game Pad
		 */
		function GamePad(){
			this.initialize();
		}
		

		/**
		 * Description
		 * @method setPosition
		 * @param {Number} x The x-axis position.
		 * @param {Number} y The y-axis position.
		 */
		GamePad.prototype = {
			
			onButtonDown:null,
			onButtonUp:null,
			/**
			 * Description
			 * @method setPosition
			 * @param {Number} x The x-axis position.
			 * @param {Number} y The y-axis position.
			 */
			initialize:function(){
				this.downButtons = [];
				this.tickDownButtons = [];
				this.isRecording = false;
				this.isPlaying = false;
			},





			/**
			 * Set As Main Player
			 * Attaches to on key down
			 */
			setAsMainPlayer:function(){
				document.onkeydown = Game.proxy(this.handleButtonDown, this);
				document.onkeyup = Game.proxy(this.handleButtonUp, this);
				
				this.isRecording = true;
				this.records = {};
				this.recordingQueue = [];
				this.isMainPlayer = true;
			},





			/**
			 * Handle Button Down
			 */
			handleButtonDown:function(e){
				var code = this.getInternalCode(e.keyCode);
				if(typeof code === 'string' && code !== 'r'){
					e.preventDefault();
				}
				this.setButtonDown(code, true);
			},






			/**
			 * Handle Button Up
			 */
			handleButtonUp:function(e){
				e.preventDefault();				
				var code = this.getInternalCode(e.keyCode);
				this.setButtonUp(code, true);		
			},


			/**
			 * Get Internal Code
			 * @param  {[type]} keyCode [description]
			 * @return {[type]}         [description]
			 */
			getInternalCode:function(keyCode){
				return KEY_MAP[keyCode] || keyCode;
			},





			/**
			 * Manually set multiple buttons down.
			 * @method setButtonsDown
			 * @param {String|Number} args Pass multiple arguments to set multiple buttons down with one call.
			 */
			setButtonsDown: function(buttons, userAction) {
				var userAction = userAction ? true : false;

				for (var i= 0, l=buttons.length; i<l; i++) {
					this.setButtonDown(buttons[i], userAction);
				}
			},
			




			
			/**
			 * Set Button Up
			 */
			setButtonUp:function(code, userAction){
				var userAction = userAction ? true : false;

				if(this.downButtons[code] === true){
					
					if(this.isRecording === true && KEYS_TO_RECORD.indexOf(code) !== -1 && userAction){
						this.recordingQueue.push(code + '_up');
					}

					if (this.onButtonUp) { 
						this.onButtonUp(code);
					}

					this.downButtons[code] = false;
				}
			},





			/**
			 * Set Button Down
			 */
			setButtonDown:function(code,userAction){

				var userAction = userAction ? true : false;
				if(this.downButtons[code] !== true){
					
					if(this.isRecording === true && KEYS_TO_RECORD.indexOf(code) !== -1 && userAction){
						this.recordingQueue.push(code + '_down');
					}
					
					if (this.onButtonDown) { 
						this.onButtonDown(code);
					}

					this.downButtons[code] = true;
				}
			},




			/**
			 * IsButtonDown
			 */
			isButtonDown:function(code){
				return this.tickDownButtons[code] === true;
			},




			/**
			 * Get Down Buttons
			 */
			getDownButtons:function(){
				var btns = [];
				for (var n in this.tickDownButtons) {
					if (this.tickDownButtons[n]) { 
						btns.push(n);
					}
				}
				return btns;
			},




			/**
			 * [reset description]
			 * @return {[type]} [description]
			 */
			reset:function(){
				this.downButtons = {};
				this.tickDownButtons = {};
				PREVIOUS_DOWN_BUTTONS = [];
			},





			/**
			 * [update description]
			 * @return {[type]} [description]
			 */
			update:function(){

				if(this.isRecording){
					this.updateRecording();
				}
				
				if(this.isPlaying){
					this.updatePlayback();
				}

				this.tickDownButtons = $.extend({}, this.downButtons);
				
				if(this.isMainPlayer){
					PREVIOUS_DOWN_BUTTONS = this.getDownButtons();
				}

				if(Game.ticks >= this.playbackTime){
					this.player.complete = true;
				}
			},




			/**
			 * [updateRecording description]
			 * @return {[type]} [description]
			 */
			updateRecording:function(){

				var recordingQueue = this.recordingQueue;
				var records = this.records;

				var recordCount = recordingQueue.length;
				var time = Game.ticks;

				for(var i = 0; i < recordCount; i++){
					var key = recordingQueue.pop();
					if(!records[key]){
						records[key] = [];
					}
					records[key].push(time);
				}
			},





			/**
			 * Load Playback
			 * @return {[type]} [description]
			 */
			loadPlayback:function(recording, run_ticks, player){
				this.isPlaying = true;
				this.player = player;
				this.playback = JSON.parse(recording);
				this.playbackTime = run_ticks;
			},





			/**
			 * [updatePlayback description]
			 * @return {[type]}        [description]
			 */
			updatePlayback:function(){

				var time = Game.ticks;
				var playback = this.playback;

				for(var keyIndex in KEYS_TO_RECORD){

					var key = KEYS_TO_RECORD[keyIndex];
					var key_up = key + '_up';
					var key_down = key + '_down';
					
					if(typeof playback[key_up] !== 'undefined'){
						if(playback[key_up].indexOf(time) !== -1){
							this.setButtonUp(key);
						}
					}

					if(typeof playback[key_down] !== 'undefined'){
						if(playback[key_down].indexOf(time) !== -1){
							this.setButtonDown(key);
						}
					}
				}
			},



			getRecordingString:function(){
				return JSON.stringify(this.records);
			}

			
		}
		
		namespace.GamePad = GamePad;
			
}(Game.Utils = Game.Utils||{}));