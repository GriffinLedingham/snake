function Body(posX,posY,parent) {
    this.pos = new vector2(posX,posY);
    this.last_pos = new vector2(posX,posY);

    this.parent = parent;
    this.child = null;

    this.food = false;
}

// class functions
Body.prototype.X = function() {
    return this.pos.X();
};

Body.prototype.Y = function() {
    return this.pos.Y();
};

Body.prototype.addFood = function(){
    this.food = true;  
};

Body.prototype.update = function(){
    this.last_pos.equ(this.pos);
    this.pos.equ(this.parent.pos);

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
module.exports = Body;