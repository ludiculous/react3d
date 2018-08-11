import * as THREE from 'three';
import brickMaterial from 'assets/3d/Brick-2399.jpg';
import brickBump from 'assets/3d/Brick-2399-bump-map.jpg';

// create a geometry in the primitive file


export function applyBumpMaterial() {
    let cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
    let BumpMaterial = new THREE.MeshPhongMaterial();
    BumpMaterial.map = THREE.ImageUtils.loadTexture(brickMaterial);
    BumpMaterial.bumpMap = THREE.ImageUtils.loadTexture(brickBump);

    let bumpCube = new THREE.Mesh(cubeGeometry, BumpMaterial);
    this.scene.add(bumpCube);
}

export function applyCanvasMaterial() {
    let canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;

}

export function applyVideoMaterial() {

}