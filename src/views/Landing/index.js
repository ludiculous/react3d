import React, { Component, PropTypes } from 'react';
import movieData from '../../assets/data/movies';
import ProgressArc from '../../components/ProgressArc';
import Chart from '../../components/Chart';
import { connect } from 'react-redux';
import keen from '../../actions/keen';
/*
<ProgressArc
    id="d3-progress-arc"
    size={'300px'}
    progress={this.state.progress}
    innerRadius={100}
    outterRadius={110}
    bColor={'#e6e6e6'}
    fColor={'#00ff00'}
    duration={3000}
/>
*/
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress:.3
        }
    }

    updateProgress() {
        this.setState({progress:1},()=>{console.log(this.state)})
    }

    render() {
        return (
            <div>
                <span> Landing </span>

                <Chart
                    data={movieData}
                    width={this.props.browser.stageWidth}
                />

                <button onClick={keen.clickHandle}>Update</button>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    browser: state.browser
});

export default connect(mapStateToProps, {})(Landing);