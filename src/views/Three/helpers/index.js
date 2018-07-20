import * as THREE from 'three';
// import * as OBJLoader from 'three-obj-loader-es6';
// import * as MTLLoader from 'three-mtl-loader';
export * from './text';
export * from './terrain';
export * from './algo';
export * from './primitives';

export function loadModel() {
  let Loader = new THREE.JSONLoader();
  Loader.load('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/TechnicLEGO_CAR_1.mtl', function(materials) {
      materials.preload();

      let objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(' https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/TechnicLEGO_CAR_1.obj', function(obj) {
          this.scene.add(obj)
      })
  });
}

export function createKeyBoardControls() {

    document.onkeydown = (e)=>{
      e.preventDefault();
      console.log(e)
      this.objects.forEach((item)=>{
          switch(e.keyCode) {
          case 37:
          item.rotation.x += 0.1;
          break;

          case 38:
          item.rotation.z -= 0.1;
          break;

          case 39:
          item.rotation.x -= 0.1;
          break;

          case 40:
          item.rotation.z += 0.1;
          break;
        }
      });
    }
}

