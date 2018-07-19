import React, { Component } from 'react';
import * as d3 from 'd3';

class ProgressArc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tau: Math.PI * 2,
            position: 150
        }
    }

    componentDidMount() {
        console.log("cdm")
        this.updateContext();
    }

    componentWillReceiveProps() {
        this.updateContext();
    }

    createContext() {
        let context = this.setContext();
        this.setBackground(context);
        this.setForeground(context);
        this.updatePercent(context);
    }

    updateContext() {
        console.log("arc updating")
        let context = d3.select(`#${this.props.id}`)
        context.remove();
        // remove old context if exists then create new
        this.createContext();
    }

    setContext() {
        //returns a blank canvas to draw on
        return d3.select(this.refs.arc).append('svg')
            .attr('height', this.props.size)
            .attr('width', this.props.size)
            .attr('id', this.props.id)
            .append('g')
            .attr('transform', `translate(${this.state.position},${this.state.position})`)
    }

    setBackground(context) {
        return context.append('path')
            .datum({ endAngle: this.state.tau })
            .style('fill', this.props.bColor)
            .attr('d', this.arc());
    }

    setForeground(context) {
        return context.append('path')
            .datum({ endAngle: 0})
            .style('fill', this.props.fColor)
            .attr('d', this.arc());
    }

    arc() {
        return d3.arc()
          .innerRadius(this.props.innerRadius)
          .outerRadius(this.props.outterRadius)
          .startAngle(0)
    }

    //animations

    updatePercent(context) {
        // calls a chain of functions to update the foreground
        return this.setForeground(context).transition()
            .duration(this.props.duration)
            .call(this.arcTween, this.state.tau * this.props.progress,
            this.arc()
            );
    }

    arcTween(transition, newAngle, arc) {
        transition.attrTween('d', (d)=>{
            const interpolate = d3.interpolate(d.endAngle, newAngle);
            const newArc = d;
            return (t) => {
                newArc.endAngle = interpolate(t);
                return arc(newArc);
            }
        });
    }

    render() {
        return (
            <div ref='arc'></div>
        );
    }
}

export default ProgressArc;
