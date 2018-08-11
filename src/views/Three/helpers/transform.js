import * as THREE from 'three';

let step = 0;

export function stepObj(){
    step += 0.02;
    this.objects[0].position.x = 0 + (10 * (Math.cos(step)));
    this.objects[0].position.y = 0.75 * Math.PI / 2 + (6 * Math.abs(Math.sin(step)));
}
