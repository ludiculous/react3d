import React, { Component } from 'react';
import * as d3 from 'd3';

const margins = {
    top: 20, right: 20, bottom: 30, left: 50
}

const svgDimensions = {
    width: 800 - margins.left - margins.right,
    height: 400 - margins.top - margins.bottom
}

const transition = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

class ScatterPlot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 150,
            data: [],
            xExtent: {},
            yExtent: {},
            context: {},
            x: d3.scaleLinear().range([0, svgDimensions.width]),
            y: d3.scaleLinear().range([svgDimensions.height, 0])
        }
    }

    componentDidMount() {
        this.randomData(200);
        let context = this.setContext();

        this.setState({
            context: context
        }, function(){
            console.log(this.state)
        })
        this.createChart(context);
    }

    setContext() {
        console.log("setting context")
        return d3.select(this.refs.scatterplot).append('svg')
            .attr('height', svgDimensions.height + margins.top + margins.bottom)
            .attr('width', svgDimensions.width + margins.left + margins.right)
            .attr('data-margin-right', margins.right)
            .attr('data-margin-left', margins.left)
            .attr('data-margin-top', margins.top)
            .attr('data-margin-bottom', margins.bottom)
            .attr('id', 'scatterplot_1')
            .append('g')
            .attr('transform', `translate(${margins.left}, ${margins.top})`)
    }

    createChart(context) {
                // nice rounds the numbers
        let {x, y} = this.state;

        x.domain(d3.extent(this.state.data, (d)=>d.x)).nice()
        y.domain(d3.extent(this.state.data, (d)=>d.y)).nice()
        const xAxis = d3.axisBottom(x).ticks(12);
        const yAxis = d3.axisLeft(y).ticks(12 * svgDimensions.height / svgDimensions.width);

        context
            .append('g')
            .attr('class', 'x axis')
            .attr('id', 'axis--x')
            .attr('transform', `translate(0,${svgDimensions.height})`)
            .call(xAxis)

        context
            .append('g')
            .attr('class', 'y axis')
            .attr('id', 'axis--y')
            .call(yAxis)

        context
            .selectAll(".dot")
            .data(this.state.data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r', 4)
            .attr('cx', (d)=>x(d.x))
            .attr('cy', (d)=>y(d.y))
            .attr('opacity', .5)
            .style('fill', '#4292c6')
    }

    randomData(samples) {
        console.log("setting data")
        let newData = this.state.data;
        if(newData.length > 1) {
            newData = []
        }
        let random = d3.randomNormal();
        console.log(newData)

        for (let i = 0; i < samples; i++) {
            newData.push({
                x: Math.floor(Math.random() * Math.floor(samples)),
                y: Math.floor(Math.random() * Math.floor(samples))
            })
        }

        this.setState({
            data: newData
        });
    }

    handleColorChange() {
        console.log("cc")
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        //let context = d3.select("#scatterplot_1");
        let context = this.state.context;
        console.log(color)

        if(context.selectAll('circle').style('fill') == "rgb(66, 146, 198)") {
            console.log("found circle")
            context.selectAll('circle')
                .transition(transition)
                .style('fill', "#d6604d")
        } else {
            context.selectAll('circle')
                .transition(transition)
                .style('fill', "#4292c6")
        }

    }

    handleDataChange() {
        console.log("dc")
        let {context, x, y, data} = this.state

        this.randomData(200);
        console.log(this.state.data)

        const xAxis = d3.axisBottom(x).ticks(12);
        const yAxis = d3.axisLeft(y).ticks(12 * svgDimensions.height / svgDimensions.width);


        context.select('#axis--x').transition(transition).call(xAxis);
        context.select('#axis--y').transition(transition).call(yAxis);

        context
            .selectAll(".dot")
            .data(data)
        context
            .selectAll('circle')
            .transition(transition)
            .attr('cx', (d)=>x(d.x))
            .attr('cy', (d)=>y(d.y))

    }

    render() {
        return (
            <div ref='scatterplot'>

                <button onClick={this.handleColorChange.bind(this)}>Color</button>
                <button onClick={this.handleDataChange.bind(this)}>Data</button>
            </div>
        );
    }
}

export default ScatterPlot;
