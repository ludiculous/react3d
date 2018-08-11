function createMatrix() {
    let translationMatrix = new THREE.Matrix4(
        1, 0, 0, this.x,
        0, 1, 0, this.y,
        0, 0, 1, this.z,
        0, 0, 0, 1
    )
}

function doTranslation() {
    new THREE.Matrix4().makeTranslation(3,3,3);

}

function doScale(cube) {
  var scaleMatrix = new THREE.Matrix4(
    this.x, 0, 0, 0,
    0, this.y, 0, 0,
    0, 0, this.z, 0,
    0, 0, 0, 1
  );

  cube.geometry.applyMatrix(scaleMatrix);
  cube.geometry.verticesNeedUpdate = true;
}

function doShearing (cube) {
  var scaleMatrix = new THREE.Matrix4(
    1, this.a, this.b, 0,
    this.c, 1, this.d, 0,
    this.e, this.f, 1, 0,
    0, 0, 0, 1 );
    cube.geometry.applyMatrix(scaleMatrix);
    cube.geometry.verticesNeedUpdate = true;
}

function doRotationY (cube) {
  var c = Math.cos(this.theta),
  s = Math.sin(this.theta);
  var rotationMatrix = new THREE.Matrix4(
    c, 0, s, 0,
    0, 1, 0, 0, -s, 0, c, 0,
    0, 0, 0, 1
  );
  cube.geometry.applyMatrix(rotationMatrix);
  cube.geometry.verticesNeedUpdate = true;
}