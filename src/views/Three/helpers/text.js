import * as THREE from 'three';
import helvetiker from 'assets/fonts/HelveticaNeueLTCom65Md_Regular.json';

export function createText(){
    let self = this;
    let loader = new THREE.FontLoader();
    let text = "Genie in a bottle";

    loader.load( '//raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
        console.log(font)
        let textGeo = new THREE.TextGeometry(text, {
            font: font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelSegments: 5
        } );
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();

        let material = new THREE.MeshFaceMaterial([
            new THREE.MeshPhongMaterial({
                color: 0xff22cc,
                shading: THREE.FlatShading
            }),
            new THREE.MeshPhongMaterial({
                color: 0xff22cc,
                shading: THREE.SmoothShading
            })
        ]);

        let textMesh = new THREE.Mesh(textGeo, material);
        textMesh.position.x = -textGeo.boundingBox.max.x / 2;
        textMesh.position.y = 200;
        textMesh.name = 'text'

        self.scene.add(textMesh);

    });
}

