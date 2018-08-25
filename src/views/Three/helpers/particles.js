import * as THREE from 'three';
import particlepng from 'assets/3d/particle.png';
import lotusparticle from 'assets/3d/lotus_particle.jpg';
import particle2 from 'assets/textures/particle2.png';
import perlin from 'assets/textures/perlin-512.png';
import {GPUParticleSystem} from  '../sources/objects/GPUParticleSystem.js';

export function createStarSystem() {
    let loader = new THREE.TextureLoader();
    let self = this;

    loader.load(particle2, (texture) =>{
        starSystemHelper(self, texture)
    });

}

function starSystemHelper(self, texture) {

    let starMaterial = new THREE.PointsMaterial({
        map: texture,
        color: 0xaa88ff
    });

    starMaterial.blending = THREE.AdditiveBlending;
    starMaterial.transparent = true;
    // the parent container
    let starGeometry = new THREE.Geometry();

    for ( let i = 0; i < 1000; i ++ ) {

        let star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread( 200 );
        star.y = THREE.Math.randFloatSpread( 300 );
        star.z = THREE.Math.randFloatSpread( 100 );

        starGeometry.vertices.push( star );

    }

    let starField = new THREE.Points( starGeometry, starMaterial );
    self.starField = starField;
    self.scene.add( self.starField );
}

export function animateStarSystem() {
    let delta = this.clock.getDelta() * 1;
    this.tick += delta;
    if ( this.tick < 0 ) this.tick = 0;


    console.log(delta);
    if ( delta > 0 ) {
        console.log(this.xOffset);
        for ( let i = 0; i < 1000;  i++ ) {
        let x = Math.sin( this.tick * 1.5 + (i * this.xOffset)) * 20  ;
        let y = Math.cos( this.tick * 1.33 + (i * this.yOffset)) * 10 ;
        let z = Math.sin( this.tick * 1.5 + (1.33 * i)) * 5;
        this.starField.geometry.vertices[i].x = x;
        this.starField.geometry.vertices[i].y = y;
        this.starField.geometry.vertices[i].z = z;
        this.starField.geometry.verticesNeedUpdate = true;
        // if(i < 10) {
        //     console.log(this.starField.geometry.vertices[i])
        // }

        //this.starField.translate(x, y, z);
            // Yep, that's really it.   Spawning particles is super cheap, and once you spawn them, the rest of
            // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
        }
    }

}

// export function createGPUParticles() {

//     this.particleSystem = new GPUParticleSystem( {
//         maxParticles: 250000
//     });

//     this.scene.add(this.particleSystem)

//     this.options = {
//         position: new THREE.Vector3(),
//         positionRandomness: .3,
//         velocity: new THREE.Vector3(),
//         velocityRandomness: .5,
//         color: 0xaa88ff,
//         colorRandomness: .2,
//         turbulence: .5,
//         lifetime: 2,
//         size: 5,
//         sizeRandomness: 1
//     };

//     this.spawnerOptions = {
//         spawnRate: 15000,
//         horizontalSpeed: 1.5,
//         verticalSpeed: 1.33,
//         timeScale: 1
//     };
// }

// export function spawnGPUParticles() {
//     let delta = this.clock.getDelta() * this.spawnerOptions.timeScale;
//     this.tick += delta;
//     if ( this.tick < 0 ) this.tick = 0;

//     if ( delta > 0 ) {

//         this.options.position.x = Math.sin( this.tick * this.spawnerOptions.horizontalSpeed ) * 20;
//         this.options.position.y = Math.sin( this.tick * this.spawnerOptions.verticalSpeed ) * 10;
//         this.options.position.z = Math.sin( this.tick * this.spawnerOptions.horizontalSpeed + this.spawnerOptions.verticalSpeed ) * 5;

//         for ( let x = 0; x < this.spawnerOptions.spawnRate * delta; x++ ) {
//             // Yep, that's really it.   Spawning particles is super cheap, and once you spawn them, the rest of
//             // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below

//             this.particleSystem.spawnParticle( this.options );
//         }

//     }

//     this.particleSystem.update( this.tick );

// }

export function generateParticleSystem() {
    let particleSystems = [
        {
            p0: {
                name: 'cube0',
                imgsrc: particlepng,
                geodim: [3, 6, 3, 15, 25, 15]
            }
        },
        {
            p1: {
                name: 'cube1',
                imgsrc:lotusparticle,
                geodim: [6, 12, 6, 15, 25, 15]
            }
        }
    ]

    let self = this;
    particleSystems.forEach((ps, i)=>{
        generateParticleSystemHelper(self, ps, i);
    });
}


