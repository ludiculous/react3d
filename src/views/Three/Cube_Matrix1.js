import React, { Component } from 'react'
import * as THREE from 'three';
import * as dat from 'dat.gui';
// import carMaterial from 'assets/3d/TechnicLEGO_CAR_1.mtl';
// import carModel from 'assets/3d/TechnicLEGO_CAR_1.obj';
import {createKeyBoardControls, renderSphere, renderCube, mergeGeometry} from './helpers';


class Three extends Component {
  constructor(props) {
    super(props)
    this.scene = {};
    this.camera = {};
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

      this.mouseX = e.offsetX - xhalf;
      this.mouseY = e.offsetY - yhalf;
    });
  }

  componentDidMount() {

    this.createContext();
    this.createGridHelper();
    renderCube.call(this);
    //renderSphere.call(this);
    mergeGeometry.call(this);
    createKeyBoardControls.call(this);
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
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight

    // define the scene it requires a scene, camera, and a renderer
    const scene = new THREE.Scene()
    // set camera location
    // the cameras arguments[0]
    // FOV is the extent of the scene that is seen on the display at any given moment, value is in degrees
    //
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000 )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    // define cube

    camera.position.z = 4

    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.createGUI();
    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  handleCameraPos() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);
  }

  animate() {
    let timer = Date.now() * 0.0001;

    this.objects.forEach((item, i)=>{
      item.rotation.x += this.rotationSpeedX;
      item.rotation.y += this.rotationSpeedY;
      item.rotationSpeedZ += this.rotationSpeedZ;
    });
    this.handleCameraPos();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    //console.log(this.scene)
    window.scene = this.scene
    this.renderer.render(this.scene, this.camera)
  }

  createGUI() {
    let self = this;
    // let control = ()=> {
    //   this.rotationSpeedX = self.rotationSpeedX;
    //   this.rotationSpeedY = self.rotationSpeedY;
    //   this.rotationSpeedZ = self.rotationSpeedZ;;
    // }

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