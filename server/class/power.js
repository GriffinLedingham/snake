function Power(id,type,posX,posY) {
    this.id = id;

    this.type = type;
    this.posX = posX;
    this.posY = posY;
}

// class functions
Room.prototype.getID = function() {
    console.log(this.id);
};

// export the class
module.exports = Room;