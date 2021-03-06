import * as THREE from 'three';

export function bounce() {
    this.step += 0.04;
    let moveX = this.objects[0].position.x = 20+( 10*(Math.cos(this.step)));
    let moveY = this.objects[0].position.y = 2 +( 10*Math.abs(Math.sin(this.step)));
}

export function orbit() {
    this.date = Date.now() * 0.0001;
    let orbitRadius = 30;
    for(let i=0; i < this.spheres.length; i++) {
            this.spheres[i].position.set(
              Math.cos(this.date + i) * orbitRadius + i,
              Math.tan(this.date + i) * orbitRadius,
              Math.sin(this.date + i) * orbitRadius
            );
    }
}

export function satellite(object) {

  //this.a += this.da  % 10;
  this.date = Date.now() * 0.0001;

  //console.log(this.a)
  object.position.x = this.r* Math.sin(this.date);
  object.position.z = this.r* Math.cos(this.date);
  object.rotation.y = this.r* Math.sin(Date.now() * 0.00000001);
}