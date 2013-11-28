function Power(id,type,posX,posY) {
    this.id = id;

    this.type = type;
    this.posX = posX;
    this.posY = posY;
}

// class functions
Power.prototype.getID = function() {
    console.log(this.id);
};

// export the class
module.exports = Power;