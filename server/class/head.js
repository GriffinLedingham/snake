function Head(posX,posY) {
    this.pos = new Vector2(posX,posY);
    this.last_pos = new vector2(posX,posY);

    this.child = null;
    this.food = false;
}

// class functions
Head.prototype.getPosX = function() {
    console.log(this.posX);
};

Head.prototype.getPosY = function() {
    console.log(this.posY);
};

Head.prototype.update = function(direction) {
    this.last_pos.equ(this.pos);
    this.pos.inc(direction);
    this.child.update();

    if(this.food === true)
    {
        if(this.child === null)
        {
            this.child = new Body(this.last_pos.X(),this.last_pos.Y(),this);
        }
        else
        {
            this.child.food = true;
            this.food = false;
        }
    }
};

// export the class
module.exports = Head;