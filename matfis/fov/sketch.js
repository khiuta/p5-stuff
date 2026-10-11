const W = 1366;
const H = 768;

function setup() {
    createCanvas(W, H);
}

function deg_to_rad(deg){
    rad = deg * Math.PI/180;

    return rad;
}

function rad_to_deg(rad){
    deg = rad * 180/Math.PI;

    return deg;
}

function cos_between_vec(u, v){
    let uv = u.dot(v);
    let umag = mag(u.x, u.y);
    let vmag = mag(v.x, v.y);
    let den = umag*vmag;
    let res = uv / den;

    return res;
}

function sin_between_vec(u, v){
    let num = cross_prod_2d(u, v);
    let umag = mag(u.x, u.y);
    let vmag = mag(v.x, v.y);
    let den = umag*vmag;
    let res = num / den;

    return res;
}

function cross_prod_2d(u, v){
    let res = u.x * v.y - u.y * v.x;

    return res;
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
        let tmp = createVector(1, 0);
        let looking_at_angle = Math.atan2(cross_prod_2d(tmp, this.looking_at), tmp.dot(this.looking_at));
        let fov_angle_rad = deg_to_rad(this.angle / 2);
        this.start_angle = looking_at_angle - fov_angle_rad;
        this.end_angle = looking_at_angle + fov_angle_rad;
    }

    showFOV() {
        fill(this.color);
        arc(this.pos.x, this.pos.y, this.range * 2, this.range * 2, this.start_angle, this.end_angle);
    }

    searchTargets(targets){
        let i = 1;
        let seen_enemies = 0;
        targets.forEach(t => {
            let tmp = createVector(t.x - this.pos.x, t.y - this.pos.y)
            let xaxis = createVector(1, 0);
            let t_angle = Math.atan2(cross_prod_2d(xaxis, tmp), xaxis.dot(tmp));
            text(`Angle: ${rad_to_deg(t_angle)}`, 100, 20*i);
            i++;
            let dist_to_tgt = mag(t.x - this.pos.x, t.y - this.pos.y);
            if(dist_to_tgt <= this.range && t_angle > this.start_angle && t_angle < this.end_angle){
                seen_enemies++;
            }
        });
        if(seen_enemies) this.color = 'red';
        text(`Start angle: ${rad_to_deg(this.start_angle)}`, 100, 100);
        text(`End angle: ${rad_to_deg(this.end_angle)}`, 100, 120);
        text(`Seen enemies: ${seen_enemies}`, 100, 140)
    }
}

let col = 'blue'

function draw() {
    background(220);
    stroke('black');
    strokeWeight(1);

    let c1 = createVector(550, 500);
    let c2 = createVector(750, 320);
    let c3 = createVector(550, 300);
    let c4 = createVector(750, 480);
    let targets = [c1, c2, c3, c4];
    let cam1 = new viewer(200, 60, W/2, H/2, col);
    cam1.setLookingAt(mouseX, mouseY);
    cam1.searchTargets(targets);
    cam1.showFOV();
    
    targets.forEach(t => {
        fill('black');
        text('target', t.x - 10, t.y + 20);
        fill('green');
        circle(t.x, t.y, 10);    
    })
}
