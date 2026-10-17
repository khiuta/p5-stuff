import { vector2 } from '../utils.js'

const W = 800;
const H = 600;

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
                let x1 = Math.random(0, W) * W;
                let y1 = Math.random(0, H) * H;
                let x2 = Math.random(0, W) * W;
                let y2 = Math.random(0, H) * H;
                let tmp = new vector2(x2, y2);
                vecs.push(tmp);
                vecs_origins.push({x: x1, y: y1});
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
        let tmp = new vector2(aux_points[1][0], aux_points[1][1]);
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