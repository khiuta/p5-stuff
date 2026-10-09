let shapeColor = 255;
let shapeText = "Hello p5";

let loopCount = 4;

function setup() {
    const canvas = createCanvas(1280, 720);
    canvas.parent('canvas-container');

    // --- Dynamic Loop Count Input (0 to 4) ---
    let loopInput = addSidebarInput("Circle Count (0-4)", loopCount, (val) => {
        let num = parseInt(val);
        if (!isNaN(num)) {
            loopCount = constrain(num, 0, 4);
        }
    });
    loopInput.attribute('type', 'number');
    loopInput.attribute('min', '0');
    loopInput.attribute('max', '4');

    // --- Inputs & Controls for Paths, Sizes, Speeds, Directions, and Clearing Traces ---
    for (let i = 0; i < 4; i++) {
        addSidebarCheckbox(`Orbit ${i + 1} Trace`, paths[i], (checked) => {
            paths[i] = checked;
        });

        addSidebarButton(`Clear Orbit ${i + 1} Trace`, () => {
            orbit_paths[i].path = [];
        });

        addSidebarInput(`Orbit ${i + 1} Size`, sizes[i].toString(), (val) => {
            let num = parseFloat(val);
            if (!isNaN(num)) sizes[i] = num;
        });

        addSidebarInput(`Orbit ${i + 1} Speed`, speeds[i].toString(), (val) => {
            let num = parseFloat(val);
            if (!isNaN(num)) speeds[i] = num;
        });

        addSidebarInput(`Orbit ${i + 1} Direction (1 / -1)`, directions[i].toString(), (val) => {
            let num = parseFloat(val);
            if (!isNaN(num)) directions[i] = num;
        });
    }
}

function addSidebarCheckbox(labelText, defaultVal, callback) {
  const row = createDiv();
  row.class('button-row');
  row.parent('sidebar');

  const chk = createCheckbox('', defaultVal);
  chk.parent(row);
  chk.changed(() => callback(chk.checked()));

  const label = createSpan(labelText);
  label.parent(row);

  return chk;
}

function addSidebarButton(labelText, callback) {
  const row = createDiv();
  row.class('button-row');
  row.parent('sidebar');

  const btn = createButton('Action');
  btn.parent(row);
  btn.mousePressed(callback);

  const label = createSpan(labelText);
  label.parent(row);

  return btn;
}

// Helper for input + top label
function addSidebarInput(labelText, defaultVal, callback) {
  const col = createDiv();
  col.class('input-col');
  col.parent('sidebar');

  const label = createElement('label', labelText);
  label.parent(col);

  const inp = createInput(defaultVal);
  inp.parent(col);
  inp.input(() => callback(inp.value()));

  return inp;
}

class vec2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class circle2d {
    constructor(vec2, radius){
        this.x = vec2.x;
        this.y = vec2.y;
        this.radius = radius;
    }
}

class orbit_tracing {
    constructor(orbit_angle, orbit_speed, orbit_distance, stroke_weight, color){
        this.orbit_angle = orbit_angle;
        this.orbit_speed = orbit_speed;
        this.orbit_distance = orbit_distance;
        this.stroke_weight = stroke_weight;
        this.color = color;
        this.path = []
    }
}

function draw_circle(circle2d){
    for(let i = 0; i < 359; i++){
        radian = i * Math.PI / 180
        lx = circle2d.radius * Math.cos(radian);
        ly = circle2d.radius * Math.sin(radian);
        point(circle2d.x + lx, circle2d.y - ly);
    }
}


// orbit_distance is how far away from the circle the orbit is, 0 is just the circle surface area
function orbit_coord(circ, orbit_distance, angle){
    radian = angle * Math.PI / 180
    lx = (circ.radius + orbit_distance) * Math.cos(radian);
    ly = (circ.radius + orbit_distance) * Math.sin(radian);
    return [circ.x + lx, circ.y - ly]
}

function draw_orbit_path(path){
    noFill()
    strokeWeight(3)
    beginShape();
    for (let pt of path) {
        vertex(pt.x, pt.y);
    }
    endShape();
}

function orbiting_circle(circ, angle, size, tracing_point = null){
    coords = orbit_coord(circ, circ.radius * size, angle)
    new_circ_center = new vec2(coords[0], coords[1])
    new_circle = new circle2d(new_circ_center, circ.radius * size)
    draw_circle(new_circle)

    if (tracing_point){
        strokeWeight(tracing_point.stroke_weight)
        stroke(tracing_point.color)
        coords = orbit_coord(new_circle, tracing_point.orbit_distance, tracing_point.orbit_angle)
        px = coords[0]
        py = coords[1]
        point(px, py)
        tracing_point.path.push(new vec2(px, py))
        draw_orbit_path(tracing_point.path)
        tracing_point.orbit_angle += tracing_point.orbit_speed
    }
    strokeWeight(1)
    stroke('black')

    return new_circle
}

function random_jitter(){
    return Math.random() + 1
}

c1_center = new vec2(640, 360)
c1 = new circle2d(c1_center, 80)

orbit_angle = 0
orbit_angle2 = 0
orbit_angle3 = 0
orbit_angle4 = 0
orbit_speed = 1
orbits_complete = 0
op = new orbit_tracing(0, 2, 0, 10, 'red')
op2 = new orbit_tracing(0, 4, 0, 8, 'purple')
op3 = new orbit_tracing(0, 8, 0, 6, 'blue')
op4 = new orbit_tracing(0, 16, 0, 4, 'green')

circles = []
orbit_angles = [orbit_angle, orbit_angle2, orbit_angle3, orbit_angle4]
paths = [false, false, true, false]
orbit_paths = [op, op2, op3, op4]
sizes = [.9, .5, .7, 1]
speeds = [1, 2, 4, 8]
directions = [-1, 1, -1, 1]
circles[0] = c1


function draw() {
    background(255);
    // drawing the 2 circles
    stroke('black')
    strokeWeight(1)
    draw_circle(c1);
    
    for(let i = 0; i < loopCount; i++){
        if(paths[i]){
            circles[i+1] = orbiting_circle(circles[i], orbit_angles[i], sizes[i], orbit_paths[i])
        } else {
            circles[i+1] = orbiting_circle(circles[i], orbit_angles[i], sizes[i])
        }
    }
    
    orbit_angles[0] += speeds[0] * directions[0]
    orbit_angles[1] += speeds[1] * directions[1]
    orbit_angles[2] += speeds[2] * directions[2]
    orbit_angles[3] += speeds[3] * directions[3]
    if (orbit_angle >= 359) {
        orbits_complete++
    }
}