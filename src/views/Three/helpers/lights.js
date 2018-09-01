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

export function createLightShadow() {
    const SHADOW_MAP_WIDTH = window.innerWidth / 2;
    const SHADOW_MAP_HEIGHT = window.innerHeight / 2;

    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    let root = new THREE.Object3D;
    // color, intensity
    let directionalLight = new THREE.DirectionalLight( 0xffffff, 1);
    let spotLight = new THREE.SpotLight(0xffffff)


    root.add(spotLight);
    root.add(directionalLight);

    spotLight.castShadow = true;
    spotLight.shadowCameraNear = 1;
    spotLight.shadowCameraFar = 200;
    spotLight.shadowCameraFov = 45;
    spotLight.shadowDarkness = 0.5;
    spotLight.shadowMapWidth = SHADOW_MAP_WIDTH;
    spotLight.shadowMapHeight = SHADOW_MAP_HEIGHT;

    let ambientLight = new THREE.AmbientLight(0x888888);
    root.add(ambientLight)

    this.scene.add(root);
}