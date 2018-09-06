import * as THREE from 'three';
import {DotScreenShader, RGBShiftShader} from 'three-full'
import {EffectComposer, RenderPass, ShaderPass, GlitchPass, BokehShader2} from 'three-full';
//import EffectComposer, { RenderPass, ShaderPass, CopyShader } from 'three-effectcomposer-es6'

export function createPostProcessing() {
    //console.log(this.renderer)

    this.composer = new EffectComposer(this.renderer)


    const dot_effect = new ShaderPass(DotScreenShader);
    dot_effect.uniforms['scale'].value = 4;



    const rgb_shift_effect = new ShaderPass(RGBShiftShader)
    rgb_shift_effect.renderToScreen = true;

    const glitch_pass = new GlitchPass();



    this.composer.addPass(new RenderPass(this.scene, this.camera))
    //this.composer.addPass(dot_effect)
    //this.composer.addPass(glitch_pass);

    this.composer.addPass(rgb_shift_effect)
}


   // // accepts an object with 3 properties uniforms, vertexshader, and fragment shader
   //  // let dot_effect = new ShaderPass(DotScreenShader);
   //  // dot_effect.uniforms['scale'].value = 4;
   //  let glitch_pass = new GlitchPass();
   //  glitch_pass.renderToScreen = true;

   //  // let rgb_shift_effect = new ShaderPass(RGBShiftShader)
   //  // rgb_shift_effect.uniforms['amount'].value = 0.0015;
   //  // rgb_shift_effect.renderToScreen = true;

   //  // console.log(render_pass)
   //  // console.log(dot_effect)
   //  // console.log(rgb_shift_effect)

   //  this.composer.addPass(render_pass);
   //  this.composer.addPass(glitch_pass);
   //  // this.composer.addPass(dot_effect);
   //  // this.composer.addPass(rgb_shift_effect);
