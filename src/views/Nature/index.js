import NatureInner from './NatureInner';
import { connect } from 'react-redux';

import React, { Component } from 'react';
import {tickTime, tickerStarted, startParticles, stopParticles, updateMousePos, createParticles} from '../../actions';

class Nature extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    startTicker() {
        // drives animation loop
        // dispatches the tickTime action on every requestAnimationFrame
        // every time the browser is ready to render

        let ticker = () => {
            if(this.props.nature.tickerStarted) {
                console.log("nature started")
                this.maybeCreateParticles();
                this.props.tickTime();
                window.requestAnimationFrame(ticker)
            }
        }

        if(!this.props.tickerStarted) {
            console.log("Starting Ticker")
            this.props.tickerStarted();
            ticker();
        }
    }

    render() {
        return (
            <NatureInner
                nature={this.props.nature}
                startTicker={this.startTicker.bind(this)}
                startParticles={this.props.startParticles.bind(this)}
                stopParticles={this.props.stopParticles.bind(this)}
                updateMousePos={this.props.updateMousePos.bind(this)}
                tickTime={this.props.tickTime.bind(this)}
                tickerStarted ={this.props.tickerStarted.bind(this)}
                createParticles={this.props.createParticles.bind(this)}
            />
        );
    }
}

const mapStateToProps = state => ({
    nature: state.nature
});

export default connect(mapStateToProps, {tickTime, tickerStarted, startParticles, stopParticles, updateMousePos, createParticles})(Nature);
