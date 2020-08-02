
import * as types from '../actions/ActionTypes';
import {replaceReady, replaceLoading, replaceData, addNotification, removeNotification} from '../actions/basic'


const awaitTime = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
};

// functions that dispatch actions which are from return fundamental action creators
const addRemoveNotification =  (situation, message, time=3000, idNotification) => 
  async (dispatch, getState) => {   
    
    idNotification = idNotification || Date.now().toString();
    
    dispatch( addNotification(situation, message, idNotification) );  
    
    await awaitTime(time);
    
    dispatch( removeNotification(idNotification) );
        
} // addRemoveNotification
    
export default  addRemoveNotification;
