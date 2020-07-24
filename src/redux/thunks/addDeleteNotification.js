import * as types from '../actions/ActionTypes';
import {replaceReady, replaceLoading, replaceData, addNotification, removeNotification} from '../actions/basic'


const awaitTime = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
};

// functions that dispatch actions which are from return fundamental action creators
const addRemoveNotification =  (situation, message, time=3000, idNotification="none") => 
  async (dispatch, getState) => {   
    
    let idNotificationUsing;
    if (idNotification ==="none") {
       idNotificationUsing = Date.now().toString();
    }
    else {idNotificationUsing = idNotification}
    
    
    dispatch( addNotification(situation, message, idNotificationUsing) );  
    
    await awaitTime(time);
    
    dispatch( removeNotification(idNotificationUsing) );
        
} // addRemoveNotification
    
export default  addRemoveNotification;
