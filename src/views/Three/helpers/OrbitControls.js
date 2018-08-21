import * as THREE from 'three';

export default class OrbitControls {
    constructor(object, domElement){
        this.object = object;
        this.domElement = ( domElement !== undefined ) ? domElement : document;
        this.enabled = true
        // "target" sets the location of focus, where the object orbits around
        this.target = new THREE.Vector3();
        this.minDistance = 0;
         // How far you can dolly in and out ( PerspectiveCamera only )
        this.maxDistance = Infinity;
        // How far you can zoom in and out ( OrthographicCamera only )
        this.minZoom = 0;
        this.maxZoom = Infinity;
        // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
        this.minPolarAngle = 0; // radians
        this.maxPolarAngle = Math.PI; // radians

        // How far you can orbit horizontally, upper and lower limits.
        // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
        this.minAzimuthAngle = - Infinity; // radians
        this.maxAzimuthAngle = Infinity; // radians

        // Set to true to enable damping (inertia)
        // If damping is enabled, you must call controls.update() in your animation loop
        this.enableDamping = false;
        this.dampingFactor = 0.25;

        // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
        // Set to false to disable zooming
        this.enableZoom = true;
        this.zoomSpeed = 1.0;

        // Set to false to disable rotating
        this.enableRotate = true;
        this.rotateSpeed = 1.0;

        // Set to false to disable panning
        this.enablePan = true;
        this.panSpeed = 1.0;
        this.screenSpacePanning = false; // if true, pan in screen-space
        this.keyPanSpeed = 7.0; // pixels moved per arrow key push

        // Set to true to automatically rotate around the target
        // If auto-rotate is enabled, you must call controls.update() in your animation loop
        this.autoRotate = false;
        this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
        // Set to false to disable use of the keys
        this.enableKeys = true;

        // The four arrow keys
        this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };
        // Mouse buttons
        this.mouseButtons = { LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT };
        this.target0 = this.target.clone();
        this.position0 = this.object.position.clone();
        this.zoom0 = this.object.zoom;
        // current position in spherical coordinates
        this.spherical = new THREE.Spherical();
        this.sphericalDelta = new THREE.Spherical();
        this.changeEvent = { type: 'change' };
        this.startEvent = { type: 'start' };
        this.endEvent = { type: 'end' };
        this.STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY_PAN: 4 };
        this.state = this.STATE.NONE;
        this.EPS = 0.000001;
        this.scale = 1;
        this.panOffset = new THREE.Vector3();
        this.zoomChanged = false;
        this.rotateStart = new THREE.Vector2();
        this.rotateEnd = new THREE.Vector2();
        this.rotateDelta = new THREE.Vector2();
        this.panStart = new THREE.Vector2();
        this.panEnd = new THREE.Vector2();
        this.panDelta = new THREE.Vector2();
        this.dollyStart = new THREE.Vector2();
        this.dollyEnd = new THREE.Vector2();
        this.dollyDelta = new THREE.Vector2();
        this.offset = new THREE.Vector3();
        this.quat = new THREE.Quaternion().setFromUnitVectors(this.object.up, new THREE.Vector3( 0, 1, 0 ) );
        this.position = this.object.position;
        //this.init();
    }

    getPolarAngle() {
        return this.spherical.phi;
    };

    getAzimuthalAngle() {
        return this.spherical.theta;
    };

    saveState() {
        this.target0.copy( this.target );
        this.position0.copy( this.object.position );
        this.zoom0 = this.object.zoom;
    };

    reset() {
        this.target.copy( this.target0 );
        this.object.position.copy( this.position0 );
        this.object.zoom = this.zoom0;
        this.object.updateProjectionMatrix();
        ED.dispatchEvent(this.changeEvent);
        this.update();
        this.state = this.STATE.NONE;
        console.log(this.state)
    };

    update() {
        console.log('just updated')
        // so camera.up is the orbit axis
        // sets this quarternion to the rotation required to rotate direction vector
        let quatInverse = this.quat.clone().inverse();
        let lastPosition = new THREE.Vector3();
        let lastQuaternion = new THREE.Quaternion();

        return ()=> {

            this.offset.copy(this.position ).sub(this.target );
            // rotate offset to "y-axis-is-up" space
            this.offset.applyQuaternion(this.quat);
            // angle from z-axis around y-axis
            this.spherical.setFromVector3(this.offset);

            if ( this.autoRotate && this.state === this.STATE.NONE ) {
                this.rotateLeft(this.getAutoRotationAngle() );
            }

            this.spherical.theta += this.sphericalDelta.theta;
            this.spherical.phi += this.sphericalDelta.phi;

            // restrict theta to be between desired limits
            this.spherical.theta = Math.max(this.minAzimuthAngle, Math.min( this.maxAzimuthAngle, this.spherical.theta ) );

            // restrict phi to be between desired limits
            this.spherical.phi = Math.max( this.minPolarAngle, Math.min( this.maxPolarAngle, this.spherical.phi ) );

            this.spherical.makeSafe();

            this.spherical.radius *= this.scale;

            // restrict radius to be between desired limits
            this.spherical.radius = Math.max( this.minDistance, Math.min( this.maxDistance, this.spherical.radius ) );

            // move target to panned location
            this.target.add(this.panOffset );

            this.offset.setFromSpherical(this.spherical);

            // rotate offset back to "camera-up-vector-is-up" space
            this.offset.applyQuaternion(quatInverse);

            this.position.copy( this.target ).add( this.offset );

            this.object.lookAt( this.target );

            if ( this.enableDamping === true ) {
                this.sphericalDelta.theta *= ( 1 - this.dampingFactor );
                this.sphericalDelta.phi *= ( 1 - this.dampingFactor );
                this.panOffset.multiplyScalar( 1 - this.dampingFactor );

            } else {
                this.sphericalDelta.set( 0, 0, 0 );
                this.panOffset.set( 0, 0, 0 );
            }

            this.scale = 1;

            // update condition is:
            // min(camera displacement, camera rotation in radians)^2 > EPS
            // using small-angle approximation cos(x/2) = 1 - x^2 / 8

            if ( this.zoomChanged || lastPosition.distanceToSquared( this.object.position ) > this.EPS || 8 * ( 1 - lastQuaternion.dot( this.object.quaternion ) ) > this.EPS ) {
                ED.dispatchEvent( this.changeEvent );
                lastPosition.copy( this.object.position );
                lastQuaternion.copy( this.object.quaternion );
                this.zoomChanged = false;
                return true;
            }
            return false;
        };

    };

    getAutoRotationAngle() {
        return 2 * Math.PI / 60 / 60 * this.autoRotateSpeed;
    }

    getZoomScale() {
        return Math.pow( 0.95, this.zoomSpeed );
    }

    rotateLeft( angle ) {
        this.sphericalDelta.theta -= angle;
    }

    rotateUp( angle ) {
        this.sphericalDelta.phi -= angle;
    }

    panLeft() {
        let v = new THREE.Vector3();
        return ( distance, objectMatrix ) => {
            v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
            v.multiplyScalar( - distance );
            this.panOffset.add( v );
        };
    }

    panUp() {
        let v = new THREE.Vector3();
        return ( distance, objectMatrix ) => {
            if ( this.screenSpacePanning === true ) {
                v.setFromMatrixColumn( objectMatrix, 1 );
            } else {
                v.setFromMatrixColumn( objectMatrix, 0 );
                v.crossVectors( this.object.up, v );
            }

            v.multiplyScalar( distance );
            this.panOffset.add( v );
        };
    };

    // deltaX and deltaY are in pixels; right and down are positive
    pan() {
        let offset = new THREE.Vector3();

        return ( deltaX, deltaY ) => {
            let element = this.domElement === document ? this.domElement.body : this.domElement;
            if ( this.object.isPerspectiveCamera ) {
                // perspective
                let position = this.object.position;
                offset.copy( position ).sub( this.target );
                let targetDistance = offset.length();
                // half of the fov is center to top of screen
                targetDistance *= Math.tan( ( this.object.fov / 2 ) * Math.PI / 180.0 );
                // we use only clientHeight here so aspect ratio does not distort speed
                this.panLeft( 2 * deltaX * targetDistance / element.clientHeight, this.object.matrix );
                this.panUp( 2 * deltaY * targetDistance / element.clientHeight, this.object.matrix );

            } else if ( this.object.isOrthographicCamera ) {
                // orthographic
                this.panLeft( deltaX * ( this.object.right - this.object.left ) / this.object.zoom / element.clientWidth, this.object.matrix );
                this.panUp( deltaY * ( this.object.top - this.object.bottom ) / this.object.zoom / element.clientHeight, this.object.matrix );

            } else {
                // camera neither orthographic nor perspective
                console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
                this.enablePan = false;
            }
        };
    };

    dollyIn( dollyScale ) {
        if ( this.object.isPerspectiveCamera ) {
            this.scale /= dollyScale;
        } else if ( this.object.isOrthographicCamera ) {
            this.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom * dollyScale ));
            this.object.updateProjectionMatrix();
            this.zoomChanged = true;
        } else {
            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
            this.enableZoom = false;
        }

    }

    dollyOut( dollyScale ) {
        if ( this.object.isPerspectiveCamera ) {
            this.scale *= dollyScale;
        } else if ( this.object.isOrthographicCamera ) {
            this.object.zoom = Math.max( this.minZoom, Math.min( this.maxZoom, this.object.zoom / dollyScale ) );
            this.object.updateProjectionMatrix();
            this.zoomChanged = true;

        } else {
            console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
            this.enableZoom = false;
        }
    }

    handleMouseDownRotate( event ) {
        //console.log( 'handleMouseDownRotate' );
        this.rotateStart.set( event.clientX, event.clientY );
    }

    handleMouseDownDolly( event ) {
        //console.log( 'handleMouseDownDolly' );
        this.dollyStart.set( event.clientX, event.clientY );
    }

    handleMouseDownPan( event ) {
        //console.log( 'handleMouseDownPan' );
        this.panStart.set( event.clientX, event.clientY );
    }

    handleMouseMoveRotate( event ) {
        //console.log( 'handleMouseMoveRotate' );
        this.rotateEnd.set( event.clientX, event.clientY );
        this.rotateDelta.subVectors( this.rotateEnd, this.rotateStart ).multiplyScalar( this.rotateSpeed );

        let element = this.domElement === document ? this.domElement.body : this.domElement;

        this.rotateLeft( 2 * Math.PI * this.rotateDelta.x / element.clientHeight ); // yes, height
        this.rotateUp( 2 * Math.PI * this.rotateDelta.y / element.clientHeight );
        this.rotateStart.copy(this.rotateEnd);
        this.update();

    }

    handleMouseMoveDolly( event ) {
        //console.log( 'handleMouseMoveDolly' );
        this.dollyEnd.set( event.clientX, event.clientY );
        this.dollyDelta.subVectors( this.dollyEnd, this.dollyStart );
        if ( this.dollyDelta.y > 0 ) {
            this.dollyIn( this.getZoomScale() );
        } else if ( this.dollyDelta.y < 0 ) {
            this.dollyOut( this.getZoomScale() );
        }
        this.dollyStart.copy( this.dollyEnd );
        this.update();
    }

    handleMouseMovePan( event ) {

        //console.log( 'handleMouseMovePan' );
        this.panEnd.set( event.clientX, event.clientY );
        this.panDelta.subVectors( this.panEnd, this.panStart ).multiplyScalar( this.panSpeed );
        this.pan( this.panDelta.x, this.panDelta.y );
        this.panStart.copy( this.panEnd );
        this.update();
    }

    handleMouseWheel( event ) {
        // console.log( 'handleMouseWheel' );
        if ( event.deltaY < 0 ) {
            this.dollyOut( this.getZoomScale() );
        } else if ( event.deltaY > 0 ) {
            this.dollyIn( this.getZoomScale() );
        }
       this.update();
    }

    handleKeyDown( event ) {
        //console.log( 'handleKeyDown' );
        switch ( event.keyCode ) {
            case this.keys.UP:
                this.pan( 0, this.keyPanSpeed );
                this.update();
                break;

            case this.keys.BOTTOM:
                this.pan( 0, - this.keyPanSpeed );
                this.update();
                break;

            case this.keys.LEFT:
                this.pan( this.keyPanSpeed, 0 );
                this.update();
                break;

            case this.keys.RIGHT:
                this.pan( - this.keyPanSpeed, 0 );
                this.update();
                break;
        }
    }

    handleTouchStartRotate( event ) {
        //console.log( 'handleTouchStartRotate' );
        this.rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    }



    handleTouchStartDollyPan( event ) {

        //console.log( 'handleTouchStartDollyPan' );
        if ( this.enableZoom ) {
            let dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
            let dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
            let distance = Math.sqrt( dx * dx + dy * dy );
            this.dollyStart.set( 0, distance );
        }

        if ( this.enablePan ) {
            let x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
            let y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );
            this.panStart.set( x, y );
        }

    }

    handleTouchMoveRotate( event ) {

        //console.log( 'handleTouchMoveRotate' );
        let element = this.domElement === document ? this.domElement.body : this.domElement;
        this.rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        this.rotateDelta.subVectors( this.rotateEnd, this.rotateStart ).multiplyScalar( this.rotateSpeed );

        this.rotateLeft( 2 * Math.PI * this.rotateDelta.x / element.clientHeight ); // yes, height
        this.rotateUp( 2 * Math.PI * this.rotateDelta.y / element.clientHeight );
        this.rotateStart.copy(this.rotateEnd );
        this.update();

    }

    handleTouchMoveDollyPan( event ) {

        //console.log( 'handleTouchMoveDollyPan' );

        if ( this.enableZoom ) {
            let dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
            let dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
            let distance = Math.sqrt( dx * dx + dy * dy );

            this.dollyEnd.set( 0, distance );
            this.dollyDelta.set( 0, Math.pow( this.dollyEnd.y / this.dollyStart.y, this.zoomSpeed ));
            this.dollyIn( this.dollyDelta.y );
            this.dollyStart.copy( this.dollyEnd );

        }

        if ( this.enablePan ) {

            let x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
            let y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

            this.panEnd.set( x, y );
            this.panDelta.subVectors( this.panEnd, this.panStart ).multiplyScalar( this.panSpeed );
            this.pan( this.panDelta.x, this.panDelta.y );

            this.panStart.copy( this.panEnd );

        }

        this.update();

    }

    handleMouseUp( event ) {
        console.log( 'handleMouseUp' );
    }

    handleTouchEnd( event ) {
        console.log( 'handleTouchEnd' );
    }

    onMouseDown( event ) {
        console.log(event)
        if ( this.enabled === false ) return;
            event.preventDefault();
        switch ( event.button ) {

            case this.mouseButtons.LEFT:

                if ( event.ctrlKey || event.metaKey ) {

                    if ( this.enablePan === false ) return;

                    this.handleMouseDownPan( event );
                    this.state = this.STATE.PAN;

                } else {

                    if ( this.enableRotate === false ) return;

                    this.handleMouseDownRotate( event );
                    this.state = this.STATE.ROTATE;

                }

                break;

            case this.mouseButtons.MIDDLE:

                if ( this.enableZoom === false ) return;

                this.handleMouseDownDolly( event );
                this.state = this.STATE.DOLLY;

                break;

            case this.mouseButtons.RIGHT:

                if ( this.enablePan === false ) return;

                this.handleMouseDownPan( event );
                this.state = this.STATE.PAN;

                break;

        }

        if ( this.state !== this.STATE.NONE ) {

            document.addEventListener( 'mousemove', this.onMouseMove.bind(this), false );
            document.addEventListener( 'mouseup', this.onMouseUp.bind(this), false );

            ED.dispatchEvent( this.startEvent );

        }

    }

    onMouseMove( event ) {

        if ( this.enabled === false ) return;

        event.preventDefault();

        switch ( this.state ) {

            case this.STATE.ROTATE:

                if ( this.enableRotate === false ) return;

                this.handleMouseMoveRotate( event );

                break;

            case this.STATE.DOLLY:

                if ( this.enableZoom === false ) return;

                this.handleMouseMoveDolly( event );

                break;

            case this.STATE.PAN:

                if ( this.enablePan === false ) return;

                this.handleMouseMovePan( event );

                break;

        }

    }

    onMouseUp( event ) {

        if ( this.enabled === false ) return;

        this.handleMouseUp( event );

        document.removeEventListener( 'mousemove', this.onMouseMove.bind(this), false );
        document.removeEventListener( 'mouseup', this.onMouseUp.bind(this), false );

        ED.dispatchEvent( this.endEvent );

        this.state = this.STATE.NONE;

    }

    onMouseWheel( event ) {

        if ( this.enabled === false || this.enableZoom === false || ( this.state !== this.STATE.NONE && this.state !== this.STATE.ROTATE ) ) return;

        event.preventDefault();
        event.stopPropagation();

        ED.dispatchEvent(this.startEvent );
        this.handleMouseWheel( event );
        ED.dispatchEvent(this.endEvent );

    }

    onKeyDown( event ) {

        if ( this.enabled === false || this.enableKeys === false || this.enablePan === false ) return;
        this.handleKeyDown( event );

    }

    onTouchStart( event ) {

        if ( this.enabled === false ) return;

        event.preventDefault();

        switch ( event.touches.length ) {

            case 1: // one-fingered touch: rotate

                if ( this.enableRotate === false ) return;

                this.handleTouchStartRotate( event );

                this.state = this.STATE.TOUCH_ROTATE;

                break;

            case 2: // two-fingered touch: dolly-pan

                if ( this.enableZoom === false && this.enablePan === false ) return;

                this.handleTouchStartDollyPan( event );

                this.state = this.STATE.TOUCH_DOLLY_PAN;

                break;

            default:

                this.state = this.STATE.NONE;

        }

        if ( this.state !== this.STATE.NONE ) {
            ED.dispatchEvent( this.startEvent );
        }

    }

    onTouchMove( event ) {

        if ( this.enabled === false ) return;

        event.preventDefault();
        event.stopPropagation();

        switch ( event.touches.length ) {

            case 1: // one-fingered touch: rotate

                if ( this.enableRotate === false ) return;
                if ( this.state !== this.STATE.TOUCH_ROTATE ) return; // is this needed?

                this.handleTouchMoveRotate( event );

                break;

            case 2: // two-fingered touch: dolly-pan

                if ( this.enableZoom === false && this.enablePan === false ) return;
                if ( this.state !== this.STATE.TOUCH_DOLLY_PAN ) return; // is this needed?

                this.handleTouchMoveDollyPan( event );

                break;

            default:
                this.state = this.STATE.NONE;

        }

    }

    onTouchEnd( event ) {

        if ( this.enabled === false ) return;

        this.handleTouchEnd( event );

        ED.dispatchEvent( this.endEvent );

        this.state = this.STATE.NONE;

    }

    onContextMenu( event ) {

        if ( this.enabled === false ) return;

        event.preventDefault();

    }

    dispose() {
        this.domElement.removeEventListener( 'contextmenu', this.onContextMenu.bind(this), false );
        this.domElement.removeEventListener( 'mousedown', this.onMouseDown.bind(this), false );
        this.domElement.removeEventListener( 'wheel', this.onMouseWheel.bind(this), false );

        this.domElement.removeEventListener( 'touchstart', this.onTouchStart.bind(this), false );
        this.domElement.removeEventListener( 'touchend', this.onTouchEnd.bind(this), false );
        this.domElement.removeEventListener( 'touchmove', this.onTouchMove.bind(this), false );

        document.removeEventListener( 'mousemove', this.onMouseMove.bind(this), false );
        document.removeEventListener( 'mouseup', this.onMouseUp.bind(this), false );
        window.removeEventListener( 'keydown', this.onKeyDown.bind(this), false );
    }

    init() {
        console.log(ED.dispatchEvent({ type: 'start_test', msg:'whatt' }))
        this.domElement.addEventListener( 'contextmenu', this.onContextMenu.bind(this), false );
        this.domElement.addEventListener( 'mousedown', this.onMouseDown.bind(this), false );
        this.domElement.addEventListener( 'wheel', this.onMouseWheel.bind(this), false );
        this.domElement.addEventListener( 'touchstart', this.onTouchStart.bind(this), false );
        this.domElement.addEventListener( 'touchend', this.onTouchEnd.bind(this), false );
        this.domElement.addEventListener( 'touchmove', this.onTouchMove.bind(this), false );
        window.addEventListener( 'keydown', this.onKeyDown.bind(this), false );
        this.pan()
        this.panLeft();
        this.panUp();
        this.update();
    }

}

