import React, { Component } from 'react';
import * as d3 from 'd3';

// number of series
const data = [{"State": "CA", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 2704659 }, {"State": "CA", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 2677612 }, {"State": "CA", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 2623519 }, {"State": "CA", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 4499890 }, {"State": "CA", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 5489866 }, {"State": "CA", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 7469817 }, {"State": "CA", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 2159981 }, {"State": "CA", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 2635177 }, {"State": "CA", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 3585568 }, {"State": "CA", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 3853788 }, {"State": "CA", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 4624546 }, {"State": "CA", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 6166061 }, {"State": "CA", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 10604510 }, {"State": "CA", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 12513322 }, {"State": "CA", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 16330945 }, {"State": "CA", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 8819342 }, {"State": "CA", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 7937408 }, {"State": "CA", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 6173539 }, {"State": "CA", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 4114496 }, {"State": "CA", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 4443656 }, {"State": "CA", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 5101975 }, {"State": "TX", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 2027307 }, {"State": "TX", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 2290857 }, {"State": "TX", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 2817957 }, {"State": "TX", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 3277946 }, {"State": "TX", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 2884592 }, {"State": "TX", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 2097885 }, {"State": "TX", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 1420518 }, {"State": "TX", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 1434723 }, {"State": "TX", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 1463134 }, {"State": "TX", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 2454721 }, {"State": "TX", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 2111060 }, {"State": "TX", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 1423738 }, {"State": "TX", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 7017731 }, {"State": "TX", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 6666844 }, {"State": "TX", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 5965071 }, {"State": "TX", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 5656528 }, {"State": "TX", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 7070660 }, {"State": "TX", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 9898924 }, {"State": "TX", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 2472223 }, {"State": "TX", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 2472223 }, {"State": "TX", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 2472223 }, {"State": "NY", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 1208495 }, {"State": "NY", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 1087646 }, {"State": "NY", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 845947 }, {"State": "NY", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 2141490 }, {"State": "NY", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 2655448 }, {"State": "NY", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 3683363 }, {"State": "NY", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 1058031 }, {"State": "NY", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 1227316 }, {"State": "NY", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 1565886 }, {"State": "NY", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 1999120 }, {"State": "NY", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 2159050 }, {"State": "NY", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 2478909 }, {"State": "NY", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 5355235 }, {"State": "NY", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 5622997 }, {"State": "NY", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 6158520 }, {"State": "NY", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 5120254 }, {"State": "NY", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 6349115 }, {"State": "NY", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 8806837 }, {"State": "NY", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 2607672 }, {"State": "NY", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 2946669 }, {"State": "NY", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 3624664 }, {"State": "FL", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 1140516 }, {"State": "FL", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 1231757 }, {"State": "FL", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 1414240 }, {"State": "FL", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 1938695 }, {"State": "FL", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 2287660 }, {"State": "FL", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 2985590 }, {"State": "FL", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 925060 }, {"State": "FL", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 1063819 }, {"State": "FL", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 1341337 }, {"State": "FL", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 1607297 }, {"State": "FL", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 1446567 }, {"State": "FL", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 1125108 }, {"State": "FL", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 4782119 }, {"State": "FL", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 5977649 }, {"State": "FL", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 8368708 }, {"State": "FL", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 4746856 }, {"State": "FL", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 4556982 }, {"State": "FL", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 4177233 }, {"State": "FL", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 3187797 }, {"State": "FL", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 3857234 }, {"State": "FL", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 5196109 }, {"State": "IL", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 894368 }, {"State": "IL", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 912255 }, {"State": "IL", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 948030 }, {"State": "IL", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 1558919 }, {"State": "IL", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 1808346 }, {"State": "IL", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 2307200 }, {"State": "IL", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 725973 }, {"State": "IL", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 813090 }, {"State": "IL", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 987323 }, {"State": "IL", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 1311479 }, {"State": "IL", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 1613119 }, {"State": "IL", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 2216400 }, {"State": "IL", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 3596343 }, {"State": "IL", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 4351575 }, {"State": "IL", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 5862039 }, {"State": "IL", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 3239173 }, {"State": "IL", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 2623730 }, {"State": "IL", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 1392844 }, {"State": "IL", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 1575308 }, {"State": "IL", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 1811604 }, {"State": "IL", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 2284197 }, {"State": "PA", "AgeGroup": "Under 5 Years", "Year": 1990, "Value": 737462 }, {"State": "PA", "AgeGroup": "Under 5 Years", "Year": 2000, "Value": 781710 }, {"State": "PA", "AgeGroup": "Under 5 Years", "Year": 2010, "Value": 870205 }, {"State": "PA", "AgeGroup": "5 to 13 Years", "Year": 1990, "Value": 1345341 }, {"State": "PA", "AgeGroup": "5 to 13 Years", "Year": 2000, "Value": 1641316 }, {"State": "PA", "AgeGroup": "5 to 13 Years", "Year": 2010, "Value": 2233266 }, {"State": "PA", "AgeGroup": "14 to 17 Years", "Year": 1990, "Value": 679201 }, {"State": "PA", "AgeGroup": "14 to 17 Years", "Year": 2000, "Value": 624865 }, {"State": "PA", "AgeGroup": "14 to 17 Years", "Year": 2010, "Value": 516193 }, {"State": "PA", "AgeGroup": "18 to 24 Years", "Year": 1990, "Value": 1203944 }, {"State": "PA", "AgeGroup": "18 to 24 Years", "Year": 2000, "Value": 1396575 }, {"State": "PA", "AgeGroup": "18 to 24 Years", "Year": 2010, "Value": 1781837 }, {"State": "PA", "AgeGroup": "25 to 44 Years", "Year": 1990, "Value": 3157759 }, {"State": "PA", "AgeGroup": "25 to 44 Years", "Year": 2000, "Value": 3220914 }, {"State": "PA", "AgeGroup": "25 to 44 Years", "Year": 2010, "Value": 3347225 }, {"State": "PA", "AgeGroup": "45 to 64 Years", "Year": 1990, "Value": 3414001 }, {"State": "PA", "AgeGroup": "45 to 64 Years", "Year": 2000, "Value": 3755401 }, {"State": "PA", "AgeGroup": "45 to 64 Years", "Year": 2010, "Value": 4438201 }, {"State": "PA", "AgeGroup": "65 Years and Over", "Year": 1990, "Value": 1910571 }, {"State": "PA", "AgeGroup": "65 Years and Over", "Year": 2000, "Value": 1872360 }, {"State": "PA", "AgeGroup": "65 Years and Over", "Year": 2010, "Value": 1795937 }]
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
        let {svg, x0 ,x1, y0, y1, z, keys } = this.createContext();

        this.createChart(svg, x0, x1, y0, y1, z, keys);
    }

    createContext() {
        const svg = d3.select(this.refs.stackedbars).append('svg')
            .attr('width', 960)
            .attr('height', 500)

        // scaleBand creates a new band scale with an empty domain
        // unit range[0,1]
        // data.forEach((d)=>{
        //     d.Value = +d.Value;
        // })

        console.log(data)
        const x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        x0.domain(data.map((d)=>d.State));

        const x1 = d3.scaleBand()
            .padding(0.05);
        x1.domain(data.map((d)=>d.Year))
            .rangeRound([0, x0.bandwidth()])
            .padding(0.2);


        const y0 = d3.scaleLinear()
            .rangeRound([height, 0]);

        const y1 = d3.scaleBand();

        const z =  d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
            z.domain(data.map((d)=>d.AgeGroup))

        const keys = z.domain()


        return {
            svg, x0 ,x1, y0, y1, z, keys
        }
    }

    createChart(svg, x0 ,x1, y0, y1, z, keys) {
        const stack = d3.stack()
            .offset(d3.stackOffsetExpand);

        const g = svg.append('g')
            .attr('transform', 'translate('+ margins.left + ',' +margins.top + ')')

        let groupData = d3.nest()
            .key((d)=>d.Year + d.State)
            .rollup((d,i)=>{
                let d2 = {
                    Year: d[0].Year,
                    State: d[0].State
                }
                d.forEach((d)=>{
                    d2[d.AgeGroup] = d.Value
                })
                return d2
            })
            .entries(data)
            .map((d)=>d.value);

        console.log(groupData)
        const stackData = stack.keys(keys)(groupData)
        //
        console.log(keys)
        console.log(stackData)
        const series = g.selectAll('.series')
            .data(stackData)
            .enter()
            .append('g')
            .attr('class', 'series')
            .attr('fill',(d, i)=>z(d.key))

        console.log(y0)

        const rect = series.selectAll('rect')
            .data(function(d) {
             console.log(d)
             return d;

            })
            .enter()
            .append('rect')
            .attr('class', 'series-rect')
            .attr("transform", (d)=>"translate(" + x0(d.data.State) + ",0)" )
            .attr('x', (d)=>x1(d.data.Year))
            .attr("y", (d)=> y0(d[1]))
            .attr('width', x1.bandwidth())
            .attr('height', (d)=>y0(d[0]) - y0(d[1]) )

            // rect.transition()
            //     .delay((d, i)=> i*10 )
            //     .attr('y', (d)=>console.log(y, "transition rect"))
            //     .attr('height', (d)=>{
            //         console.log(y)
            //        return 1
            //     })

        // create axis
        g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,'+ height+ ')')
            .call(d3.axisBottom(x0)
                .tickSize(0)
                .tickPadding(6)
            )

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y0).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y0(y0.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Population");
    }

    render() {
        return (
            <div ref='stackedbars'>
            </div>
        );
    }
}

export default StackedBars;
