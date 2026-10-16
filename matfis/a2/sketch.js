function setup() {
    createCanvas(800, 600);
}

class vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    /**Creates a new vector resulting from the sum of two vectors */
    sumNew(vec){
        let tmp = new vector2(this.x + vec.x, this.y + vec.y);

        return tmp;
    }

    /**Modifies the vector by adding the other vector coordinates */
    sumSelf(vec){
        this.x += vec.x;
        this.y += vec.y;
    }

    /**Creates a new vector resulting from the subtraction of two vectors */
    subNew(vec){
        let tmp = new vector2(this.x - vec.x, this.y - vec.y);

        return tmp;
    }

    /**Modifies the vector by subtracting from the other vector coordinates */
    subSelf(vec){
        this.x -= vec.x;
        this.y -= vec.y;
    }

    /**Invert the coordinates of the vector */
    inverse(vec){
        this.x = -this.x;
        this.y = -this.y;
    }

    /**Creates a new vector by multiplying with a scalar */
    multScalarNew(scalar){
        let tmp = new vector2(this.x * scalar, this.y * scalar);

        return tmp;
    }

    /**Modifies the vector by multiplying with a scalar */
    multScalarSelf(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }
    
    /**Dot product between two vectors */
    dot(vec){
        let res = this.x * vec.x + this.y * vec.y;

        return res;
    }
}

function draw() {
    background(220);
}
