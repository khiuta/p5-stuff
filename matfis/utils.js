export class vector2{
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

    /**Cross-products between two vectors */
    cross(vec){
        let res = this.x * vec.y - this.y * vec.x;

        return res;
    }

    /**Projects this vector into another vector */
    projection(vec){
        let dot = this.dot(vec);
        let vecmag_squared = vec.dot(vec);
        let aux = dot / vecmag_squared;
        let res = vec.multScalarNew(aux);

        return res;
    }

    /**Calculates the reflection of the vector based on the axis.
     * @param {string} axis - 0 is for axis X. 1 is for axis Y
     * @returns {vector2} reflection vector of this vector
     */
    reflection(axis){
        let aux = [this.x, this.y];
        let matrix = 0;
        if(axis == 'x'){ matrix = [[1, 0], [0, -1]] }
        else matrix = [[-1, 0], [0, 1]];

        let tmp = [0, 0];
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < 2; j++){
                tmp[i] += matrix[i][j] * aux[j];
            }
        }
        let result = new vector2(tmp[0], tmp[1]);

        return result;
    }

    /**Draws a line representing the vector, starting at the origin */
    show(origin){
        line(origin.x, origin.y, this.x, this.y);
    }
}