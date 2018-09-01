import * as THREE from 'three';
import {FresnelShader} from 'three-full';

export function createFresnel() {
    // creates an array of bubbles

    let shader = FresnelShader;
    let path = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/Park2/';
    let path2 = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cube/skybox/';

    let urls = [
        path + 'posx.jpg',
        path + 'negx.jpg',
        path + 'posy.jpg',
        path + 'negy.jpg',
        path + 'posz.jpg',
        path + 'negz.jpg'
    ];

    let urls2 = [
        path2 + 'px.jpg',
        path2 + 'nx.jpg',
        path2 + 'py.jpg',
        path2 + 'ny.jpg',
        path2 + 'pz.jpg',
        path2 + 'nz.jpg'
    ]


    let textureCube = new THREE.CubeTextureLoader().load(urls2);

    //Uniform Utilities. Support merging and cloning of uniform variables

    // set skybox to that of the texture cube
    this.scene.background = textureCube;



    let uniforms = THREE.UniformsUtils.clone(shader.uniforms)

    uniforms["tCube"].value = textureCube;

    let material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader
    });

    let geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );

    for ( let i = 0; i < 500; i ++ ) {
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 10000 - 5000;
        mesh.position.y = Math.random() * 10000 - 5000;
        mesh.position.z = Math.random() * 10000 - 5000;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1;
        this.scene.add( mesh );
        this.bubbles.push( mesh );
    }

    this.scene.matrixAutoUpdate = false;
}

export function animateFresnel() {
    let timer = 0.0001 * Date.now();

    for ( let i = 0; i < this.bubbles.length; i ++ ) {
        let bubble = this.bubbles[ i ];
        bubble.position.x = 5000 * Math.cos( timer + i );
        bubble.position.y = 5000 * Math.sin( timer + i * 1.1 );
    }
}