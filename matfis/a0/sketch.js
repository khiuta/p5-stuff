const W = 1200;
const H = 600;
const scale = 50;

function setup() {
    createCanvas(W, H);
}

function arrow(u, v){
    let triW = 5;
    let t1 = 0;
    let t2 = 0;
    let end_of_line = 0;
    // arrow pointing to first quadrant
    if(v.x > u.x && v.y < u.y){
        let v_copy = {x: v.x - triW, y: v.y + triW}
        t1 = {x: v_copy.x - triW/2, y: v_copy.y - triW/2};
        t2 = {x: v_copy.x + triW/2, y: v_copy.y + triW/2};
        end_of_line = {x: v.x + triW, y: v.y - triW};
    } else if(v.x > u.x && v.y > u.y){
        // arrow pointing to fourth quadrant
        let v_copy = {x: v.x - triW, y: v.y - triW};
        t1 = {x: v_copy.x + triW/2, y: v_copy.y - triW/2};
        t2 = {x: v_copy.x - triW/2, y: v_copy.y + triW/2};
        end_of_line = {x: v.x + triW, y: v.y + triW};
    } else if(v.x < u.x && v.y < u.y){
        // arrow pointing to second quadrant
        let v_copy = {x: v.x + triW, y: v.w + triW};
        t1 = {x: v_copy.x + triW/2, y: v_copy.y - triW/2};
        t2 = {x: v_copy.x - triW/2, y: v_copy.y + triW/2};
        end_of_line = {x: v.x - triW, y: v.y - triW};
    } else if(v.x < u.x && v.y > u.y){
        // arrow pointing to third quadrant
        let v_copy = {x: v.x + triW, y: v.y - triW};
        t1 = {x: v_copy.x - triW/2, y: v_copy.y - triW/2};
        t2 = {x: v_copy.x + triW/2, y: v_copy.y + triW/2};
        end_of_line = {x: v.x - triW, y: v.y + triW};
    }

    line(u.x, u.y, v.x, v.y);
    fill('blue');
    triangle(t1.x, t1.y, t2.x, t2.y, v.x, v.y);
    fill(0);
}

function draw() {
    background(220);

    v1 = createVector(W/2 + 1 * scale, H/2 - 3 * scale);
    v2 = createVector(W/2 + 4 * scale, H/2 - 1 * scale);

    strokeWeight(2);
    line(0, H/2, W, H/2);
    line(W/2, 0, W/2, H);
    strokeWeight(1);
    for(let i = 0; i < W; i+=scale){
        text(`${(i - W/2)/scale}`, i, H/2);
        line(i, 0, i, H);
    }
    for(let j = 0; j < H; j+=scale){
        text(`${(j - H/2)/scale * -1}`, W/2, j);
        line(0, j, W, j);
    }

    stroke('blue');
    arrow(v1, v2);
    fill('blue');
    circle(v1.x, v1.y, 5);
    circle(v2.x, v2.y, 5);
    fill(-1);
    stroke('black');
    text('A', v1.x + 10, v1.y);
    text('B', v2.x + 10, v2.y);
}
