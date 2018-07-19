import * as THREE from 'three';

export function createParametric() {
    // ParametricVector(slices, stacks)
    // slices increase the amount of horizontal countour lines per stack/section

    let paraGeo = new THREE.ParametricGeometry(parametricVector, 100, 100);
    // A material for shiny surfaces with specular highlights.
    let paraMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
    });

    let paraMesh = new THREE.Mesh(paraGeo, paraMaterial);
    paraMesh.position.x = 0;
    paraMesh.position.z = 0;
    paraMesh.position.y = 0;

    this.scene.add(paraMesh);
}

function parametricVector(u0, v0, target) {
    //u0, v0 are values between 0 and 1

    let a = 3;
    let n = 3;
    let m = 1;

    let u = u0 * 4 * Math.PI;
    let v = v0 * 2 * Math.PI;

    let x = (a + Math.cos(n * u / 2.0)
     * Math.sin(v) - Math.sin(n * u / 2.0)
     * Math.sin(2 * v)) * Math.cos(m * u / 2.0);

    let y = (a + Math.cos(n * u / 2.0)
     * Math.sin(v) - Math.sin(n * u / 2.0)
     * Math.sin(2 * v)) * Math.sin(m * u / 2.0);

    let z = Math.sin(n * u / 2.0)
     * Math.sin(v) + Math.cos(n * u / 2.0)
     * Math.sin(2 * v);

    return target.set(x, y, z);
}