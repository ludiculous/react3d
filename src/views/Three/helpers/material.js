import React, { Component } from 'react';
import * as THREE from 'three';
import brickMaterial from 'assets/3d/Brick-2399.jpg';
import brickBump from 'assets/3d/Brick-2399-bump-map.jpg';
import Gorillaz from 'assets/video/Gorillaz.mp4';

export function applyBumpMaterial() {
    let cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
    let BumpMaterial = new THREE.MeshPhongMaterial();
    BumpMaterial.map = THREE.ImageUtils.loadTexture(brickMaterial);
    BumpMaterial.bumpMap = THREE.ImageUtils.loadTexture(brickBump);

    let bumpCube = new THREE.Mesh(cubeGeometry, BumpMaterial);
    this.scene.add(bumpCube);
}

export function applyCanvasMaterial() {
    let canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
}

 //video, videoImage, videoImageContext, videoTexture;

export function applyVideoMaterial() {

    let video = document.createElement('video');
    video.src = Gorillaz;
    video.load();
    video.play();

    let videoImage = document.createElement('canvas');
    videoImage.width = 480;
    videoImage.height = 204;

    let videoImageContext = videoImage.getContext('2d');
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

    // apply the canvas onto the texture
    let videoTexture = new THREE.Texture(videoImage );
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    let videoMaterial = new THREE.MeshBasicMaterial({
        map: videoTexture,
        overdraw: true,
        side:THREE.DoubleSide
    });
    //(width, height, width segments, height segments)
    let videoGeometry = new THREE.PlaneGeometry( 240, 100, 4, 4 );
    let videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    videoMesh.position.set(0, 50, 0);
    this.objects[0] = videoMesh;
    this.scene.add(videoMesh);
    this.media = {
        video,
        videoImageContext,
        videoTexture
    }
    // PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
    // let sphere = new THREE.SphereGeometry(5, 32, 32 );
    // let sphereMesh = new THREE.Mesh(sphere, material);
}

export function updateVideoMaterial() {
    if (this.media.video.readyState === this.media.video.HAVE_ENOUGH_DATA ) {
        console.log('video loaded')
        this.media.videoImageContext.drawImage( this.media.video, 0, 0 );
        if ( this.media.videoTexture ) {
            console.log('updating video texture');
            this.media.videoTexture.needsUpdate = true;
        }
    }
}


