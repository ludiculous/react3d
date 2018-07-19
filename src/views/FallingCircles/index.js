import React, { Component } from 'react';
import * as d3 from 'd3';
import Circle from './Circle';
import ReactTransitionGroup from "react-addons-transition-group";

let width = 960
let height = 500

let x = d3.scaleLinear()
  .domain([0, 1])
  .range([0, width]);

let y = d3.scaleLinear()
  .domain([0, 1])
  .range([150, height - 150]);

let r = d3.scaleSqrt()
  .domain([0, 1])
  .range([0, 30]);

class FallingCircles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            circlesCreated: 0
        }
    }

    componentWillMount() {
        this.addCircles()
        d3.interval(()=> {
            if(this.state.data.length < 25) {
                this.addCircles();
            } else {
                this.setState({
                    data: this.state.data.slice(Math.floor(Math.random() * Math.floor(100)))
                })
            }
        }, 2500)
    }

    addCircles() {
        let circleData = []
        for(let i = 0; i<100; i++){
            console.log("adding to data")
            circleData.push({
                key: Date.now(),
                x: x(Math.random()),
                y: y(Math.random()),
                r: r(Math.random())
            })
        }
        this.setState({data:circleData})
    }

    renderCircle() {
        console.log("rendering Circles")
        return this.state.data.map((circle, i)=>
                <Circle
                    x={circle.x}
                    y={0}
                    r={circle.r}
                    key={`circle-${i}`}
                    height={height}
                />
        )
    }

    render() {

        return (
             <ReactTransitionGroup className="falling-circles">
                <g>
                    <svg
                        width={width}
                        height={height}
                    >
                        {this.renderCircle()}
                    </svg>
                </g>
             </ReactTransitionGroup>
        );
    }
}

export default FallingCircles;
