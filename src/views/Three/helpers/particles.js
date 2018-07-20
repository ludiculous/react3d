import * as THREE from 'three';

export function generateParticleSystem() {

}

function loadAudio() {
    let audioCtx = new AudioContext();
    // used to create source, splitter, and analyser
    let sourceNode = audioCtx.createBufferSource();
    let splitter = audioCtx.createChannelSplitter();

    let analyser0 = audioCtx.createAnalyser();
    analyser0.smoothingTimeConstant = 0.4;
    analyser0.fftSize = 1024;

    let analyser1 = audioCtx.createAnalyser();
    analyser1.smoothingTimeConstant = 0.4;
    analyser1.fftSize = 1024;

    sourceNode.connect(splitter);
    // specifies left and right analyser for the splitter
    splitter.connect(analyser0, 0);
    splitter.connect(analyser1, 1);
    sourceNode.connect(audioCtx.destination);
}