function generateParticleSystemHelper(self, ps, i) {
    let {name, imgsrc, geodim} = ps["p"+i];
    console.log(ps);

    let boxGeo = new THREE.BoxGeometry(geodim[0], geodim[1], geodim[2], geodim[3], geodim[4], geodim[5]);
    let psMaterial = new THREE.ParticleSystemMaterial();
    // map indicates that each particle will utilize the texture
    let loader = new THREE.TextureLoader();

    psMaterial.map = loader.load(imgsrc, function(texture) {
        let material = new THREE.MeshBasicMaterial({
            map: texture,

        });
        return material;
    });

    psMaterial.blending = THREE.AdditiveBlending;

    psMaterial.transparent = true;

    let PS = new THREE.ParticleSystem(boxGeo, psMaterial);
    PS.name = name;
    PS.sortParticles = true;
    self.objects.push(PS);
    self.scene.add(PS);
}

// create context
// loadAudio with context
// playAudio with source node

function createAudioContext() {
    let audioCtx = new AudioContext();
    // used to create source, splitter, and analyser
    let sourceNode = audioCtx.createBufferSource();
    // connects audio context with the splitter channels
    let splitter = audioCtx.createChannelSplitter();

    let analyser0 = audioCtx.createAnalyser();
    // sTC is a value between 0 and 1, 0 represents no time averaging
    analyser0.smoothingTimeConstant = 0.4;
    // fft is the size of the Fast Fourier Transform
    analyser0.fftSize = 1024;

    let analyser1 = audioCtx.createAnalyser();
    analyser1.smoothingTimeConstant = 0.4;
    analyser1.fftSize = 1024;

    sourceNode.connect(splitter);
    // specifies left and right analyser for the splitter
    splitter.connect(analyser0, 0);
    splitter.connect(analyser1, 1);
    sourceNode.connect(audioCtx.destination);
    let self = this;

    this.audioCtx = audioCtx;
    this.sourceNode = sourceNode;
    this.analyser0 = analyser0;
    this.analyser1 = analyser1;
    this.splitter = splitter;
}

function loadAudio(url, context) {
    let request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        context.decodeAudioData(request.response, function(buf) {
            playSound(buf, this.sourceNode);
        }, function(err){
            console.log(err);
        });
    }
    request.send();
    // check the link, and if i need an async request for this
}

function playSound(buffer, sourceNode) {
    sourceNode.buffer - buffer;
    sourceNode.start(0);
}

function updateCubes() {
// get the average for the first channel
    let array0= new Uint8Array(this.analyser0.frequencyBinCount);
    this.analyser0.getByteFrequencyData(array0);
    let average0 = getAverageVolume(array0);
    // get the average for the second channel
    let array1 = new Uint8Array(this.analyser1.frequencyBinCount);
    // getByteFrequency scales the cube according to its volume

    this.analyser1.getByteFrequencyData(array1);
    // this value is used to scale the objects along the y axis
    let average1 = getAverageVolume(array1);
    // clear the current state
    if (this.scene.getObjectByName('cube0')) {
        let cube0 = this.scene.getObjectByName('cube0');
        let cube1 = this.scene.getObjectByName('cube1');
        cube0.scale.y = average0 / 20;
        cube1.scale.y = average1 / 20;
    }
}


function getAverageVolume(array, start, end) {
    let values = 0;
    let average;

    let length = end - start;
    for(let i = start; i < end; i++) {
        values += array[i];
    }

    average = values / length;

    return average;
}

// AudioBufferSourceNode
//


function renderParticles() {
    let c = 0;
    this.c = c
    c++;
    // limits the speed which the waves ove around the sene
    if(c % 2 ==0) {
        updateWaves();
    }
    //stats.update();
    //rerender scene
}

function updateWaves() {
    // get the average for the first channel
    let array = new Uint8Array(this.analyser0.frequencyBinCount);
    // the waveform is derived from
    this.analyser0.getByteTimeDomainData(array);
    let pm = new THREE.ParticleBasicMaterial();
    pm.map = THREE.ImageUtils
        .loadTexture(lotusparticle);
    pm.blending = THREE.AdditiveBlending;
    pm.transparent = true;
    pm.opacity = 0.3;
    pm.size = 1.5;

    let geo = new THREE.Geometry();

    for (let i = 0; i < array.length; i++) {
        let v = new THREE.Vector3(1, array[i] / 8, (i/15));
        geo.vertices.push(v);
    }

    // create a new particle system
    let PS = new THREE.ParticleSystem(geo, pm)
    PS.sortParticles = true;

    PS.forEach((ps)=>{
        ps.position.x -= 1.5;
    })

    if(PS.length === 40) {
        let oldPS = PS.shift();
        if(oldPS) {
            this.scene.remove(oldPS)
        }

        //systems.push(ps);
        this.scene.add(PS);
    }

}