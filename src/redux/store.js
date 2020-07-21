import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';
import dotenv from 'dotenv';

import reducer from './reducer';


const REPLACE_READY = "REPLACE_READY";
const REPLACE_LOADING = "REPLACE_LOADING";
const REPLACE_WORKING = "REPLACE_WORKING";
const REPLACE_AUTHORITY = "REPLACE_AUTHORITY";

const REPLACE_DATA = "REPLACE_DATA";
const REPLACE_DATA_2 = "REPLACE_DATA_2";

const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

const ADD_RESULT = "ADD_RESULT";
const DELETE_RESULT = "DELETE_RESULT";

const REPLACE_PLAYER_TAGS = "REPLACE_PLAYER_TAGS";
const REPLACE_PLAYER_STATUS = "REPLACE_PLAYER_STATUS";
const REPLACE_REGION = "REPLACE_REGION";
const REPLACE_NUMBER = "REPLACE_NUMBER";



// fundamental action creator
/*
export const replaceRerender = (which) => {
  return {
    type: REPLACE_RERENDER
    ,which: which
  }
}
*/

export const replaceReady = (which, true_false) => {
  return {
    type: REPLACE_READY,
    which: which,
    true_false: true_false
  }
}

export const replaceLoading = (which, true_false) => {
  return {
    type: REPLACE_LOADING,
    which: which,
    true_false: true_false
  }
}

export const replaceWorking = (which, true_false) => {
  return {
    type: REPLACE_WORKING,
    which: which,
    true_false: true_false
  }
}


export const replaceAuthority = (which, authority) => {
  return {
    type: REPLACE_AUTHORITY,
    which: which,
    authority: authority
  }
}




export const replaceData = (which, newData) => {
  return {
    type: REPLACE_DATA,
    which: which,
    data: newData
  }
}

export const replaceData2 = (which1, which2, newData) => {
  return {
    type: REPLACE_DATA_2,
    which1: which1,
    which2: which2,
    data: newData
  }
}



export const addNotification = (situation, message, idNotification) => {
  return {
    type: ADD_NOTIFICATION,
    situation: situation,
    message: message,
    idNotification: idNotification
  }
}

export const removeNotification = (idNotification) => {
  return {
    type: REMOVE_NOTIFICATION,
    idNotification: idNotification
  }
}


export const addResult = (result) => {
  return {
    type: ADD_RESULT,
    result: result
  }
}
export const deleteResult = (idResult) => {
  return {
    type: DELETE_RESULT,
    idResult: idResult
  }
}




export const replacePlayerTags = (battletag, tag, true_false) => {
  return {
    type: REPLACE_PLAYER_TAGS,
    battletag: battletag,
    tag: tag,
    true_false: true_false
  }
}

export const replacePlayerStatus = (battletag, status) => {
  return {
    type: REPLACE_PLAYER_STATUS,
    battletag: battletag,
    status: status
  }
}

export const replaceRegion = (region) => {
  return {
    type: REPLACE_REGION,
    region: region
  }
}

export const replaceNumber = (pairNumber, which, how) => {
  return {
    type: REPLACE_NUMBER
    ,which: which
    ,how: how
    ,pairNumber: pairNumber
  }
}



const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(axios), logger)
)


export default store;

//https://github.com/nomadcoders/vanilla-redux/blob/ccaa1acd081f27239f2cc8ad3c571bd0a9923f73/src/store.js