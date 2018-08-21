// /**
//  * @author Mugen87 / https://github.com/Mugen87
//  *
//  */
// import * as THREE from 'three';


// class Refractor extends THREE.Mesh {
//     constructor( geometry, options ) {
//         super( geometry, options )
//         this.type = 'Refractor';
//         this.options = options || {};
//         this.color = ( options.color !== undefined ) ? new THREE.Color( options.color ) : new THREE.Color( 0x7F7F7F );
//         this.textureWidth = options.textureWidth || 512;
//         this.textureHeight = options.textureHeight || 512;
//         this.clipBias = options.clipBias || 0;
//         this.shader = options.shader || THREE.Refractor.RefractorShader;
//         this.virtualCamera = new THREE.PerspectiveCamera();
//         this.refractorPlane = new THREE.Plane();
//         this.textureMatrix = new THREE.Matrix4();
//         this.parameters = {
//             minFilter: THREE.LinearFilter,
//             magFilter: THREE.LinearFilter,
//             format: THREE.RGBFormat,
//             stencilBuffer: false
//         };
//         this.material = new THREE.ShaderMaterial( {
//             uniforms: THREE.UniformsUtils.clone( shader.uniforms ),
//             vertexShader: shader.vertexShader,
//             fragmentShader: shader.fragmentShader,
//             transparent: true // ensures, refractors are drawn from farthest to closest
//         });
//         this.renderTarget = new THREE.WebGLRenderTarget( this.textureWidth, this.textureHeight, this.parameters );
//         this.RefractorShader = {
//             uniforms: {
//                 'color': {
//                     type: 'c',
//                     value: null
//                 },
//                 'tDiffuse': {
//                     type: 't',
//                     value: null
//                 },
//                 'textureMatrix': {
//                     type: 'm4',
//                     value: null
//                 }
//             },
//             vertexShader: [
//                 'uniform mat4 textureMatrix;',
//                 'letying vec4 vUv;',
//                 'void main() {',
//                 '   vUv = textureMatrix * vec4( position, 1.0 );',
//                 '   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
//                 '}'
//             ].join( '\n' ),
//             fragmentShader: [
//                 'uniform vec3 color;',
//                 'uniform sampler2D tDiffuse;',
//                 'letying vec4 vUv;',
//                 'float blendOverlay( float base, float blend ) {',
//                 '   return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );',
//                 '}',
//                 'vec3 blendOverlay( vec3 base, vec3 blend ) {',
//                 '   return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );',
//                 '}',
//                 'void main() {',
//                 '   vec4 base = texture2DProj( tDiffuse, vUv );',
//                 '   gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );',
//                 '}'
//             ].join( '\n' )
//         };

//         this.init();

//     }

//     init() {
//         this.visible();
//         this.updateMaterialUniforms();
//     }

//     initVirtualCamera() {
//         this.virtualCamera.matrixAutoUpdate = false;
//         this.virtualCamera.userData.refractor = true;
//     }

//     // render target
//     renderTargetTexture() {
//         if (!THREE.Math.isPowerOfTwo( this.textureWidth ) || !THREE.Math.isPowerOfTwo( this.textureHeight ) ) {
//             renderTarget.texture.generateMipmaps = false;
//         }
//     }

//     updateMaterialUniforms() {
//         this.material.uniforms.color.value = this.color;
//         this.material.uniforms.tDiffuse.value = this.renderTarget.texture;
//         this.material.uniforms.textureMatrix.value = this.textureMatrix;
//     }
//     // material
//     visible() {
//         let refractorWorldPosition = new THREE.Vector3();
//         let cameraWorldPosition = new THREE.Vector3();
//         let rotationMatrix = new THREE.Matrix4();
//         let view = new THREE.Vector3();
//         let normal = new THREE.Vector3();

//         return ()=>{
//             refractorWorldPosition.setFromMatrixPosition( this.matrixWorld );
//             cameraWorldPosition.setFromMatrixPosition( this.camera.matrixWorld );
//             view.subVectors( refractorWorldPosition, cameraWorldPosition );
//             rotationMatrix.extractRotation( scope.matrixWorld );
//             normal.set( 0, 0, 1 );
//             normal.applyMatrix4( rotationMatrix );

//             return view.dot( normal ) < 0;
//         }

//     }


//     // functions
//     updateRefractorPlane() {

//         let normal = new THREE.Vector3();
//         let position = new THREE.Vector3();
//         let quaternion = new THREE.Quaternion();
//         let scale = new THREE.Vector3();

//         return ()=> {
//             this.matrixWorld.decompose( position, quaternion, scale );
//             normal.set( 0, 0, 1 ).applyQuaternion( quaternion ).normalize();
//             // flip the normal because we want to cull everything above the plane
//             normal.negate();
//             refractorPlane.setFromNormalAndCoplanarPoint( normal, position );
//         };
//     }
// //// ended progress
//     let updateVirtualCamera = ( function () {

