import React, { Component } from 'react';
import ReactTransitionGroup from "react-addons-transition-group";
import Letter from './Letter';
import * as d3 from 'd3';

let transform = `translate(100, 150)`;
let width = 960;
let height = 500;

class MovingLetters extends Component {
    static letters = "abcdefghijklmnopqrstuvwxyz".split('');

    constructor(props) {
        super(props);
        this.state = {
            alphabet: []
        }
    }

    componentWillMount() {
        // every 1.5 seconds the letters get shuffled, and a random amount
        // of letters get sliced out

        d3.interval(()=> this.setState({
            alphabet: d3.shuffle(MovingLetters.letters)
            .slice(0, Math.floor(Math.random() *  MovingLetters.letters.length))
            .sort()
        }, function(){
            //console.log(this.state.alphabet)
        }), 1500)

        if(MovingLetters.letters.length < 1){
            //console.log(MovingLetters.letters.length)
            MovingLetters.letters = "abcdefghijklmnopqrstuvwxyz".split('');
        }

        console.log(this.state.alphabet.slice(0, Math.floor(Math.random() *  MovingLetters.letters.length)))
    }

    renderLetters() {
        console.log("rendering letters")
        return this.state.alphabet.map((l, i) => (
            <Letter letter={l} i={i} key={`letter-${l}`} />
        ))
    }

    render() {
        return (
            <g transform={transform}>
                <ReactTransitionGroup component="g">
                    {this.renderLetters()}
                </ReactTransitionGroup>
            </g>
        );
    }
}

export default MovingLetters;
