import * as THREE from 'three';
import {Water2} from '../sources/objects/Water2.js';
import Water from 'assets/textures/water.jpg';
import Cloud from 'assets/textures/cloud.png';
import Water_flow1 from 'assets/textures/Water_1_M_Flow.jpg';
import Water_Normal1 from 'assets/textures/Water_1_M_Normal.jpg';
import FloorChecker from 'assets/textures/FloorsCheckerboard_S_Diffuse.jpg';
import {vertex_shader} from './water_vertex.js';
import {fragment_shader} from './water_fragment.js';

// this.water = {};
// this.customUniforms = {};

export function animateFlowMap() {
    let delta = this.clock.getDelta();

    if(this.customUniforms.hasOwnProperty("time")) {
      console.log(this.customUniforms)
      this.customUniforms.time.value += delta;
    }
}


export function createCustomShader() {
    console.log(vertex_shader);
    console.log(fragment_shader);

    let noiseTexture = new THREE.TextureLoader().load(Cloud);

    noiseTexture.wrapS = THREE.RepeatWrapping;
    noiseTexture.wrapT = THREE.RepeatWrapping;

    let waterTexture = new THREE.TextureLoader().load(Water);
    // wrapS defines how the texture is wrapped horizontally, wrapT(vertically)
    // Reapeat Wrapping is an infinite loop;
    waterTexture.wrapS = THREE.RepeatWrapping;
    waterTexture.wrapT = THREE.RepeatWrapping;

    this.customUniforms = {
        baseTexture:    { type: "t", value: waterTexture },
        baseSpeed:      { type: "f", value: 1.15 },
        noiseTexture:   { type: "t", value: noiseTexture },
        noiseScale:     { type: "f", value: 0.2 },
        alpha:          { type: "f", value: 0.8 },
        time:           { type: "f", value: 1.0 }
    }

    let waterMaterial = new THREE.ShaderMaterial({
        uniforms: this.customUniforms,
        // first to run receives attributes, calculates / maniupulates the
        // position of each individual vertex
        vertexShader: [
            "varying vec2 vUv;",
            "void main() ",
            "{",
                "vUv = uv;",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
            "}"
        ].join( "\n" ),

        fragmentShader: [
            "uniform sampler2D baseTexture;",
            "uniform float baseSpeed;",
            "uniform sampler2D noiseTexture;",
            "uniform float noiseScale;",
            "uniform float alpha;",
            "uniform float time;",
            "varying vec2 vUv;",
            "void main() ",
            "{",
                "vec2 uvTimeShift = vUv + vec2( -0.7, 1.5 ) * time * baseSpeed;  ",
                "vec4 noiseGeneratorTimeShift = texture2D( noiseTexture, uvTimeShift );",
                "vec2 uvNoiseTimeShift = vUv + noiseScale * vec2( noiseGeneratorTimeShift.r, noiseGeneratorTimeShift.b );",
                "vec4 baseColor = texture2D( baseTexture, uvNoiseTimeShift );",
                "baseColor.a = alpha;",
                "gl_FragColor = baseColor;",
            "}"
        ].join( "\n" )

    });

    waterMaterial.side = THREE.DoubleSide;
    waterMaterial.transparent = true;

    let flatGeometry = new THREE.PlaneGeometry(100, 100);
    let surface = new THREE.Mesh(flatGeometry, waterMaterial);
    surface.position.set(0,0,0);

    this.scene.add(surface);
    console.log(waterMaterial)

}

export function createFlowmap() {
    let self = this;
    let textureLoader = new THREE.TextureLoader();

    let groundGeometry = new THREE.PlaneBufferGeometry( 20, 20, 10, 10 );
    let groundMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
    let ground = new THREE.Mesh( groundGeometry, groundMaterial );
        ground.rotation.x = Math.PI * - 0.5;

    textureLoader.load( FloorChecker, function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        map.repeat.set( 4, 4 );
        groundMaterial.map = map;
        groundMaterial.needsUpdate = true;
    });

    this.scene.add( ground );


    let waterGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
    let flowMap = textureLoader.load(Water_flow1);
    console.log(flowMap);

    self.water = new Water2(waterGeometry, {
        scale: 2,
        textureWidth: 1024,
        textureHeight: 1024,
        flowMap:flowMap
    });

    self.water.position.y = 1;
    self.water.rotation.x = Math.PI * - 0.5;
    self.scene.add(self.water);


    console.log(flowMap)
    let helperGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
    let helperMaterial = new THREE.MeshBasicMaterial( { map: flowMap } );
    let helper = new THREE.Mesh( helperGeometry, helperMaterial );
    helper.position.y = 1.01;
    helper.rotation.x = Math.PI * - 0.5;
    helper.visible = false;
    self.scene.add( helper );


    console.log(self.water);
}