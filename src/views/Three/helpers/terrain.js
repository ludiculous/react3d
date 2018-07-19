import GCHM from 'assets/3d/grandcanyon.png';
import GCHM2 from 'assets/3d/random_mtn.png';
import * as THREE from 'three';
import * as d3 from 'd3';
import * as chroma from 'chroma-js';

export function createHeightMap() {
    // test separate component integration afterwards
    // might have to adjust for actual dimensions of the image
     let scale = chroma.scale(['blue', 'green', 'red']).domain([0, 50]);
     let depth = 513;
     let width = 513;
     let spacingX = 3;
     let spacingZ = 3;
     let heightOffset = 2;
     let canvas = document.createElement('canvas');
     canvas.width = 513;
     canvas.height = 513;

     let ctx = canvas.getContext('2d');
     let meshMaterial = new THREE.MeshLambertMaterial({
        vertexColors: THREE.FaceColors,
        color:new THREE.Color(0xff0000)

    });

     let img = new Image();
     img.src = GCHM;

     img.onload = ()=> {
        // imageSrc, dx, dy, dWidth, dHeight
        ctx.drawImage(img, 0, 0)
        // x coordinate of upper left corner
        // it can grab the entire image, or just a pixel
        let pixel = ctx.getImageData(0, 0, width, depth);
        let geom = new THREE.Geometry();
        let output = [];
        // create a 2d table to hold pixel data
        for(let x = 0; x < depth; x++ ) {
            for(let z = 0; z < width; z++ ) {

                let yValue = pixel.data[z * 4 + (depth * x * 4)] / heightOffset;
                //console.log(yValue);
                // // store the image data inside a vector object
                let vertex = new THREE.Vector3(x * spacingX, yValue, z * spacingZ);
                geom.vertices.push(vertex);

            }
        }

        // after vertices have been defined
        // we create a rectangle between 4 vertices
        for(let z =0; z < depth -1; z++) {
            for(let x=0; x < width -1; x++) {
                // a - - b
                // |  x  |
                // c - - d
                //y = z * width

                let a = x + z * width;
                let b = (x + 1) + (z * width);
                let c = x + ((z + 1) * width);
                let d = (x + 1) + ((z + 1) * width);
                // a triangular face used geometry
                let face1 = new THREE.Face3(a, b, d);
                let face2 = new THREE.Face3(d, c, a);

                face1.color = new THREE.Color(scale(getHighPoint(geom, face1)).hex());
                face2.color = new THREE.Color(scale(getHighPoint(geom, face2)).hex())

                geom.faces.push(face1);
                geom.faces.push(face2);
            }
        }

        geom.computeVertexNormals(true);
        geom.computeFaceNormals();
        geom.computeBoundingBox();

        let zMax = geom.boundingBox.max.z;
        let xMax = geom.boundingBox.max.x;

        let mesh = new THREE.Mesh(geom, meshMaterial);
        mesh.translateX(-xMax / 2);
        mesh.translateZ(-zMax / 2);
        this.scene.add(mesh);
     }
}

function getHighPoint(geometry, face) {

    var v1 = geometry.vertices[face.a].y;
    var v2 = geometry.vertices[face.b].y;
    var v3 = geometry.vertices[face.c].y;

    return Math.max(v1, v2, v3);
}