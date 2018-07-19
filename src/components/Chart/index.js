import React, { Component } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import Axes from '../Axes';
import Bars from '../Bars';
import ResponsiveWrapper from '../ResponsiveWrapper';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.xScale = scaleBand()
        this.yScale = scaleLinear()
    }

    render() {
        const margins = {
            top: 50,
            right: 20,
            bottom: 100,
            left: 60
        }
        const svgDimensions = {
            width: this.props.width,
            height: this.props.width * .625
        }
        const maxValue = Math.max(...this.props.data.map(d=>d.value))
        //the title data creates the labels for the xAxis
        const xScale = this.xScale
            .padding(.5)
            .domain(this.props.data.map(d=>d.title))
            .range([margins.left, svgDimensions.width - margins.right])

        // the y scale has a domain from 0 and the height of the max value
        // the range is the height of the chart margin top and bottom which serves as the bias
        const yScale = this.yScale
            .domain([0, maxValue])
            .range([svgDimensions.height - margins.bottom, margins.top])

        return (
            <svg
                width={svgDimensions.width}
                height={svgDimensions.height}
            >
                <Axes
                    scales={{xScale, yScale}}
                    margins={margins}
                    svgDimensions={svgDimensions}
                />
                <Bars
                    scales={{xScale, yScale}}
                    margins={margins}
                    data={this.props.data}
                    svgDimensions={svgDimensions}
                    maxValue={maxValue}
                />
            </svg>
        );
    }
}

export default ResponsiveWrapper(Chart);
