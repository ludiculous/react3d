import React, { Component } from 'react';
import * as d3 from 'd3';

class Circle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            y:this.props.y
        }
    }

    componentDidMount() {
        d3.select(this.refs.circle)
            .classed('circle--transitioning', true)
            .style('stroke', '#3E6E9C')
            .attr('cy', 0)
            .transition()
            .duration( Math.floor(Math.random() * Math.floor(5000)))
            .style('stroke', '#D8E467')
            .style('opacity', 0)
            .attr('cy', 500);
    }

    render() {
        return (
                <circle
                    ref='circle'
                    className='circle'
                    cx={this.props.x}
                    cy={this.state.y}
                    r={this.props.r}
                />
        );
    }
}

export default Circle;
