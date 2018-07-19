import React, { Component } from 'react';
import * as d3 from 'd3';

const data = [{"date": "1-May-12", "close": 68.13, "open": 34.12 }, {"date": "30-Apr-12", "close": 63.98, "open": 45.56 }, {"date": "27-Apr-12", "close": 67, "open": 67.89 }, {"date": "26-Apr-12", "close": 89.7, "open": 78.54 }, {"date": "25-Apr-12", "close": 99, "open": 89.23 }, {"date": "24-Apr-12", "close": 130.28, "open": 99.23 }, {"date": "23-Apr-12", "close": 166.7, "open": 101.34 }, {"date": "20-Apr-12", "close": 234.98, "open": 122.34 }, {"date": "19-Apr-12", "close": 345.44, "open": 134.56 }, {"date": "18-Apr-12", "close": 443.34, "open": 160.45 }, {"date": "17-Apr-12", "close": 543.7, "open": 180.34 }, {"date": "16-Apr-12", "close": 580.13, "open": 210.23 }, {"date": "13-Apr-12", "close": 605.23, "open": 223.45 }, {"date": "12-Apr-12", "close": 622.77, "open": 201.56 }, {"date": "11-Apr-12", "close": 626.2, "open": 212.67 }, {"date": "10-Apr-12", "close": 628.44, "open": 310.45 }, {"date": "9-Apr-12", "close": 636.23, "open": 350.45 }, {"date": "5-Apr-12", "close": 633.68, "open": 410.23 }, {"date": "4-Apr-12", "close": 624.31, "open": 430.56 }, {"date": "3-Apr-12", "close": 629.32, "open": 460.34 }, {"date": "2-Apr-12", "close": 618.63, "open": 510.34 }, {"date": "30-Mar-12", "close": 599.55, "open": 534.23 }, {"date": "29-Mar-12", "close": 609.86, "open": 578.23 }, {"date": "28-Mar-12", "close": 617.62, "open": 590.12 }, {"date": "27-Mar-12", "close": 614.48, "open": 560.34 }, {"date": "26-Mar-12", "close": 606.98, "open": 580.12 } ]
const margins = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
}
const width = 960 - margins.left - margins.right;
const height =  500 - margins.top - margins.bottom;

class LineChart extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {
        let tooltip = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', "0")
            .append('p')
            .attr('class', 'value')

        let parseTime = d3.timeParse('%d-%b-%y');
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        data.forEach((d)=> {
            d.date = parseTime(d.date);
            d.close = +d.close;
            d.open = +d.open;
        });
        console.log(data, "original")
        // sort data to an ascending order to transition line from left to right
        // does not mutate actual array, however d3 will interpret the array in ascending order
        data.sort((a,b)=>d3.ascending(a.date, b.date));
        console.log(data, "sorted")

        x.domain(d3.extent(data, (d)=>d.date));
        y.domain([0, d3.max(data, (d)=> Math.max(d.close, d.open))])

        const svg = d3.select(this.refs.linechart)

            .append('svg')
            .attr('width', width + margins.left + margins.right)
            .attr('height', height + margins.top + margins.bottom)
            .data([data])
            .style('position', 'relative')
            .append('g')
            .attr('transform', "translate(" + margins.left + "," + margins.top + ")");

        const line1 = d3.line()
            .x((d)=>x(d.date))
            .y((d)=>y(d.close))

        const line2 = d3.line()
            .x((d)=>x(d.date))
            .y((d)=>y(d.open))

        const path1 = svg.append('path')
            .data([data])
            .attr('class', 'line closeline')
            .style('fill', 'none')
            .style('stroke', 'red')
            .attr('d', line1)

        let totalLength1 = path1.node().getTotalLength();

        path1
            .attr('stroke-dasharray', totalLength1)
            .attr('stroke-dashoffset', totalLength1)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0)

        let dots1 = svg.selectAll(".dot")
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot')
            .attr('r',5)
            .attr('cx', (d)=>x(d.date))
            .attr('cy', (d)=>y(d.close))
            .style('opacity', 0)
            .on('mouseover', (d)=>mouseover(d,"close","red"))
            .on('mouseout', (d)=>mouseout(d))

        const mouseover = (d, status, color)=> {
            let xPosition = x(d.date);
            let yPosition = y(d[status]);

            console.log(xPosition, yPosition, d)

            d3.select(".tooltip")
            .style("left", xPosition + "px")
            .style("top", yPosition + "px")
            .style("color", color)
            .style("opacity", "1")
            .select(".value")
            .text("value:"+d[status] + " " + "date:"+d.date)
        }

        const mouseout = (d)=> {
            d3.select(".tooltip")
            .style("opacity", "0")
        }


        // set tooltips for line1

        const path2 = svg.append('path')
            .data([data])
            .attr('class', 'line')
            .style('fill', 'none')
            .style('stroke', 'blue')
            .attr('d', line2)

        let totalLength2 = path2.node().getTotalLength();

        path2
            .attr('stroke-dasharray', totalLength2)
            .attr('stroke-dashoffset', totalLength2)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);

        let dots2 = svg.selectAll(".dot2")
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dot2')
            .attr('r',5)
            .attr('cx', (d)=>x(d.date))
            .attr('cy', (d)=>y(d.open))
            .style('opacity', 0)
            .on('mouseover', (d)=>mouseover(d,"open","blue"))
            .on('mouseout', (d)=>mouseout(d))


        // create axis

        svg.append('g')
            .attr('transform', "translate(0, " + height + ")")
            .call(d3.axisBottom(x))

        svg.append('g')
            .call(d3.axisLeft(y))

    }

    render() {
        return (
            <div ref="linechart">
            </div>
        );
    }
}

export default LineChart;
