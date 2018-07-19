import React, { Component} from 'react';
import * as d3 from 'd3';

const margins = {
    top: 20, right: 20, bottom: 30, left: 50
}

const svgDimensions = {
    width: 960,
    height: 500
}

const transition = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

const graphData = {
    "nodes": [
        {"id": "red"}, {"id": "orange"}, {"id": "yellow"}, {"id": "green"}, {"id": "blue"}, {"id": "violet"}
    ],
    "links": [
        {"source": "red", "target": "yellow"},
        {"source": "red", "target": "blue"},
        {"source": "red", "target": "green"},
        {"source": "green", "target": "orange"}
    ]
};
class ForceSim extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            force: {}
        }
    }

    componentDidMount() {
        //this.genNodes(10);
        this.createContext();
    }

    genNodes(n) {
        let newNodes = this.state.nodes
        if(newNodes.length > 1) {
            newNodes = [];
        }
        for(let i = 0; i< n; i++) {
            newNodes.push({
                x: Math.floor(Math.random() * Math.floor(n)),
                y: Math.floor(Math.random() * Math.floor(n))
            })
        }
        this.setState({
            nodes: newNodes
        }, ()=>console.log(this.state));
    }

    createContext(){
        let force = d3.select(this.refs.forcesim).append('svg').attr('width', svgDimensions.width).attr('height', svgDimensions.height)
        let width = +force.attr('width');
        let height = +force.attr('height');
        this.setState({force:force});

        let simulation = d3.forceSimulation()
            .force('charge', d3.forceManyBody().strength(-1000))
            .force('link', d3.forceLink().id((d)=> d.id).distance(100))
            .force("center", d3.forceCenter(svgDimensions.width / 2, svgDimensions.height / 2))
            .force('x', d3.forceX(width/2))
            .force('y', d3.forceY(height/2))
            .on('tick', this.ticked.bind(this));

        simulation
            .nodes(graphData.nodes)
            .force('link')
            .links(graphData.links);
    }

    ticked() {
        let force = this.state.force;
        let link = force.selectAll('.link');
        let node = force.selectAll('.node');
        let bias = Math.floor(Math.random() * Math.floor(100))

            link = link
                .data(graphData.links)
                .enter()
                .append('line')
                .attr('class', 'link')

            node = node
                .data(graphData.nodes)
                .enter()
                .append('circle')
                .attr('class', 'node')
                .attr('r', 6)
                .style('fill', (d)=>d.id)

            console.log("ticked")
            link.attr("x1", function(d) { return d.source.x })
                .attr("y1", function(d) { return d.source.y })
                .attr("x2", function(d) { return d.target.x })
                .attr("y2", function(d) { return d.target.y });

            node.attr("cx", function(d) { return d.x })
                .attr("cy", function(d) { return d.y });
    }

    render() {
        return (
            <div ref="forcesim">
            </div>
        );
    }
}

export default ForceSim;
