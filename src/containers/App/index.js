import React, { Component } from 'react';
import Routes from './elements/Routes';
import { connect } from 'react-redux';
import { windowResize } from '../../actions';
import debounce from 'lodash.debounce';

class App extends Component {
    constructor(props) {
        super(props)
        // window.addEventListener(
        //     'resize',
        //     debounce(() => props.windowResize(window.innerWidth, window.innerHeight), 200)
        // )

    }

    componentDidMount() {
       // this.props.windowResize(window.innerWidth, window.innerHeight);
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
            </header>
           <Routes />
          </div>
        );
    }
}

const mapStateToProps = state =>({
    browser: state.browser
});

export default connect(mapStateToProps, {windowResize})(App);
