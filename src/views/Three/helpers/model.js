import * as THREE from 'three';

import rock1obj from 'assets/3d/rock1/rock1.obj';
import rock1mtl from 'assets/3d/rock1/rock1.mtl';
import rocktexture from 'assets/3d/rock1/rock1_ao.png'

import specularTexture from 'assets/3d/specular.jpg';
import bikeMtl from 'assets/3d/BSA_BantamD1_OBJ/BSA_BantamD1_OBJ.mtl';
import bike from 'assets/3d/BSA_BantamD1_OBJ/BSA_BantamD1_OBJ.obj';
import {OBJLoader} from 'three-full';
import {MTLLoader} from 'three-full';

export function loadRocks() {
    //let loader = new THREE.ObjectLoader()
    let self = this;
    let mtl1;
    let obj1;
    console.log(rock1obj)
    let mtlloader = new MTLLoader()
        .setCrossOrigin("anonymous")
        .setPath('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/obj/male02/')
        .load('male02.mtl', (mtl)=>{
        mtl.preload();
        //console.log(mtl.materials.None)
        console.log(mtl)
        //let rockMat = mtl.materials.None;
        let rockTexture = new THREE.TextureLoader().load(rockTexture);
        //rockMat.map = rockTexture;

        let objLoader = new OBJLoader();
                objLoader.setMaterials(mtl);
                objLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/obj/male02/male02.obj', function(object){
                   // let rockObj = object.detail.loaderRootNode;
                    self.scene.add(object);
                    console.log(object)
                    //console.log(rockObj)
                });
        // let objloader =  new OBJLoader2().load(rock1obj,(obj)=>{
        //     console.log(obj.detail.loaderRootNode);
        //     let rockGeo = obj.detail.loaderRootNode.children[0].geometry;
        //     let rock = new THREE.Mesh(rockGeo, rockMat);

        //     self.scene.add(rock);
        // });
    });
        //objloader.materials = rockMaterial
        //this.scene.add(objloader);

    // let objloader = new this.THREE.OBJLoader()
    // let loader2 = new THREE.JSONLoader();
    // loader2.load(rock1cpyjson, (geometry, materials)=>{
    //     console.log("geometry", geometry)
    //     console.log("materials", materials)
    // })
}