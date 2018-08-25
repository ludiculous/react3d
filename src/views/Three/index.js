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
  createGPUParticles,
  createProtonSystem,
  spawnGPUParticles,
  createTrackBallCamera,
  createParticleEngine,
  //createStarSystem,
  createPointCloud,
  animateStarSystem,
  createCustomShader,
  orbit
} from './helpers';

class Three extends Component {
  constructor(props) {
    super(props)
    this.scene = {};
    this.renderer = {};
    this.date = null;

    this.clock = new THREE.Clock();
    this.tick = 0;
    this.options = {};
    this.spawnerOptions = {};
    this.particleSystem = {};
    this.engine;
    this.starfield = {};
    this.xOffset = Math.floor(Math.random() * Math.floor(20));
    this.yOffset = Math.floor(Math.random() * Math.floor(20));
    this.zOffset = Math.floor(Math.random() * Math.floor(20));


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

    this.water = {};
    this.customUniforms = {};
  }

  componentDidMount() {
    this.createContext();
    loadRocks.call(this);
    create_ambientLight.call(this);
    createOrbitCamera.call(this);
    createTrackBallCamera.call(this);

    this.createGridHelper();
    //loadSkyBox.call(this);
    //create_areaLight.call(this);
    //createCustomShader.call(this);
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
    //animateStarSystem.call(this);
    let delta = this.clock.getDelta();

    if(this.customUniforms.hasOwnProperty("time")) {
      console.log(this.customUniforms)
      this.customUniforms.time.value += delta;
    }
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