import * as types from '../actions/ActionTypes';
import {replaceReady, replaceLoading, replaceData, addNotification, removeNotification} from '../actions/basic'



// functions that dispatch actions which are from return fundamental action creators
const replaceTheme = (newThemeName) => 
  (dispatch, getState, axios) => {   
  
  dispatch( replaceData("themeName", newThemeName) );  
  
} // replaceTheme
    
export default  replaceTheme;