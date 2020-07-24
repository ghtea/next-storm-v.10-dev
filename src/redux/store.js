import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';
import dotenv from 'dotenv';

import basic from './reducers/basic';
import hots from './reducers/hots';
import team_generator from './reducers/team_generator';
import comp_gallery from './reducers/comp_gallery';
//import reducer from './reducer'

import * as types from './actions/ActionTypes';


const reducers = combineReducers({
    basic: basic
    ,hots : hots
    ,team_generator : team_generator
    ,comp_gallery : comp_gallery
});


const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(axios), logger)
)


export default store;

//https://github.com/nomadcoders/vanilla-redux/blob/ccaa1acd081f27239f2cc8ad3c571bd0a9923f73/src/store.js