const ED = new EventDispatcher()
console.log(ED)
function EventDispatcher() {}

Object.assign( EventDispatcher.prototype, {

    addEventListener: function ( type, listener ) {

        if ( this._listeners === undefined ) this._listeners = {};

        var listeners = this._listeners;

        if ( listeners[ type ] === undefined ) {

            listeners[ type ] = [];

        }

        if ( listeners[ type ].indexOf( listener ) === - 1 ) {

            listeners[ type ].push( listener );

        }

    },

    hasEventListener: function ( type, listener ) {

        if ( this._listeners === undefined ) return false;

        var listeners = this._listeners;

        return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;

    },

    removeEventListener: function ( type, listener ) {

        if ( this._listeners === undefined ) return;

        var listeners = this._listeners;
        var listenerArray = listeners[ type ];

        if ( listenerArray !== undefined ) {

            var index = listenerArray.indexOf( listener );

            if ( index !== - 1 ) {

                listenerArray.splice( index, 1 );

            }

        }

    },

    dispatchEvent: function ( event ) {

        if ( this._listeners === undefined ) return;

        var listeners = this._listeners;
        var listenerArray = listeners[ event.type ];

        if ( listenerArray !== undefined ) {

            event.target = this;

            var array = listenerArray.slice( 0 );

            for ( var i = 0, l = array.length; i < l; i ++ ) {

                array[ i ].call( this, event );

            }

        }

    }

} );