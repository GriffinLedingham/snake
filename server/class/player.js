function Player(id) {
  this.id = id; // default value

  //-1 means this player needs to join a game to initialize
  this.tail = -1;
  this.room = -1;
  this.posX = -1;
  this.posY = -1;
}

// class functions
Player.prototype.getID = function() {
    console.log(this.id);
};

// export the class
module.exports = Player;