import React, { Component } from 'react';
//import CircleWave from '../../components/CircleWave'
//import ForceSim from '../../components/ForceSim';
//import ScatterPlot from '../../components/ScatterPlot';
//import ForceCluster from '../../components/ForceCluster';
//import AnimatePath from '../../components/AnimatePath';
//import LineChart from '../../components/LineChart';
//import MouseTracking from '../../components/MouseTracking';
// import ConnectedParticles from '../../components/ConnectedParticles';
// import StackedBars from '../../components/StackedBars';
import TextTransition from '../../components/TextTransition';

class Demo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <svg width="100" height="100">
                <path d=" M 10 25
                          V 100
                          H 50
                          V 25
                          H 10
                        "
                        stroke="red"
                        stroke-width="2"
                        fill="none"
                        />

            </svg>
        );
    }
}

export default Demo;
