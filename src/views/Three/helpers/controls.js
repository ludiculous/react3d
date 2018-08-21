import * as THREE from 'three';

// pointerlockchange.bind(this)

    // document.addEventListener( 'pointerlockchange', pointerlockchange, false );
    // document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
    // document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
    // document.addEventListener( 'pointerlockerror', pointerlockerror, false );
    // document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
    // document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
export function createPointLockControls() {
    this.camera.rotation.set( 0, 0, 0 );
    this.controls = new PointerLockControls(this.camera);
    this.scene.add(this.controls.getObject());
}

export function pointerlockchange ( event ) {
    let element = document.body;
    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
        this.controlsEnabled = true;
        this.controls.enabled = true;
        //blocker.style.display = 'none';
    } else {
        this.controls.enabled = false;
        //blocker.style.display = 'block';
        //instructions.style.display = '';
    }
};

export function directionControls() {
    console.log("direction Controls init")
    this.direction = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.moving.moveForward = false;
    this.moving.moveBackward = false;
    this.moving.moveLeft = false;
    this.moving.moveRight = false;
    this.moving.canJump = false;

    document.addEventListener( 'keydown', onKeyDown.bind(this), false );
    document.addEventListener( 'keyup', onKeyUp.bind(this), false );

}

function onKeyDown(event) {
    console.log(event)
    switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
            console.log('moving forward on keyDown')
            this.moving.moveForward = true;
            break;
        case 37: // left
        case 65: // a
            this.moving.moveLeft = true; break;
        case 40: // down
        case 83: // s
            this.moving.moveBackward = true;
            break;
        case 39: // right
        case 68: // d
            this.moving.moveRight = true;
            break;
        // case 32: // space
        //     if ( canJump === true ) this.velocity.y += 350;
        //     canJump = false;
        //     break;
        }
};

function onKeyUp(event ) {
    switch( event.keyCode ) {
        case 38: // up
        case 87: // w
            console.log('moving forward on keyUp')
            this.moving.moveForward = false;
            break;
        case 37: // left
        case 65: // a
            this.moving.moveLeft = false;
            break;
        case 40: // down
        case 83: // s
            this.moving.moveBackward = false;
            break;
        case 39: // right
        case 68: // d
            this.moving.moveRight = false;
            break;
    }
};


let prevTime = performance.now();

export function animateDirection() {
    let time = performance.now();

    let delta = ( time - prevTime ) / 1000;

    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;
    this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    this.direction.z = Number( this.moving.moveForward ) - Number( this.moving.moveBackward );
    this.direction.x = Number( this.moving.moveLeft ) - Number( this.moving.moveRight );
    this.direction.normalize(); // this ensures consistent movements in all directions

    // checks if the direction is true or if a certain key was pressed
    if ( this.moving.moveForward ||this.moving.moveBackward ) {
      this.velocity.z -= this.direction.z * 400.0 * delta;
      this.controls.getObject().translateZ( this.velocity.z * delta );
      console.log(this.velocity.z)
    }
    if ( this.moving.moveLeft || this.moving.moveRight ) {
      this.velocity.x -= this.direction.x * 400.0 * delta;
      this.controls.getObject().translateX( this.velocity.x * delta );
    }

    //this.controls.getObject().translateY( this.velocity.y * delta );

    prevTime = time;
}

export function pointerlockerror ( event ) {
    console.log(event)
    //instructions.style.display = '';
};

class PointerLockControls {
    constructor(camera){
        this.camera = camera;
        this.enabled = false;
        this.yawObject = new THREE.Object3D();
        this.pitchObject = new THREE.Object3D();
        this.PI_2 = Math.PI / 2;
        this.init();
    }

    initPitch() {
        console.log(this.camera)
        console.log("initialized pitch")
        this.pitchObject.add(this.camera);
    }

    initYaw() {
        console.log("initialized yaw")
        this.yawObject.position.y = 10;
        this.yawObject.add(this.pitchObject );
    }

    initMouse() {
        document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
    }

    onMouseMove( event ) {
        //if ( scope.enabled === false ) return;
        let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.yawObject.rotation.y -= movementX * 0.002;
        this.pitchObject.rotation.x -= movementY * 0.002;
        this.pitchObject.rotation.x = Math.max( - this.PI_2, Math.min( this.PI_2, this.pitchObject.rotation.x ) );
    };

    dispose() {
        document.removeEventListener( 'mousemove', this.onMouseMove.bind(this), false );
    };

    getObject() {
        return this.yawObject;
    };

    getDirection() {
        let direction = new THREE.Vector3( 0, 0, - 1 );
        let rotation = new THREE.Euler( 0, 0, 0, 'YXZ' );

        return function (v) {
            rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );
            v.copy(direction).applyEuler(rotation);

            return v;
        };
    }

    init(){
        this.initPitch()
        this.initYaw()
        this.initMouse()
    }
};