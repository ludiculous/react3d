import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from "./reducers";
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';
import './assets/styles/index.css';

const history = createHistory();
const middleware = [thunk, routerMiddleware(history)];
const store = createStore(reducers, {}, applyMiddleware(...middleware));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Provider>
),
    document.getElementById('root'));
registerServiceWorker();
