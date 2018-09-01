import React, { Component } from 'react';
import * as THREE from 'three';
import {
    create_ambientLight,
    createOrbitCamera,
    createGrid
} from '../../helpers';


class SpaceScene extends Component {
    constructor(props) {
        super(props);
        this.scene = {};
        this.renderer = {};
        this.camera = {};
    }

    componentDidMount() {
        this.createContext();

        create_ambientLight.call(this);
        createOrbitCamera.call(this);
        createGrid.call(this);
        //loadSkyBox.call(this);
        this.start();
        console.log(this.scene)
        console.log(this.objects)

    }

    componentWillMount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    componentWillUnmount() {

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
        renderer.autoClear = false;

        createCamera.call(this);
        this.camera.position.z = 500;
        this.scene = scene;
        this.renderer = renderer;
        this.mount.appendChild(this.renderer.domElement);
    }

    animate() {
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
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

export default SpaceScene;
