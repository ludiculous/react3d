import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 960;
const height = 500;

class MouseTracking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            svg: null
        }
    }

    componentWillMount() {
        this.renderTracking()
    }

    componentDidMount() {
        this.renderTracking()
    }

    renderTracking() {
        let i = 0;
        const svg = d3.select(this.refs.mousetracking)
        .append('svg')
        .attr('width', width)
        .attr('height', height)


        svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .on('ontouchstart' in document ? 'touchmove' : 'mousemove', function(){
            let m = d3.mouse(this)

            console.log(m)
            svg.insert('circle')
                .attr('cx', m[0])
                .attr('cy', m[1])
                .attr("r", 1e-6)
                .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
                .style("stroke-opacity", 1)
                .transition()
                .duration(2000)
                .ease(Math.sqrt)
                .attr("r", 100)
                .style("stroke-opacity", 1e-6)
            .remove();

        })
    }

    particle() {
        let {svg} = this.state;

        console.log('moving mouse')

    }

    render() {
        return (
            <div ref="mousetracking">
            </div>
        );
    }
}

export default MouseTracking;
