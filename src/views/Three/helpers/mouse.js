import * as THREE from 'three';

export function createRaycaster() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    this.mouse = mouse;
    // class representing a 2d vector
    // which can be used to represent a number of things
    // point in 2d space
    raycaster.setFromCamera(this.mouse, this.camera);
    let intersects = raycaster.intersectObjects(this.scene.children);

    for (var i =0; i < intersects.length; i++) {
        intersects[i].object.material.color.set( 0xff0000 )
    }

}