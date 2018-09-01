import * as THREE from 'three';

export function createGrid() {
    let helper = new THREE.GridHelper( 1000, 40, 0x303030, 0x303030 );
    helper.position.y = - 75;
    this.scene.add( helper );
}

export function createAxes() {
  let axes = new THREE.AxisHelper(20);
  this.scene.add(axes);
}

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

export function generateRandomSpheres () {
    for(let i =0; i < 100; i++) {
        let mesh = new THREE.Mesh( geometry, material );
        let geometry = new THREE.SphereBufferGeometry( 1, 4, 4 );
        let material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
        mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
        mesh.position.multiplyScalar( Math.random() * 400 );
        mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
        mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
        this.object_wrapper.add( mesh );
    }
}

export function renderSpheres() {
    // width, height, height
    for(let i =0; i < 99; i++) {
      let sphereSize = Math.ceil((Math.random() * 2));
      let sphereGeometry = new THREE.SphereGeometry( sphereSize, 32, 32 );
      sphereGeometry.heightSegments = false;
      // material for non-shiny surfaces
      // let sphereMaterial = new THREE.MeshBasicMaterial({
      //   color: 0xffff00
      // })
      //let sphereMaterial = new THREE.MeshDepthMaterial();
      let sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x7777ff,
        emissive: 0x000000
      });
      sphereMaterial.shininess = 15;
      sphereMaterial.metal = true;
      let sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      //sphereMesh.children[1].scale.set(0.99, 0.99, 0.99);
      //sphereMesh.receiveShadow = true;

      this.scene.add(sphereMesh)
      //sphereMesh.position.set(40,40,40)
      sphereMesh.position.set(0, (Math.random() * 20), (Math.random() * 20));
      this.spheres.push(sphereMesh)
    }
}

export function renderCubes() {
    let shapeTrans = Math.round((Math.random() * 20));

      for(let i =0; i < 99; i++) {
      let cubeSize = Math.ceil((Math.random() * 3));
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      let material =new THREE.MeshLambertMaterial({color:0x2194ce});
      let cube = new THREE.Mesh(geometry, material);

      this.scene.add(cube);

      cube.position.set(cubeSize + Math.random() * 20, Math.random() * 20, Math.random() * 20);
      this.objects.push(cube)
      }

    //this.cube = cube
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