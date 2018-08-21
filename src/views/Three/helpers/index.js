import * as THREE from 'three';
export * from './terrain';
export * from './algo';
export * from './primitives';
export * from './particles';
export * from './camera';
export * from './transform';
export * from './audio';
export * from './mouse';
export * from './material';
export * from './environment';
export * from './controls';
export * from './animations';
export * from './lights';
export * from './model';
export * from './flowmap';

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

