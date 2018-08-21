import * as THREE from 'three';

export function create_ambientLight() {
    this.lights.AmbientLight = new THREE.AmbientLight( 0x202020);
    this.lights.AmbientLight.intensity = 2;
    this.scene.add(this.lights.AmbientLight);

    this.lights.PointLight = new THREE.PointLight(0xffffff);
    this.scene.add(this.lights.PointLight);

    console.log(this.lights);
}

export function create_areaLight() {
    let width = 10;
    let height = 10;
    let intensity = 1;
    let rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
    rectLight.position.set( 5, 5, 5 );
    rectLight.lookAt( 0, 0, 0 );
    this.scene.add( rectLight )

    let rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
    this.scene.add( rectLightHelper );
}