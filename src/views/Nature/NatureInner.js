import React, { Component } from 'react';
import Particles from './elements/Particles';
import * as d3 from 'd3';

class NatureInner extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let svg = d3.select(this.refs.svg);

        svg.on('mousedown', ()=>{
            this.updateMousePos();
            this.props.startParticles();
        });

        svg.on('mousemove', () => {
            this.updateMousePos();
        });

        svg.on('mouseup', () => {
            this.props.stopParticles();
        });

        svg.on('mouseleave',() => {
            this.props.stopParticles();
        });

        svg.on('touchstart', ()=>{
            this.updateTouchPos();
            this.props.startParticles();
        });

        svg.on('touchmove', () => {
            this.updateTouchPos();
        });

        svg.on('touchend', () => {
            this.props.stopParticles();
        });

    }

    updateMousePos() {
        let x = d3.mouse(this.refs.svg)[0];
        let y = d3.mouse(this.refs.svg)[1];

        this.props.updateMousePos(x, y);
       // this.props.createParticles(15,x,y)
    }

    updateTouchPos() {
        let {x, y } = d3.touches(this.refs.svg)[0];
        this.props.updateMousePos(x, y);
       // this.props.createParticles(15,x,y)
    }

    render() {
        const {svgWidth, svgHeight, particles} = this.props.nature
        console.log(this.props.nature.particles)
        return (
            <div onMouseDown = {e => this.props.startTicker()}>
                <svg
                    width={svgWidth}
                    height={svgHeight}
                    ref="svg"
                    style={{background: 'rgba(124, 224, 249, .3)'}}
                >
                    <Particles particles={this.props.nature.particles}/>
                </svg>
            </div>
        );
    }
}

export default NatureInner;
