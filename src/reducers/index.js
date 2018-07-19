import {combineReducers} from 'redux';
import browser from './modules/browser';
import nature from './modules/nature';

export default combineReducers({
    browser,
    nature
})