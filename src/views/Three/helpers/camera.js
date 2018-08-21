import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';

export function createOrbitCamera() {
    let Orbitcontrol = new OrbitControls(this.camera, this.renderer.domElement);
    Orbitcontrol.minPolarAngle = 0;
    Orbitcontrol.maxPolarAngle = Math.PI;
    Orbitcontrol.minDistance = 0;
    Orbitcontrol.maxDistance = Infinity;
    Orbitcontrol.enableZoom = true;
    OrbitControls.zoomSpeed = 1.0;
}

export function pointToCamera() {
     document.addEventListener('mousemove', (e)=>{
      let xhalf = window.innerWidth / 2;
      let yhalf = window.innerHeight / 2;

      this.mouseX = e.offsetX - xhalf;
      this.mouseY = e.offsetY - yhalf;
    });
}

export function createCamera(){
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.x = 0;
    camera.position.z = 4;
    if(this.objects.length > 0) camera.lookAt(this.objects[0].position);

    this.camera = camera;
}

export function createOCamera() {
    const camera = new THREE.OrthographicCamera();
    // define boundaries
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;

    camera.near = 0.1;
    camera.far = 150;


    camera.updateProjectionMatrix();
    camera.position.x = -50;
    camera.position.y = 20;
    camera.position.z = 30;
    this.camera = camera;
}

export function handleCameraPos() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.objects[0].position);
}

export function zoomCamera() {
    // to zoom we must determine the distance from the camera to the object and its height
    //box helper shows the world-axis
    let offset = 1.25;

    let obj = this.objects[0];
    //let helper = new THREE.BoxHelper(obj);
    let boundingBox = new THREE.Box3();
    // updates the helper's geometry to mathc the dimensions of the obj
    boundingBox.setFromObject(obj)
    let center = boundingBox.getCenter();
    let size = boundingBox.getSize();
    console.log(size);
    let maxDim = Math.max(size.x, size.y, size.z);
    let fov = this.camera.fov * (Math.PI / 180);
    console.log(fov)
    let cameraZ = Math.abs(maxDim / 4 * Math.tan(fov * 2));
    console.log(cameraZ)
    //24496859029793056
    cameraZ *= offset // slight zoom out
    this.camera.position.z = 20;
    console.log(boundingBox.min)
    let minZ = boundingBox.min.z;
    let cameraToFarEdge = (minZ < 0) ? -minZ + cameraZ : cameraZ - minZ;

    //this.camera.far = cameraToFarEdge * 3;
    this.camera.updateProjectionMatrix();


    console.log(boundingBox)
    // calculate bounds given a sphere measurement
    //let boundingSphere = helper.box.getBoundingSphere();
}

