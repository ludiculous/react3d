import React, { Component } from 'react'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {createKeyBoardControls, createLight, renderSphere, createParametric, renderSpline } from './helpers';


class Three extends Component {
  constructor(props) {
    super(props)
    this.scene = {};
    this.camera = {};
    this.light = {};
    this.controls = {};
    this.objects = [];
    this.materials = {};
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);


    this.mouseX = 0;
    this.mouseY = 0;
    this.rotationSpeedX = 0;
    this.rotationSpeedY = 0;
    this.rotationSpeedZ = 0;


    document.addEventListener('mousemove', (e)=>{
      let xhalf = window.innerWidth / 2;
      let yhalf = window.innerHeight / 2;
       console.log("moving mouse")

      this.mouseX = e.offsetX - xhalf;
      this.mouseY = e.offsetY - yhalf;
    });
  }

  componentDidMount() {
    this.createContext();
    this.createGridHelper();
    renderSpline.call(this);
    createParametric.call(this);
    this.start();
    console.log(this.scene)
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  componentWillMount() {

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
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // camera.position.x = 1200;
    // camera.position.y = 500;
    camera.position.x = 0;
    camera.position.z = 4;
    camera.lookAt(scene.position);

    let light = new THREE.DirectionalLight();
    light.position.set(1200, 1200, 1200);

    this.light = light;
    scene.add(light);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.createGUI();
    this.mount.appendChild(this.renderer.domElement)
  }

  handleCameraPos() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
  }

  animate() {
    let timer = Date.now() * 0.0001;
    this.handleCameraPos();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    //console.log(this.scene)
    window.scene = this.scene;
    this.renderer.render(this.scene, this.camera);
  }

  createGUI() {
    let self = this;
    let gui = new dat.GUI();
      gui.add(this, 'rotationSpeedX', -0.2, 0.2)
      gui.add(this, 'rotationSpeedY', -0.2, 0.2)
      gui.add(this, 'rotationSpeedZ', -0.2, 0.2)
  }

  createGridHelper() {
    let helper = new THREE.GridHelper( 1000, 40, 0x303030, 0x303030 );
    helper.position.y = - 75;
    this.scene.add( helper );
  }


  render() {
    return (
      <div
        style={{ width: window.innerWidth, height: window.innerHeight }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Three