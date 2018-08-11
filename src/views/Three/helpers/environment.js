import React, { Component } from 'react'
import * as THREE from 'three';
import gorilla from 'assets/video/Gorillaz.mp4';

export function loadSkyBox() {

    const loader = new THREE.TextureLoader();
    const plane_geo = new THREE.PlaneGeometry(2, 2, 0);

    loader.load('https://raw.githubusercontent.com/learnthreejs/three-js-boilerplate/master/public/examples/background-image/assets/space-background.jpg', (texture)=>{
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

const video = ()=> {
    return (
        <video id="video" autoplay loop style={{"display":"none"}}>
            <source src={gorilla}/>
        </video>
    )
}