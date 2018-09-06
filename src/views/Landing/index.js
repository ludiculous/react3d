import React, { Component, PropTypes } from 'react';
import movieData from '../../assets/data/movies';
import ProgressArc from '../../components/ProgressArc';
import Chart from '../../components/Chart';
import ClusterMap from '../../components/ClusterMap';
import { connect } from 'react-redux';
import keen from '../../actions/keen';

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
                <ClusterMap />
            </div>
        );
    }
}

const mapStateToProps = state =>({
    browser: state.browser
});

export default connect(mapStateToProps, {})(Landing);