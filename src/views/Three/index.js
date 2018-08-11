import React, { Component } from 'react'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {
  applyBumpMaterial,
  createCamera,
  createOCamera,
  handleCameraPos,
  createKeyBoardControls,
  createLight,
  generateParticleSystem,
  stepObj,
  zoomCamera,
  loadSkyBox
} from './helpers';


class Three extends Component {
  constructor(props) {
    super(props)
    this.scene = {};
    this.backgroundMesh = {};
    this.backgroundScene = {};
    this.backgroundCamera = {};
    this.camera = {};
    this.light = {};
    this.controls = {};
    this.objects = [];
    this.materials = {};
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.mouse = {};
    this.mouseX = 0;
    this.mouseY = 0;
    this.rotationSpeedX = 0;
    this.rotationSpeedY = 0;
    this.rotationSpeedZ = 0;


    document.addEventListener('mousemove', (e)=>{
      let xhalf = window.innerWidth / 2;
      let yhalf = window.innerHeight / 2;

      this.mouseX = e.offsetX - xhalf;
      this.mouseY = e.offsetY - yhalf;
    });
  }

  componentDidMount() {
    this.createContext();
    this.createGridHelper();
    generateParticleSystem.call(this);
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

    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // to allow multiple renders
    renderer.autoClear = false;

    createCamera.call(this);

    let light = new THREE.DirectionalLight();
    light.position.set(1200, 1200, 1200);

    this.light = light;
    scene.add(light);


    loadSkyBox.call(this);
    this.scene = scene;
    this.renderer = renderer;
    this.createGUI();
    this.mount.appendChild(this.renderer.domElement)
  }

  animate() {
    let timer = Date.now() * 0.0001;
    handleCameraPos.call(this);

    stepObj.call(this);
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    //console.log(this.scene)
    window.scene = this.scene;
    this.renderer.render(this.backgroundScene, this.backgroundCamera);
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