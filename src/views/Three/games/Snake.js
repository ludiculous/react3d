import * as THREE from 'three';

export class Snake {
    constructor(scene) {

        this.scene = scene;
        this.snake = {};
        this.x = 0;
        this.z = 0;
        this.xspeed = 1;
        this.zspeed= 0;
        this.boundaries = 600;
        this.init();
    }

    createSnake() {
        let snakeGeo = new THREE.CubeGeometry(10, 10, 10);
        let snakeMat = new THREE.MeshNormalMaterial({shading: THREE.FlatShading});
        let snakeMesh = new THREE.Mesh(snakeGeo, snakeMat);
        this.snake = snakeMesh;
        this.scene.add(snakeMesh);
    }

    update() {

        this.x += this.xspeed;
        this.z += this.zspeed;

        //console.log(timeScale);
        if(this.x > this.boundaries) this.x = -this.boundaries;
        if(this.z > this.boundaries) this.z = -this.boundaries;
        if(this.z < -this.boundaries) this.z = this.boundaries;
        if(this.x < -this.boundaries) this.x = this.boundaries;

        this.snake.position.x = this.x;
        this.snake.position.z = this.z;

    }

    handleKeyDown( event ) {
        //console.log( 'handleKeyDown' );
        console.log(event.keyCode);
        event.preventDefault();

        switch (event.keyCode) {
            case 38:
                "up"
                this.zspeed = -1;
                this.xspeed = 0;
                this.update();
                break;

            case 40:
                "down"
                this.zspeed = 1;
                this.xspeed = 0;
                this.update();
                break;

            case 37:
                "left"
                this.xspeed = - 1;
                this.zspeed = 0;
                this.update();
                break;

            case 39:
                "right"
                this.xspeed = 1;
                this.zspeed = 0;
                this.update();
                break;
        }
    }

    init() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.createSnake();
    }
}