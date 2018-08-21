import * as THREE from 'three';
//import rock3 from 'assets/3d/rocks_03.obj';

import rock3 from 'assets/3d/rocks_03.obj';
import rock1 from 'assets/3d/Rock1.obj';
import rock1mat from 'assets/3d/Rock1.mtl';
import rock1json from 'assets/3d/Rock1.json';
import rock1cpyjson from 'assets/3d/Rock1_copy.json';
import specularTexture from 'assets/3d/specular.jpg';
import OBJLoader from 'three-obj-loader';
import MTLLoader from 'three-mtl-loader';
console.log(MTLLoader);
console.log(rock3);
OBJLoader(THREE);

// export function loadModel() {
//   let Loader = new THREE.ObjectLoader()
//   let self = this;

//   Loader.load('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/TechnicLEGO_CAR_1.json', function(geo) {
//     let Material = new THREE.MeshBasicMaterial({
//       color: 0xffff00
//     });
//     console.log(geo);
//     let group = new THREE.Group();
//     group.add(geo);
//     self.scene.add(group);
//   });
// }

// export function loadRocks() {
//     this.THREE = THREE;
//     let objLoader = new this.THREE.OBJLoader();
//     let mtlLoader = new MTLLoader();
//     let self = this;
//     let material;


//     mtlLoader.load(rock1mat, (mtl)=>{
//         mtl.preload()
//         console.log(mtl)
//         material = mtl
//     })

//     objLoader.load(rock1, (obj)=>{
//             // console.log(material)
//             if(material) {
//                 console.log("material exists")
//                 console.log(obj)
//                 //obj.setMaterials(material);
//                 self.scene.add(obj);
//             }
//     })

// }

export function loadRocks() {
    //let loader = new THREE.ObjectLoader()
    this.THREE = THREE;
    let self = this;
    let mtlloader = new MTLLoader();
    let objloader = new this.THREE.OBJLoader()
    console.log(objloader)
    // let objloader = new this.THREE.OBJLoader()
    //

    mtlloader.load('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Rock1.mtl', (mtl)=>{
        mtl.preload();

        console.log(mtl);
        let rockMaterial = mtl.materials.Material


        //objloader.materials = rockMaterial
        objloader.load( 'https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Rock1.obj', (obj)=>{
            console.log(obj)
            let rockGeo = obj.children[1].geometry;
            let rockMtl = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0x555555, specular: 0xffffff, shininess: 50, shading: THREE.SmoothShading } );


            self.scene.add(obj);
        });

    });



    // let loader2 = new THREE.JSONLoader();
    // loader2.load(rock1cpyjson, (geometry, materials)=>{
    //     console.log("geometry", geometry)
    //     console.log("materials", materials)


    // })
}