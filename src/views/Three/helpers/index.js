import * as THREE from 'three';
export * from './text';
export * from './terrain';
export * from './algo';
export * from './primitives';

function loadTexture (textureUrl){
  // 1st fn is the success cb, 2nd is error
  let texture = THREE.ImageUtils.loadTexture(textureUrl, null,
    (res)=>{return null},
    (err)=>{return null}
  );
}

function loadModel() {
  // 1st fn is the success cb, 2nd is error
  let jsonLoader = new THREE.JSONLoader();
 // jsonLoader.load(carModel, (res)=>{console.log(res)}, null)
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

