import * as THREE from 'three';
import keke from 'assets/audio/keke.mp3';

export function loadAudio(){
    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    let sound = new THREE.Audio(listener);
    let audioLoader = new THREE.AudioLoader();

    audioLoader.load(keke, (buffer)=> {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
}