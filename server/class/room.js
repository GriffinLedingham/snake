function Room(id) {
  this.id = id
  this.players = 0; // default value
}

// class functions
Room.prototype.getID = function() {
    console.log(this.id);
};

// export the class
module.exports = Room;