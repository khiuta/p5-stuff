import { vector2 } from '../utils.js'

const W = 1200;
const H = 800;

const Interactions = Object.freeze({
    RANDOM_VEC:  "r",
    POP_VEC: "Backspace",
    SUM_VECS: "s"
});

function setup() {
    createCanvas(W, H);
}

let has_clicked = false;
let has_typed = false;

let aux_points = []
let vecs = []
let vecs_origins = []

/**Returns the sum of all vectors */
function sum_vectors(vecs){
    let tmp = new vector2(vecs[0].x, vecs[0].y);

    for(let i = 1; i < vecs.length; i++){
        tmp.sumSelf(vecs[i]);
    }

    console.log(vecs);
    console.log(tmp);

    return tmp;
}

function draw() {
    background(220);

    if(keyIsPressed){
        if(!has_typed){
            has_typed = true;
            if(key == Interactions.POP_VEC){
                vecs.pop();
                vecs_origins.pop();
            }
            else if(key == Interactions.RANDOM_VEC){
                let x1 = Math.random() * W;
                let y1 = Math.random() * H;
                let x2 = Math.random() * W;
                let y2 = Math.random() * H;
                let dx = x2 - x1;
                let dy = y2 - y1;

                let tmp = new vector2(dx, dy);
                vecs.push(tmp);
                vecs_origins.push({x: x1, y: y1});
            }
            else if(key == Interactions.SUM_VECS){
                let tmp = sum_vectors(vecs);
                vecs.push(tmp);
                vecs_origins.push({x: vecs_origins[0].x, y: vecs_origins[0].y})
            }
        }
    } else has_typed = false;

    if(mouseIsPressed){
        if(!has_clicked){ 
            has_clicked = true;
            aux_points.push([mouseX, mouseY]);
        }
    } else has_clicked = false; 

    if(aux_points.length >= 2){
        let dx = aux_points[1][0] - aux_points[0][0];
        let dy = aux_points[1][1] - aux_points[0][1];
        
        let tmp = new vector2(dx, dy);
        vecs.push(tmp);
        vecs_origins.push({x: aux_points[0][0], y: aux_points[0][1]})
        aux_points = []
    }

    for(let i = 0; i < vecs.length; i++){
        vecs[i].show(vecs_origins[i])
    }
}




window.setup = setup;
window.draw = draw;