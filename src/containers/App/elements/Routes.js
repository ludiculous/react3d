import { Route, Switch, Redirect, location} from 'react-router-dom';
import React, { Component } from 'react';
import Landing from '../../../views/Landing';
import Nature from '../../../views/Nature';
import FallingCircles from '../../../views/FallingCircles';
import MovingLetters from '../../../views/MovingLetters';
import Three from '../../../views/Three';
import Demo from '../../../views/Demo';

class Routes extends Component {
    constructor(props) {
        super(props);
    }

   render() {
        return (
             <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/nature" component={Nature} />
                <Route exact path="/circles" component={FallingCircles} />
                <Route exact path="/letters" component={MovingLetters} />
                <Route exact path="/demo" component={Demo} />
                <Route exact path="/three" component={Three} />
            </Switch>
        )
    }
}

export default Routes;
