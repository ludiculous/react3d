import React, { Component } from 'react';
import * as d3 from 'd3';

// number of series
//const data = [{"State": "CA", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 2704659 }, {"State": "CA", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 2677612 }, {"State": "CA", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 2623519 }, {"State": "CA", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 4499890 }, {"State": "CA", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 5489866 }, {"State": "CA", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 7469817 }, {"State": "CA", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 2159981 }, {"State": "CA", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 2635177 }, {"State": "CA", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 3585568 }, {"State": "CA", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 3853788 }, {"State": "CA", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 4624546 }, {"State": "CA", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 6166061 }, {"State": "CA", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 10604510 }, {"State": "CA", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 12513322 }, {"State": "CA", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 16330945 }, {"State": "CA", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 8819342 }, {"State": "CA", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 7937408 }, {"State": "CA", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 6173539 }, {"State": "CA", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 4114496 }, {"State": "CA", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 4443656 }, {"State": "CA", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 5101975 }, {"State": "TX", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 2027307 }, {"State": "TX", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 2290857 }, {"State": "TX", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 2817957 }, {"State": "TX", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 3277946 }, {"State": "TX", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 2884592 }, {"State": "TX", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 2097885 }, {"State": "TX", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 1420518 }, {"State": "TX", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 1434723 }, {"State": "TX", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 1463134 }, {"State": "TX", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 2454721 }, {"State": "TX", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 2111060 }, {"State": "TX", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 1423738 }, {"State": "TX", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 7017731 }, {"State": "TX", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 6666844 }, {"State": "TX", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 5965071 }, {"State": "TX", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 5656528 }, {"State": "TX", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 7070660 }, {"State": "TX", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 9898924 }, {"State": "TX", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 2472223 }, {"State": "TX", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 2472223 }, {"State": "TX", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 2472223 }, {"State": "NY", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 1208495 }, {"State": "NY", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 1087646 }, {"State": "NY", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 845947 }, {"State": "NY", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 2141490 }, {"State": "NY", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 2655448 }, {"State": "NY", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 3683363 }, {"State": "NY", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 1058031 }, {"State": "NY", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 1227316 }, {"State": "NY", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 1565886 }, {"State": "NY", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 1999120 }, {"State": "NY", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 2159050 }, {"State": "NY", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 2478909 }, {"State": "NY", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 5355235 }, {"State": "NY", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 5622997 }, {"State": "NY", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 6158520 }, {"State": "NY", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 5120254 }, {"State": "NY", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 6349115 }, {"State": "NY", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 8806837 }, {"State": "NY", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 2607672 }, {"State": "NY", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 2946669 }, {"State": "NY", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 3624664 }, {"State": "FL", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 1140516 }, {"State": "FL", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 1231757 }, {"State": "FL", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 1414240 }, {"State": "FL", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 1938695 }, {"State": "FL", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 2287660 }, {"State": "FL", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 2985590 }, {"State": "FL", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 925060 }, {"State": "FL", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 1063819 }, {"State": "FL", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 1341337 }, {"State": "FL", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 1607297 }, {"State": "FL", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 1446567 }, {"State": "FL", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 1125108 }, {"State": "FL", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 4782119 }, {"State": "FL", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 5977649 }, {"State": "FL", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 8368708 }, {"State": "FL", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 4746856 }, {"State": "FL", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 4556982 }, {"State": "FL", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 4177233 }, {"State": "FL", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 3187797 }, {"State": "FL", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 3857234 }, {"State": "FL", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 5196109 }, {"State": "IL", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 894368 }, {"State": "IL", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 912255 }, {"State": "IL", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 948030 }, {"State": "IL", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 1558919 }, {"State": "IL", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 1808346 }, {"State": "IL", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 2307200 }, {"State": "IL", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 725973 }, {"State": "IL", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 813090 }, {"State": "IL", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 987323 }, {"State": "IL", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 1311479 }, {"State": "IL", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 1613119 }, {"State": "IL", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 2216400 }, {"State": "IL", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 3596343 }, {"State": "IL", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 4351575 }, {"State": "IL", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 5862039 }, {"State": "IL", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 3239173 }, {"State": "IL", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 2623730 }, {"State": "IL", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 1392844 }, {"State": "IL", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 1575308 }, {"State": "IL", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 1811604 }, {"State": "IL", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 2284197 }, {"State": "PA", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 737462 }, {"State": "PA", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 781710 }, {"State": "PA", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 870205 }, {"State": "PA", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 1345341 }, {"State": "PA", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 1641316 }, {"State": "PA", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 2233266 }, {"State": "PA", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 679201 }, {"State": "PA", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 624865 }, {"State": "PA", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 516193 }, {"State": "PA", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 1203944 }, {"State": "PA", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 1396575 }, {"State": "PA", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 1781837 }, {"State": "PA", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 3157759 }, {"State": "PA", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 3220914 }, {"State": "PA", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 3347225 }, {"State": "PA", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 3414001 }, {"State": "PA", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 3755401 }, {"State": "PA", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 4438201 }, {"State": "PA", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 1910571 }, {"State": "PA", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 1872360 }, {"State": "PA", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 1795937 } ]
const n = 4; //number of values per series
const m = 58;
const margins = {
    top: 40, right: 10, bottom: 20, left: 10
}
const width = 960 - margins.left - margins.right;
const height = 500 - margins.top - margins.bottom;

