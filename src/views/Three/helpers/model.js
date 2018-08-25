import * as THREE from 'three';

import rock1obj from 'assets/3d/rock1/rock1.obj';
import rock1mtl from 'assets/3d/rock1/rock1.mtl';
import rocktexture from 'assets/3d/rock1/rock1_ao.png'

import craterobj from 'assets/3d/Models/crater.obj';
import cratermtl from 'assets/3d/Models/crater.mtl';

import bikeMtl from 'assets/3d/BSA_BantamD1_OBJ/BSA_BantamD1_OBJ.mtl';
import bike from 'assets/3d/BSA_BantamD1_OBJ/BSA_BantamD1_OBJ.obj';
import {OBJLoader} from 'three-full';
import {MTLLoader} from 'three-full';

export function loadRocks() {
    //let loader = new THREE.ObjectLoader()
    let self = this;

    console.log(rock1obj)
    let mtlloader = new MTLLoader()
        .load('assets/3d/Models/crater.mtl', (cratermtl)=>{
        cratermtl.preload();
        //console.log(mtl.materials.None)
        console.log(cratermtl)
        //let rockMat = mtl.materials.None;
        //rockMat.map = rockTexture;

        let objLoader = new OBJLoader();
                objLoader.setMaterials('assets/3d/Models/crater.obj');
                objLoader.load(craterobj, function(object){
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