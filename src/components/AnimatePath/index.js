import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 700;
const height = 300;
const margin = 10;
// domain is the complete set of values

// range is the set of resulting values of a function
class AnimatePath extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            x: null,
            y: null,
            animated: false
        }
    }

    componentWillMount() {
        this.genData();
    }

    componentDidMount() {
        this.renderLine();
    }

    genData() {
        let data = d3.range(11).map(()=>Math.random()*10)
        let x = d3.scaleLinear().domain([0, 10]).range([0,width]);
        let y = d3.scaleLinear().domain([0, 10]).range([margin, height-margin]);

        this.setState({
            data: data,
            x: x,
            y: y
        }, ()=>console.log(this.state));
    }

    renderLine() {
        // draws a straight line

        let {x, y, data} = this.state;

        const svg = d3.select(this.refs.animatedpath).append('svg')
            svg.attr('width', width)
            svg.attr('height', height)
            svg.attr('id', 'animated_path')

        const line = d3.line()
            .x((d,i)=>x(i))
            .y((d,i)=>y(i))

        // defining an svg path
        const path = svg.append('path')
            .attr('d', line(data))
            .attr('stroke', 'steelblue')
            .attr('stroke-width', '2')
            .attr('fill', 'none')

        let totalLength = path.node().getTotalLength();
        console.log(totalLength)
        // // defines the dash pattern
        path
            .attr('stroke-dasharray', totalLength  )
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        svg.on('click', ()=>{
            console.log("clicked svg")
            path
                .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', totalLength)
        })

        d3.interval(()=> {

            if(this.state.animated) {
                this.setState({animated:false})
                path
                .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', 0)
            } else {
                this.setState({animated:true})
                path
                .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset',  totalLength)
            }

        }, 5000);
    }

    render() {
        return (
            <div ref="animatedpath">
            </div>
        );
    }
}

export default AnimatePath;
