import * as THREE from 'three';
import {OBJLoader2} from 'three-full';
import {MTLLoader} from 'three-full';

const MaterialLoader = MTLLoader;
const ObjectLoader = OBJLoader2;

export function initAssetLoader() {

    let self = this;
    let assetList = [
        {
            material: 'alien.mtl',
            object: 'alienBones.obj'
        },
        {
            material: 'meteorHalf.mtl',
            object: 'meteorHalf.obj'
        },
        {
            material: 'rocksTall.mtl',
            object: 'rocksTall.obj'
        },
        {
            material: 'spaceCraft1.mtl',
            object: 'spaceCraft1.obj'
        },
        {
            material: 'spaceCraft6.mtl',
            object: 'spaceCraft6.obj'
        },
        {
            material: 'rocks.mtl',
            object: 'rocks.obj'
        }
    ]

    let rootUrl = 'https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Models/'

    assetList.forEach((entity,i)=>{
        let coordinates = createCoordinates(i);
        let objUrl = rootUrl + entity.object;
        loadAssets(self, objUrl , entity.material, rootUrl, rootUrl, 'space_objects', coordinates);
    });
}

function createCoordinates(index) {
    let max = 300;
    let x = Math.floor(Math.random() * Math.floor(max)) + index;
    let y = Math.floor(Math.random() * Math.floor(max)) + index;
    let z = Math.floor(Math.random() * Math.floor(max)) + index;
    return {
        x,y,z
    }
}

function loadAssets(self, objUrl,  mtlUrl, mtlRoot, textureRoot, objectList, coordinates) {
    let MTLLoader = new MaterialLoader();

    MTLLoader
        .setMaterialOptions({
            wrap:  THREE.RepeatWrapping
        })
        .setCrossOrigin("")
        .setTexturePath(textureRoot)
        .setPath(mtlRoot)
        .load(mtlUrl, (mtl)=>{
            mtl.preload();

            let objLoader = new ObjectLoader();
            objLoader.setMaterials(mtl.materials);
            objLoader.load(objUrl, function(object){

            let customObj = object.detail.loaderRootNode;
            customObj.position.set(coordinates.x, coordinates.y, coordinates.z);


            self[`${objectList}`].push(customObj);
            self.scene.add(customObj);
        });
    });
}

export function generateGroundTile() {
    let self = this;
    let boundaries = 10;

    let rootUrl = 'https://raw.githubusercontent.com/ludiculous/react3d/master/src/assets/3d/Models/';
    let materialUrl = 'groundTile.mtl';
    let objectUrl = rootUrl + 'groundTile.obj';

    let MTLLoader = new MaterialLoader();

    MTLLoader
        .setMaterialOptions({
            wrap:  THREE.RepeatWrapping
        })
        .setCrossOrigin("")
        .setTexturePath(rootUrl)
        .setPath(rootUrl)
        .load(materialUrl, (mtl)=>{
            mtl.preload();

            let objLoader = new ObjectLoader()

            objLoader.setMaterials(mtl.materials)
            objLoader.load(objectUrl, function(object){

            let customObj = object.detail.loaderRootNode;
            customObj.position.set(0, 0, 0);



            for(let i=0; i < boundaries; i++) {
                for(let j=0; j< boundaries; j++) {

                    let floorTile = customObj.clone();
                    floorTile.position.x = i * 12;
                    floorTile.position.z = j * 12;
                    console.log(floorTile.position.x, floorTile.position.y);
                    self[`floor_tiles`].push(floorTile);
                    self.scene.add(floorTile);
                }
            }

            // self[`floor_tiles`].push(customObj);
            // self.scene.add(customObj);
        });
    });
    // clone the object with a 2D vector
}


export function scaleObject(object, scale) {
    object.scale.x = scale;
    object.scale.y = scale;
    object.scale.z = scale;
}

export function translateObject(object, coordinates) {
    object.position.x = coordinates.x;
    object.position.y = coordinates.y;
    object.position.y = coordinates.z;
}
