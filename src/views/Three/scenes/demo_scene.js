import React, { Component } from 'react'
import * as THREE from 'three';
import * as dat from 'dat.gui';
import {
  createCamera,
  createOrbitCamera,
  loadSkyBox,
  create_areaLight,
  create_ambientLight,
  createTrackBallCamera,
  loadRocks,
  loadShip,
  createPointCloud,
  satellite
} from '../helpers';



class Three extends Component {
  constructor(props) {
    super(props)
    this.scene = {};
    this.renderer = {};
    this.date = Date.now() * 0.0001;

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


    this.spacecrafts = [];
    this.aliens = [];
    this.animator = {}
    this.a = 0;
    this.r = 100;
    this.da = 1;

    this.game;
  }

  componentDidMount() {
    this.createContext();
    // loadRocks.call(this);
    // loadShip.call(this);
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
    this.mount.appendChild(this.renderer.domElement)
  }

  animate() {

    this.game.update(this.date);
    // if(this.spacecrafts.length > 0) {
    //   satellite.call(this, this.spacecrafts[0]);
    // }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);

  }

  renderScene() {
    //this.renderer.render(this.backgroundScene, this.backgroundCamera);
    this.renderer.render(this.scene, this.camera);
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