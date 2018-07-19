import React, { Component } from 'react';
import Particle from './Particle';


// requires an array of objects with
// properties of id, x ,y coordinates

class Particles extends Component {
    constructor(props) {
        super(props);
    }

    renderParticles() {
    console.log(this.props.particles, "from particle")
       return this.props.particles.map(particle =>
                    <Particle key={particle.id}
                        {...particle}
                    />
        )
    }

    render() {
        return (
            <g>
                {this.renderParticles()}
            </g>
        );
    }
}

export default Particles;
