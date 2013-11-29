var grid_width = 57;
var grid_height = 30;

function Head(posX,posY) {
    this.pos = new Vector2(posX,posY);
    this.last_pos = new Vector2(posX,posY);

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
    
    if(this.pos.X() > grid_width-1)
    {
        this.pos.x = 0;
    }

    if(this.pos.Y() > grid_height-1)
    {
        this.pos.y = 0;
    }

    if(this.pos.X() < 0)
    {
        this.pos.x = grid_width-1;
    }

    if(this.pos.Y() < 0)
    {
        this.pos.y = grid_height-1;
    }

    if(this.child !== null)
    {
        //this.child.update();
    }

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

    return {x:this.pos.X(),y:this.pos.Y()};
};

// export the class
module.exports = Head;