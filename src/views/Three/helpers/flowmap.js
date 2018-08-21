// import * as THREE from 'three';
// import Water_flow1 from 'assets/textures/Water_1_M_Flow.jpg';
// import GPUComputationRenderer from './GPUComputationRenderer';

// export function create_flowmap() {
//     console.log('creating flowmap')
//     let self = this;
//     let waterGeometry = new THREE.PlaneBufferGeometry(20,20)
//     let textureLoader = new THREE.TextureLoader()
//     let flowMap = textureLoader.load(Water_flow1);
//     let width = window.innerWidth;
//     let height = window.innerHeight;

//     THREE.prototype.madeup = function() {
//         return 'some class string';
//     }

//     console.log(THREE.madeup);
//     // let water = new THREE.Water(waterGeometry, {
//     //     scale: 2,
//     //     textureWidth: width,
//     //     textureHeight: height,
//     //     flowMap: flowMap
//     // });

//     // water.position.y = 1;
//     // water.rotation.x = Math.PI * -0.5;
//     // this.scene.add(water);
//     // flowmap_helper(self, flowMap);
// }

// function flowmap_helper(self, flowMap) {
//     let helperGeometry = new THREE.PlaneBufferGeometry(20, 20);
//     let helperMaterial = new THREE.MeshBasicMaterial({map: flowMap});
//     let helper = new THREE.Mesh(helperGeometry, helperMaterial);
//     helper.position.y = 1.01;
//     helper.rotation.x = Math.PI * -0.5;
//     helper.visible = false;
//     self.scene.add(helper);

// }

// function startGPUrenderer() {

//     //const gcr = new GPUComputationRenderer(width, height, this.renderer);

// }