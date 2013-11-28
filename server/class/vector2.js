    function Vector2(pX, pY){
        this.initialize(pX, pY);    
    }

    Vector2.prototype = {

        initialize:function(pX,pY){
            this.x = pX;
            this.y = pY;
        },

        lenSqr:function(){
            return Math.pow(this.x,2) + Math.pow(this.y,2);
        },


        mag:function(){
            return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
        },

        dot:function(p){
            return this.x * p.x + this.y * p.y;
        },

        factor:function(p){
            return new Vector2(this.x * p, this.y * p);
        },

        dec:function(p){
            this.x -= p.x;
            this.y -= p.y;
        },

        inc:function(p){
            this.x += p.x;
            this.y += p.y;
        },

        add:function(p){
            return new Vector2(this.x + p.x, this.y + p.y);
        },

        sub:function(p){
            return new Vector2( this.x - p.x, this.y - p.y);
        },

        equ:function(p){
            this.x = p.x;
            this.y = p.y;
        },

        X:function(){
            return this.x;
        },

        Y:function(){
            return this.y;
        }


    }

module.exports = Vector2;