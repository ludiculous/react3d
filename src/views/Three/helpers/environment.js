import * as THREE from 'three';
import skybox  from 'assets/3d/cosmos.jpg';
import sprite1 from 'assets/textures/snowflake1.png';
import sprite2 from 'assets/textures/snowflake2.png';
import sprite3 from 'assets/textures/snowflake3.png';
import sprite4 from 'assets/textures/snowflake4.png';
import sprite5 from 'assets/textures/snowflake5.png';

export function snowDay() {
    console.log("creating snow day")
    this.scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );
    let geometry = new THREE.BufferGeometry();
    let vertices = [];
    let numIter = 1000;

    let textureLoader = new THREE.TextureLoader();
    let sprite_1 = textureLoader.load(sprite1);
    let sprite_2 = textureLoader.load(sprite2);
    let sprite_3 = textureLoader.load(sprite3);
    let sprite_4 = textureLoader.load(sprite4);
    let sprite_5 = textureLoader.load(sprite5);

    for (let i = 0; i< numIter; i++) {
        let x = Math.random() * 2000 - numIter;
        let y = Math.random() * 2000 - numIter;
        let z = Math.random() * 2000 - numIter;

        vertices.push(x, y, z);
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute( vertices, 3 ));
    this.point_parameters = [
        [ [ 1.0, 0.2, 0.5 ], sprite_2, 20 ],
        [ [ 0.95, 0.1, 0.5 ], sprite_3, 15 ],
        [ [ 0.90, 0.05, 0.5 ], sprite_1, 10 ],
        [ [ 0.85, 0, 0.5 ], sprite_5, 8 ],
        [ [ 0.80, 0, 0.5 ], sprite_4, 5 ]
    ];


    for (let i=0; i < this.point_parameters.length; i++) {
        let color = this.point_parameters[i][0];
        let sprite = this.point_parameters[i][1];
        let size = this.point_parameters[i][2];

        this.materials[i] = new THREE.PointsMaterial({
            size: size,
            map: sprite,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true
        });

        this.materials[i].color.setHSL(color[0], color[1], color[2]);

        let particles = new THREE.Points(geometry, this.materials[i]);

        particles.rotation.x = Math.random() * 6;
        particles.rotation.y = Math.random() * 6;
        particles.rotation.z = Math.random() * 6;

        this.scene.add(particles);
    }

}

export function animateSnow() {
    let timer = Date.now() * 0.0001;
    for ( var i = 0; i < this.scene.children.length; i ++ ) {

        var object = this.scene.children[ i ];
        if ( object instanceof THREE.Points ) {

        object.rotation.y = timer * ( i < 4 ? i + 1 : - ( i + 1 ) );
        //console.log(object.rotation)
        }
    }

    for ( var i = 0; i < this.materials.length; i ++ ) {
      var color = this.point_parameters[ i ][ 0 ];
      var h = ( 360 * ( color[ 0 ] + timer ) % 360 ) / 360;
      this.materials[ i ].color.setHSL( h, color[ 1 ], color[ 2 ] );
    }
}

export function loadSkyBox() {

    const loader = new THREE.TextureLoader();
    const plane_geo = new THREE.PlaneGeometry(2, 2, 0);

    loader.load(skybox, (texture)=>{
        const plane_texture = new THREE.MeshBasicMaterial({
            map: texture
        });

        this.backgroundMesh = new THREE.Mesh(
            plane_geo, plane_texture
        );

        this.backgroundMesh.material.depthTest = false;
        this.backgroundMesh.material.depthWrite = false;

        this.backgroundScene = new THREE.Scene();
        this.backgroundCamera = new THREE.Camera();
        this.backgroundScene.add(this.backgroundCamera);
        this.backgroundScene.add(this.backgroundMesh);
    })
}