// stacks , a multi series bar chart is equal to subdividing a bar chart
// by an ordinal dimension

class StackedBars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ''
        }
    }

    componentDidMount() {
        let {svg, x, y, y01z, color } = this.createContext();

        this.createChart(svg, x, y, color);
    }

    createContext() {
        const svg = d3.select(this.refs.stackedbars).append('svg')
            .attr('width', 960)
            .attr('height', 500)

        let xz = d3.range(m);
        let yz = d3.range(n).map(function(){
                return function(m) {
                    let values = [], i, j, w, x, y, z;

                  // Initialize with uniform random values in [0.1, 0.2).
                    for (i = 0; i < m; ++i) {
                        values[i] = 0.1 + 0.1 * Math.random();
                    }

                  // Add five random bumps.
                    for (j = 0; j < 5; ++j) {
                        x = 1 / (0.1 + Math.random());
                        y = 2 * Math.random() - 0.5;
                        z = 10 / (0.1 + Math.random());
                        for (i = 0; i < m; i++) {
                          w = (i / m - y) * z;
                          values[i] += x * Math.exp(-w * w);
                        }
                    }

                   for (i = 0; i < m; ++i) {
                        values[i] = Math.max(0, values[i]);
                    }
                        console.log(values)
                    return values;
                }
            }
        );
        // stack keys set the key accessor to the specified function or array
        //
        let y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz));
        // when a histogram is generated the value accessor will be invoked
        // transpose is a matrix function which flips rows to columns
        let yMax = d3.max(yz, (y)=> d3.max(y));
        let y1Max = d3.max(y01z, (y)=> d3.max(y,(d)=>d[1]));

        const x = d3.scaleBand()
            .domain(xz)
            .rangeRound([0, width])
            .padding(0.08)

        const y = d3.scaleLinear()
            .domain([0, y1Max])
            .range([height, 0])

        // range returns an array containing an arithmetic progression
        const color = d3.scaleOrdinal().range(d3.schemeCategory10)
        //(d3.schemeCategory20c)[n]

        return {
            svg,
            x,
            y,
            y01z,
            color
        }
    }

    createChart(svg, x ,y, y01z, color) {
        console.log( x)
        console.log( y)
        console.log(y01z)
        const g = svg.append('g')
            .attr('transform', 'translate('+ margins.left + ',' +margins.top + ')')

        const series = g.selectAll('.series')

            .data(y01z)
            .enter()
            .append('g')
            .attr('fill',(d, i)=>color)

        const rect = series.selectAll('rect')
            .data((d)=>d)
            .enter()
            .append('rect')
            .attr('x', (d,i)=>x(i))
            .attr('y', height)
            .attr('width', x.bandwidth())
            .attr('height', 0)

            rect.transition()
                .delay((d, i)=> i*10 )
                .attr('y', (d)=>console.log(y, "transition rect"))
                .attr('height', (d)=>{
                    console.log(y)
                   return 1
                })

        // create axis
        g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,'+ height+ ')')
            .call(d3.axisBottom(x)
                .tickSize(0)
                .tickPadding(6)
            )

    }

    // transitionGrouped(x, y, rect) {
    //     y.domain([])
    // }

    // transitionStacked(x, y, rect) {

    // }

    handleModeChange(e) {
        console.log(e)
        if(e.target.value === 'grouped') {

        }
    }

    render() {
        return (
            <div>
                <form ref="radioform">
                    <label>Grouped</label>
                    <input type="radio"
                        name="mode"
                        value="grouped"
                        onChange={this.handleModeChange.bind(this)}
                    />

                    <label>Stacked</label>
                    <input type="radio"
                        name="mode"
                        value="stacked"
                        onChange={this.handleModeChange.bind(this)}
                        checked={true}
                    />
                </form>
                <div ref='stackedbars'>
                </div>
            </div>
        );
    }
}

export default StackedBars;
