import React, { Component } from 'react'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {
  createCamera,
  createOrbitCamera,
  loadSkyBox,
  loadRocks,
  snowDay,
  animateSnow,
  create_flowmap,
  pointToCamera,
  animateDirection,
  applyVideoMaterial,
  updateVideoMaterial,
  renderSpheres,
  renderCubes,
  create_areaLight,
  create_ambientLight,
  bounce,
  orbit
} from './helpers';

class Three extends Component {
  constructor(props) {
    super(props)
    this.scene = {};
    this.renderer = {};
    this.date = null;
    this.backgroundMesh = {};
    this.backgroundScene = {};
    this.backgroundCamera = {};
    this.camera = {};
    this.lights = {};

    this.raycaster = null;
    this.objects = [];
    this.spheres = [];
    this.point_parameters = [];
    this.materials = [];
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
    this.mouse = {};
    this.mouseX = 0;
    this.mouseY = 0;
    this.rotationSpeedX = 0;
    this.rotationSpeedY = 0;
    this.rotationSpeedZ = 0;

    this.controlsEnabled = false;
    this.moving = {};
    this.controls = {};
    this.direction = {};
    this.velocity = {};
    this.step = 0;
    this.media = {};
    this.enableZoom = true;
    this.zoomSpeed = 1.0;
  }

  componentDidMount() {
    this.createContext();
    create_ambientLight.call(this);
    createOrbitCamera.call(this);
    create_areaLight.call(this);
    // How far you can dolly in and out ( PerspectiveCamera only )
    this.createGridHelper();
    loadSkyBox.call(this);

    //generateParticleSystem.call(this);
    // snowDay.call(this);
    // renderCubes.call(this);
    // renderSpheres.call(this);
    loadRocks.call(this);

    this.start();
    console.log(this.scene)
    console.log(this.objects)
    console.log(this.materials)
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
    this.camera.position.z = 100;
    //let light = new THREE.DirectionalLight();
    //light.position.set(1200, 1200, 1200);

    //this.light = light;
    //scene.add(light);

    this.scene = scene;
    this.renderer = renderer;
    //this.createGUI();
    this.mount.appendChild(this.renderer.domElement)
  }

  animate() {
    //handleCameraPos.call(this);
    //stepObj.call(this);
    // animateSnow.call(this);
    // bounce.call(this);
    // orbit.call(this);
    //updateVideoMaterial.call(this);
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);

  }

  renderScene() {
    //this.renderer.render(this.backgroundScene, this.backgroundCamera);
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