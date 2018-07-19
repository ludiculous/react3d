import React, { Component } from 'react';
import * as d3 from 'd3';

const width = 500;
const height = 800;
const margins = {
    top: 40, right: 10, bottom: 20, left: 10
}

class TextTransition extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let format = d3.format(",d");
        const svg = d3.select(this.refs.textransition)
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        const g = svg.append('g').attr('transform', "translate(0, 50)")
        const num =  g.append('text')
            .attr('class', 'nums')
            .attr('x', 100)
            .attr('y', 100)
            .text(0)
            .attr('fill', '#e3e3e3')

            // d3.active get current frame
            // 1e6 = 1*10^6
        d3.select('.nums')
            .transition()
            .duration(5000)
            .on('start', function repeat(){
                d3.active(this)
                // assigns a tween for the specified value

                    .tween('text', function() {
            var that = d3.select(this),
                i = d3.interpolateNumber(that.text().replace(/,/g, ""), 50);
                // the returned function is then invoked for each frame
            return function(t) { that.text(format(i(t)));
            };
          })
        .transition()
          .delay(1500)
          .on("start", repeat)
            })

    }



    render() {
        return (
            <div ref="textransition">
            </div>
        );
    }
}

export default TextTransition;
