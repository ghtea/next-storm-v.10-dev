import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';
import dotenv from 'dotenv';
//import { sessionReducer, sessionService  } from 'redux-react-session';

import auth from './reducers/auth';
import basic from './reducers/basic';
import hots from './reducers/hots';
import team_planner from './reducers/team_planner';
import comp_gallery from './reducers/comp_gallery';
//import reducer from './reducer'

import * as types from './actions/ActionTypes';


const reducers = combineReducers({
  
  auth: auth
  ,basic: basic
  ,hots : hots
  ,team_planner : team_planner
  ,comp_gallery : comp_gallery
  
  //, session: sessionReducer // https://www.npmjs.com/package/redux-react-session
});


const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(axios), logger)
)

//sessionService.initSessionService(store);

export default store;

//https://github.com/nomadcoders/vanilla-redux/blob/ccaa1acd081f27239f2cc8ad3c571bd0a9923f73/src/store.js