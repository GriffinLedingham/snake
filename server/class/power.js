function Power(posX,posY,id) {
	this.id = id;

    this.type = 'food';
    this.posX = posX;
    this.posY = posY;
}

// class functions
Power.prototype.getID = function() {
    console.log(this.id);
};

// export the class
module.exports = Power;