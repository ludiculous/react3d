import React, { Component} from 'react';
import * as d3 from 'd3';

class CircleWave extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.renderCircleWave()
    }

    componentDidUpdate() {

    }

    renderCircleWave() {
        let node = d3.select(this.refs.circleWave);
        let width = 960
        let height = 500
        let angles = d3.range(0, 2 * Math.PI, Math.PI / 200)

        let x = width/2;
        let y = height/2;

        let path = node.append('g')
            .attr('transform', `translate(${x},${y})`)
            .attr('fill', 'none')
            .attr('stroke-width', 10)
            .attr('stroke-linejoin', 'round')
        .selectAll('path')
        .data(["cyan", "magenta", "yellow"])
        .enter()
        .append('path')
        .attr('stroke', d=>d)
        .style('mix-blend-mode', 'darken')
        .datum((d,i)=> {
            return d3.radialLine()
                .curve(d3.curveLinearClosed)
                .angle(a=>a)
                .radius(a=>{
                    let t = d3.now() / 5000;
                    return 200 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 32;
            });
        });

        d3.timer(()=>{
            path.attr('d',(d)=>d(angles))
        })
    }

    render() {
        return (
            <svg
                ref="circleWave"
                width={960}
                height={500}
            >
            </svg>
        );
    }
}

export default CircleWave;
