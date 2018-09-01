import * as THREE from 'three';

import rock1obj from 'assets/3d/rock1/rock1.obj';
import rock1mtl from 'assets/3d/rock1/rock1.mtl';
import rocktexture from 'assets/3d/rock1/rock1_ao.png'

import craterobj from 'assets/3d/Models/crater.obj';
import cratermtl from 'assets/3d/Models/crater.mtl';

import bikeMtl from 'assets/3d/BSA_BantamD1_OBJ/BSA_BantamD1_OBJ.mtl';
import bike from 'assets/3d/BSA_BantamD1_OBJ/BSA_BantamD1_OBJ.obj';
import {OBJLoader2} from 'three-full';
import {MTLLoader} from 'three-full';


export function loadShip() {
    let self = this;
    let mtlloader = new MTLLoader()
        .setMaterialOptions({
            wrap:  THREE.RepeatWrapping
        })
        .setCrossOrigin("")
        .setTexturePath('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Models/')
        .setPath('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Models/')
        .load('spaceCraft1.mtl', (spacecraftmtl)=>{
            spacecraftmtl.preload();
            //console.log(mtl.materials.None)

            //let rockMat = mtl.materials.None;
            //rockMat.map = rockTexture;

            let objLoader = new OBJLoader2()
            objLoader.setMaterials(spacecraftmtl.materials)
            objLoader.load('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Models/spaceCraft1.obj', function(object){
           // let rockObj = object.detail.loaderRootNode;

            let shipObj = object.detail.loaderRootNode;
            shipObj.position.set(80,80, 60);
            self.spacecrafts.push(shipObj);
            self.scene.add(shipObj);

        });
    });


}

export function loadRocks() {
    //let loader = new THREE.ObjectLoader()
    let self = this;
    let mtlloader = new MTLLoader()
        .setMaterialOptions({
            wrap:  THREE.RepeatWrapping
        })
        .setCrossOrigin("")
        .setTexturePath('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Models/')
        .setPath('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Models/')
        .load('alien.mtl', (cratermtl)=>{
        cratermtl.preload();
        //console.log(mtl.materials.None)

        //let rockMat = mtl.materials.None;
        //rockMat.map = rockTexture;

        let objLoader = new OBJLoader2()
        objLoader.setMaterials(cratermtl.materials)
        objLoader.load('https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Models/alien.obj', function(object){
           // let rockObj = object.detail.loaderRootNode;
              console.log(cratermtl)
            self.scene.add(object.detail.loaderRootNode);
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