//         let clipPlane = new THREE.Plane();
//         let clipVector = new THREE.Vector4();
//         let q = new THREE.Vector4();

//         return function updateVirtualCamera( camera ) {

//             virtualCamera.matrixWorld.copy( camera.matrixWorld );
//             virtualCamera.matrixWorldInverse.getInverse( virtualCamera.matrixWorld );
//             virtualCamera.projectionMatrix.copy( camera.projectionMatrix );
//             virtualCamera.far = camera.far; // used in WebGLBackground

//             // The following code creates an oblique view frustum for clipping.
//             // see: Lengyel, Eric. “Oblique View Frustum Depth Projection and Clipping”.
//             // Journal of Game Development, Vol. 1, No. 2 (2005), Charles River Media, pp. 5–16

//             clipPlane.copy( refractorPlane );
//             clipPlane.applyMatrix4( virtualCamera.matrixWorldInverse );

//             clipVector.set( clipPlane.normal.x, clipPlane.normal.y, clipPlane.normal.z, clipPlane.constant );

//             // calculate the clip-space corner point opposite the clipping plane and
//             // transform it into camera space by multiplying it by the inverse of the projection matrix

//             let projectionMatrix = virtualCamera.projectionMatrix;

//             q.x = ( Math.sign( clipVector.x ) + projectionMatrix.elements[ 8 ] ) / projectionMatrix.elements[ 0 ];
//             q.y = ( Math.sign( clipVector.y ) + projectionMatrix.elements[ 9 ] ) / projectionMatrix.elements[ 5 ];
//             q.z = - 1.0;
//             q.w = ( 1.0 + projectionMatrix.elements[ 10 ] ) / projectionMatrix.elements[ 14 ];

//             // calculate the scaled plane vector

//             clipVector.multiplyScalar( 2.0 / clipVector.dot( q ) );

//             // replacing the third row of the projection matrix

//             projectionMatrix.elements[ 2 ] = clipVector.x;
//             projectionMatrix.elements[ 6 ] = clipVector.y;
//             projectionMatrix.elements[ 10 ] = clipVector.z + 1.0 - clipBias;
//             projectionMatrix.elements[ 14 ] = clipVector.w;

//         };

//     } )();

//     // This will update the texture matrix that is used for projective texture mapping in the shader.
//     // see: http://developer.download.nvidia.com/assets/gamedev/docs/projective_texture_mapping.pdf

//     function updateTextureMatrix( camera ) {

//         // this matrix does range mapping to [ 0, 1 ]

//         textureMatrix.set(
//             0.5, 0.0, 0.0, 0.5,
//             0.0, 0.5, 0.0, 0.5,
//             0.0, 0.0, 0.5, 0.5,
//             0.0, 0.0, 0.0, 1.0
//         );

//         // we use "Object Linear Texgen", so we need to multiply the texture matrix T
//         // (matrix above) with the projection and view matrix of the virtual camera
//         // and the model matrix of the refractor

//         textureMatrix.multiply( camera.projectionMatrix );
//         textureMatrix.multiply( camera.matrixWorldInverse );
//         textureMatrix.multiply( scope.matrixWorld );

//     }

//     //

//     let render = ( function () {

//         let viewport = new THREE.Vector4();

//         return function render( renderer, scene, camera ) {

//             scope.visible = false;

//             let currentRenderTarget = renderer.getRenderTarget();
//             let currentVrEnabled = renderer.vr.enabled;
//             let currentShadowAutoUpdate = renderer.shadowMap.autoUpdate;

//             renderer.vr.enabled = false; // avoid camera modification
//             renderer.shadowMap.autoUpdate = false; // avoid re-computing shadows

//             renderer.render( scene, virtualCamera, renderTarget, true );

//             renderer.vr.enabled = currentVrEnabled;
//             renderer.shadowMap.autoUpdate = currentShadowAutoUpdate;
//             renderer.setRenderTarget( currentRenderTarget );

//             // restore viewport

//             let bounds = camera.bounds;

//             if ( bounds !== undefined ) {

//                 let size = renderer.getSize();
//                 let pixelRatio = renderer.getPixelRatio();

//                 viewport.x = bounds.x * size.width * pixelRatio;
//                 viewport.y = bounds.y * size.height * pixelRatio;
//                 viewport.z = bounds.z * size.width * pixelRatio;
//                 viewport.w = bounds.w * size.height * pixelRatio;

//                 renderer.state.viewport( viewport );

//             }

//             scope.visible = true;

//         };

//     } )();

//     //

//     this.onBeforeRender = function ( renderer, scene, camera ) {

//         // ensure refractors are rendered only once per frame

//         if ( camera.userData.refractor === true ) return;

//         // avoid rendering when the refractor is viewed from behind

//         if ( ! visible( camera ) === true ) return;

//         // update

//         updateRefractorPlane();

//         updateTextureMatrix( camera );

//         updateVirtualCamera( camera );

//         render( renderer, scene, camera );

//     };

//     this.getRenderTarget = function () {

//         return renderTarget;

//     };

// };
