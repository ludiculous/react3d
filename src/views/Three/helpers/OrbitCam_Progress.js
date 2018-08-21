




    // this method is exposed, but perhaps it would be better if we can make it private...






        //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?



    //
    // internals
    //






    //
    // event callbacks - update the object state
    //





    //
    // event handlers - FSM: listen for events and reset state
    //





    //



    // force an update at start

    this.update();


THREE.OrbitControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;

Object.defineProperties( THREE.OrbitControls.prototype, {

    center: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .center has been renamed to .target' );
            return this.target;

        }

    },

    // backward compatibility

    noZoom: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
            return ! this.enableZoom;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.' );
            this.enableZoom = ! value;

        }

    },

    noRotate: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
            return ! this.enableRotate;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.' );
            this.enableRotate = ! value;

        }

    },

    noPan: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
            return ! this.enablePan;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.' );
            this.enablePan = ! value;

        }

    },

    noKeys: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
            return ! this.enableKeys;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.' );
            this.enableKeys = ! value;

        }

    },

    staticMoving: {


            console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
            return ! this.enableDamping;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.' );
            this.enableDamping = ! value;

        }

    },

    dynamicDampingFactor: {

        get: function () {

            console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
            return this.dampingFactor;

        },

        set: function ( value ) {

            console.warn( 'THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.' );
            this.dampingFactor = value;

        }

    }

