const W = 1366;
const H = 768;

function setup() {
    createCanvas(W, H);
}

function deg_to_rad(deg){
    rad = deg * Math.PI/180;

    return rad;
}

class viewer{
    constructor(view_range, view_angle, posX, posY, color){
        this.range = view_range;
        this.angle = view_angle;
        this.pos = createVector(posX, posY);
        this.looking_at = createVector(1, 0); // initiate looking right
        this.color = color;
        this.start_angle = -Math.PI / 6; // hardcoded for 60 degrees view angle
        this.end_angle = Math.PI / 6; // same
    }

    getX() {
        return this.pos.x;
    }
    getY() {
        return this.pos.y;
    }
    getLkX() {
        return this.looking_at.x;
    }
    getLkY() {
        return this.looking_at.y;
    }
    getRange() {
        return this.range;
    }
    getAngle() {
        return this.angle;
    }

    setLookingAt(x, y){
        this.looking_at.x = x - this.pos.x;
        this.looking_at.y = y - this.pos.y;
        // recalculates bounding angles
        let looking_at_angle = Math.atan2(this.looking_at.y, this.looking_at.x);
        let fov_angle_rad = deg_to_rad(this.angle / 2);
        this.start_angle = looking_at_angle - fov_angle_rad;
        this.end_angle = looking_at_angle + fov_angle_rad;
    }

    showFOV() {
        fill(this.color);
        arc(this.pos.x, this.pos.y, this.range * 2, this.range * 2, this.start_angle, this.end_angle);
    }

    searchTargets(targets){
        let start_cos = Math.cos(this.start_angle);
        let end_cos = Math.cos(this.end_angle);
        targets.forEach(t => {
            let aux = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
            aux = Math.cos(aux);
            let dist_to_tgt = mag(t.x - this.pos.x, t.y - this.pos.y);
            if(dist_to_tgt < this.range && aux > end_cos && aux < start_cos){
                this.color = 'red';
            } else this.color = 'blue';
        });
    }
}

let col = 'blue'

function draw() {
    background(220);
    stroke('black');
    strokeWeight(1);

    let c1 = createVector(650, 400);
    let cam1 = new viewer(200, 60, W/2, H/2, col);
    cam1.setLookingAt(mouseX, mouseY);
    cam1.searchTargets([c1]);
    cam1.showFOV();
    
    fill('black');
    text('target', c1.x, c1.y + 20);
    fill('green');
    circle(c1.x, c1.y, 10);
}
