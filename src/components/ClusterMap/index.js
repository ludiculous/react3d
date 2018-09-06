import React, { Component } from 'react';
import * as d3 from 'd3';


class ClusterMap extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.ele_height = 960;
        this.ele_width = 960;
        this.ele_margin = 20;
        this.ele_diameter = this.ele_width;
    }


    componentWillMount() {
        // generate data
    }

    componentDidMount() {
        this.createContext();

    }

    zoomTo(v) {

    }

    createContext() {
        let context = d3.select(this.refs.cluster_map).append('svg')
            .attr('width', this.ele_width)
            .attr('height', this.ele_height)
            .attr('margin', this.ele_margin)

        let g = context.append('g')
            .attr('transform', `translate("${this.ele_diameter /2}, ${this.ele_diameter /2}")`);

    }

    render() {
        return (
            <div ref="cluster_map">
            </div>
        );
    }
}

export default ClusterMap;
