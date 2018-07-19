import * as THREE from 'three';

export function renderSpline() {
    let numPoints = 100;
    // define how many vertices is used
    let start = new THREE.Vector3(-100, 0, 0);
    let middle = new THREE.Vector3(0, 30, 0);
    let end = new THREE.Vector3(20, 0, 0);
    // takes three parameters start of x change in y end of x
    let curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);
    //TubeGeometry path, tubularSegments, radius, radial segments, closed
    let tubeGeo = new THREE.TubeGeometry(curveQuad, numPoints, 2, 20, false);
    let tubeMaterial = new THREE.MeshNormalMaterial({opacity: 0.6, transparent: true });
    let tubeMesh = new THREE.Mesh(tubeGeo, tubeMaterial);
    this.scene.add(tubeMesh);

}

export function renderSphere() {
    // width, height, height
    console.log("rendering sphere")
    let sphereGeometry = new THREE.SphereGeometry( .3, .3, .3 );
    // material for non-shiny surfaces
    let sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00
    })
    let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //sphereMesh.receiveShadow = true;
    sphereGeometry.verticesNeedUpdate;
    this.scene.add(sphereMesh)
    sphereMesh.position.set(0,0,1)

    console.log(sphereMesh)
    this.objects.push(sphereMesh)
}

export function renderCube() {
    let colors = ['#F85359'];
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

export function createLight() {

}

export function mergeGeometry() {
    let scaled = Math.random()
    // container object
    let mergedGeometry = new THREE.Geometry();
    let mergeMaterial =  new THREE.MeshNormalMaterial({
      opacity: 0.5,
      transparent: true
    });

    for (let i = 0; i<500; i++){
      let cubeGeometry = new THREE.BoxGeometry(scaled, scaled, scaled);

      let translation = new THREE.Matrix4().makeTranslation(100*Math.random()-50,0, 100*Math.random()-50);
      cubeGeometry.applyMatrix(translation);
      mergedGeometry.merge(cubeGeometry);
    }

    let mesh = new THREE.Mesh(mergedGeometry, mergeMaterial);
    this.scene.add(mesh);
    this.objects.push(mesh);
}