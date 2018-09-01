import * as THREE from 'three';

export function startRaycaster() {
    let self = this;
    populateGroup(self);
    this.raycaster = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector3();

    window.addEventListener( "mousemove", onDocumentMouseMove.bind(this), false );

}

function onDocumentMouseMove(e) {
    // trigger window event
    e.preventDefault();
    let self = this;
    let layerX = e.layerX;
    let layerY =  e.layerY;


    let intersects = getIntersects(self, layerX, layerY);
    //console.log(intersects);
    if(this.selectedObject) {
        this.selectedObject.material.color.set( '#7777ff' );
        this.selectedObject = null;
    }

    if ( intersects.length > 0 ) {
        let res = intersects.filter(( res )=> {
            return res && res.object;
        } )[ 0 ];

        if ( res && res.object ) {
            this.selectedObject = res.object;
            this.selectedObject.material.color.set( '#f00' );
        }
    } else {

    }
}

function getIntersects(self, x, y) {
    x = ( x / window.innerWidth ) * 2 - 1;
    y = - ( y / window.innerHeight ) * 2 + 1;
    self.mouseVector.set( x, y, 0.5 );

    self.raycaster.setFromCamera( self.mouseVector, self.camera );
    //console.log(self.object_wrapper)
    return self.raycaster.intersectObject( self.object_wrapper, true );
}


function populateGroup(self) {

    for(let i=0; i<4; i++) {
        let geometry = new THREE.PlaneGeometry( 5, 20, 32 );
        let material = new THREE.MeshBasicMaterial( {color: 0x7777ff, side: THREE.DoubleSide} );
        let plane = new THREE.Mesh( geometry, material );
        let rad = Math.PI * Math.floor(Math.random() * Math.floor(i * 3))
        let x = Math.floor(Math.random() * Math.floor(i * 10))
        let y = Math.floor(Math.random() * Math.floor(i * 5))
        let z = Math.floor(Math.random() * Math.floor(i * 20))

        self.scene.add(self.object_wrapper);
        self.object_wrapper.add(plane);

        //console.log( self.object_wrapper)
        plane.rotateX(rad)
        plane.position.set(x, y, z);

    }
}