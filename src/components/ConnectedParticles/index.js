import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 960;
const height = 500;
const radius = 2.5;
const minDistance = 40;
const maxDistance = 60;
const minDistance2 = minDistance * minDistance;
const maxDistance2 = maxDistance * maxDistance;
// create a canvas with a 2d context
// specify dimensions
// create particles
// specify x,y, vx, vy

class ConnectedParticles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tau: 2 * Math.PI,
            n: 200
        }
    }

    componentDidMount() {
        this.createContext();
    }

    createContext() {
        let context = this.refs.connectedparticles.getContext('2d')
        this.renderLinks(context)
    }

    renderLinks(context) {
        let {tau,n} = this.state;
        let particles = new Array(this.state.n)
        for(var i =0; i < n; i++) {
            particles[i] = {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: 0,
                vy: 0
            }
        }

        d3.timer((elapsed)=>{
            // saves the context into the stack
            context.save();
            // clear the canvas
            context.clearRect(0, 0, width, height);

            for(let i=0; i<n; i++) {
                let p = particles[i];
                p.x += p.vx;
                if(p.x < -maxDistance) {
                    // checks the x distance of the particle if it is less than the max distance
                    // update current distance with the width
                    p.x += width + maxDistance * 2
                } else if(p.x > width + maxDistance) {
                    // check if the particle is off the screen
                    p.x -= width + maxDistance * 2;
                }

                p.y += p.vy;
                if(p.y < -maxDistance) {
                    // checks the x distance of the particle if it is less than the max distance
                    // update current distance with the width
                    p.y += width + maxDistance * 2
                } else if(p.y > width + maxDistance) {
                    // check if the particle is off the screen
                    p.y -= width + maxDistance * 2;
                }

                p.vx += 0.2 * (Math.random() - .5) - 0.01 * p.vx;
                p.vy += 0.2 * (Math.random() - .5) - 0.01 * p.vy;
                context.beginPath();
                //draws the circles
                context.arc(p.x, p.y, radius, 0, tau);
                context.fill();
            }

            for(let i=0; i<n; i++) {
                for(let j=i + 1; j < n; j++) {
                    let pi = particles[i],
                      pj = particles[j],
                      dx = pi.x - pj.x,
                      dy = pi.y - pj.y,
                      d2 = dx * dx + dy * dy;
                      if (d2 < maxDistance2) {
                        context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
                        context.beginPath();
                        context.moveTo(pi.x, pi.y);
                        context.lineTo(pj.x, pj.y);
                        context.stroke();
                      }
                }
            }
            context.restore();
        })
    }

    render() {
        return (
            <canvas ref="connectedparticles"
                width={width}
                height={height}
            >

            </canvas>
        );
    }
}

export default ConnectedParticles;
