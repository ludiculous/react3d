import React, { Component } from 'react'
import * as THREE from 'three'
//import * as dat from 'dat'

let mouseX = 0;
let mouseY = 0;

class Three extends Component {
  constructor(props) {
    super(props)
    this.scene = {};
    this.camera = {};
    this.controls = {};
    this.objects = [];
    this.materials = {};
    this.particles = [];
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);

  }

  componentDidMount() {

    // on component mount derive width and height from the ref element
    // document.addEventListener('mousemove', (e)=>{
    //       windowHalfX = window.innerWidth / 2;
    //       windowHalfY = window.innerHeight / 2;
    //       mouseX = e.clientX ;
    //       mouseY =  e.clientY;

    // }, false);
    this.createContext();
    this.createGridHelper();

    this.renderParticles();
    //this.renderCube();
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
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
      item.rotation.x += 0.01 * Math.random() * i + .01
      item.rotation.y += 0.01 * Math.random() * i + .01
      //item.position.set(timer + i * .01, timer + i * .01, timer + i * .01)
    })


    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {

    this.renderer.render(this.scene, this.camera)
  }


  renderCube() {
    let colors = ['#F85359', '#FEEDEE', '#edfefd'];
    const geometry = new THREE.BoxGeometry(.3,.3,.3)

    for(let i =0; i< colors.length; i++) {
      let material = new THREE.MeshBasicMaterial({ color: colors[i] })
      let cube = new THREE.Mesh(geometry, material)

      this.scene.add(cube)
      cube.position.set(0 + i,1,1)
      console.log(cube);
      this.objects.push(cube)
    }
    console.log(this.objects)
    //this.cube = cube
  }

  renderParticles() {


     // this.scene.remove(particles);
  }

  updateParticles() {


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