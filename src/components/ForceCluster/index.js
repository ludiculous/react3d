import React, { Component } from 'react';
import * as d3 from 'd3';
import { forceAttract } from 'd3-force-attract';
import { forceCluster } from 'd3-force-cluster';

const svgDimensions = {
    width: 960,
    height: 500,
    padding: 1.5,
    clusterPadding: 6,
    maxRadius: 12
}

const transitionTime = 3000;

class ForceCluster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            force: {},
            simulation: {},
            nodes: [],
            circles: [],
            n: 200,
            m: 10,
            color: d3.scaleSequential(d3.interpolateRainbow).domain(d3.range(10))
        }
    }

    componentWillMount() {
        this.createNodes();
        this.createSimulation();
    }

    componentDidMount() {
        this.createSimulation();
    }

    createNodes() {

        let clusters = new Array(this.state.m);
        let nodes = d3.range(this.state.n).map(()=> {
            let i = Math.floor(Math.random() * this.state.m);
            let r = Math.sqrt((i + 1) / this.state.m * -Math.log(Math.random())) * svgDimensions.maxRadius
            let d = {
                cluster: i,
                radius: r,
                x: Math.cos(i / this.state.m * 2 * Math.PI) * 200 + svgDimensions.width / 2 + Math.random(),
                y: Math.sin(i / this.state.m * 2 * Math.PI) * 200 + svgDimensions.height / 2 + Math.random()
            };
            // if clusters does not exist and
            if(!clusters[i] || (r > clusters[i])) {
                clusters[i] = d;
            }
            return d;
        })

        this.setState({nodes:nodes}, ()=>console.log(this.state));
    }

    createSimulation() {
        // set reference
        let force = d3.select(this.refs.forcecluster).append('svg').attr('width', svgDimensions.width).attr('height', svgDimensions.height)
        // set sim
        let simulation = d3.forceSimulation()
        // positions points and attracts them towards center
        // strength indicates the % a target should close the distance towards its source
        .force('center', d3.forceCenter(svgDimensions.width / 2, svgDimensions.height/2))
        // .force('attract',
        //     forceAttract()
        //     .target([svgDimensions.width/2, svgDimensions.height/2])
        //     .strength(0.01)
        // )
        .force('cluster',
            forceCluster()
            .centers((d)=> this.state.nodes[d.cluster])
            .strength(0.5)
            .centerInertia(0.1)
        )
        // collision prevents forces from overlapping the radius defines the barrier dimensions
        .force('collide',
            d3.forceCollide((d)=>d.radius + svgDimensions.padding)
            .strength(0)
        )
        .on('tick', this.ticked.bind(this))
        .nodes(this.state.nodes)

        let t = d3.timer((elapsed)=>{
            let dt = elapsed / transitionTime;
            simulation.force('collide')
            .strength(Math.pow(dt, 2) * 0.7);
            if(dt >= 1.0) {
                t.stop();
            }
        });
        console.log(this.state.nodes)

        let circles = force.selectAll('.circle')
            .data(this.state.nodes)
            .enter()
            .append('circle')
            .style('fill', (d)=>this.state.color(d.cluster/10))
            .call(d3.drag()
                .on('start', (d)=>{
                    if(!d3.event.active) simulation.alphaTarget(0.3).restart();
                      d.fx = d.x;
                      d.fy = d.y;
                    })
                .on('drag', (d)=>{
                        console.log(d.fx)
                        d.fx = d3.event.x;
                        d.fy = d3.event.y;
                    })
                .on('end', (d)=>{
                          if (!d3.event.active) simulation.alphaTarget(0);
                          d.fx = null;
                          d.fy = null;
                    })
        )

        this.setState({
            force: force,
            simulation: simulation,
            circles: circles
        });

    }

    ticked() {
        let { force, simulation, circles } = this.state;

        circles
            .attr('cx', (d)=>d.x)
            .attr('cy', (d)=>d.y)
            .attr('r', (d)=>d.radius)
    }

    render() {
        return (
            <div ref="forcecluster">
            </div>
        );
    }
}

export default ForceCluster;
