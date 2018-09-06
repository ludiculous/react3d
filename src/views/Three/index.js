import React, { Component } from 'react';
import * as THREE from 'three';
import {
    createCamera,
    create_ambientLight,
    createOrbitCamera,
    createGrid,
    initAssetLoader,
    generateGroundTile,
    createLightShadow,
    generateRandomSpheres,
    createPostProcessing,
    startRaycaster

} from './helpers';


class Three extends Component {
    constructor(props) {
        super(props);

        this.scene = {};
        this.renderer = {};
        this.composer = {};
        this.camera = {};
        this.lights = {};
        this.clock = new THREE.Clock();
        this.bubbles = [];
        this.objects = [];


        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);

        // raycaster
        this.selected_object = {};
        this.raycaster = {};
        this.mouseVector = {};

        this.space_objects = [];
        this.floor_tiles = [];
        this.object_wrapper = new THREE.Group();
    }

    componentDidMount() {
        this.createContext();

        createLightShadow.call(this);
        create_ambientLight.call(this);
        createOrbitCamera.call(this);
        createGrid.call(this);
        generateRandomSpheres.call(this);
        startRaycaster.call(this);
        //generateGroundTile.call(this)
        //initAssetLoader.call(this);
        //loadSkyBox.call(this);

        createPostProcessing.call(this);
        window.space_objects = this.space_objects;
        window.floor_tiles = this.floor_tiles;
        this.start();
        console.log(this.scene)
        console.log(this.objects)

    }

    componentWillMount() {

    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    start() {
        if (!this.frameId) {
        // tells the browser you wish to perform an animation request
        this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    createContext() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;
        const scene = new THREE.Scene();

        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor(0x000000, 1.0);
        renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.autoClear = false;

        createCamera.call(this);
        this.scene = scene;
        this.renderer = renderer;
        this.mount.appendChild(this.renderer.domElement);
    }

    animate() {
        let delta = this.clock.getDelta();

        this.composer.render();
        //this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);


    }

    renderScene() {

        //this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
        <div
            style={{ width: window.innerWidth, height: window.innerHeight }}
            ref={(mount) => { this.mount = mount }}
          />
        );
    }
}

export default Three;
