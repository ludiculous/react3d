import * as THREE from 'three';
export * from './terrain';
export * from './algo';
export * from './primitives';
export * from './particles';

export function loadModel() {
  let Loader = new THREE.ObjectLoader()
  let self = this;

  Loader.load('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/TechnicLEGO_CAR_1.json', function(geo) {
    let Material = new THREE.MeshBasicMaterial({
      color: 0xffff00
    });
    console.log(geo);
    let group = new THREE.Group();
    group.add(geo);
    self.scene.add(group);
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

