import * as types from '../actions/ActionTypes';
import {addNotification, deleteNotification} from '../actions/basic'
import dictCode from '../../others/dictCode';

const awaitTime = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
};

// functions that dispatch actions which are from return fundamental action creators
const addDeleteNotification =  (code_situation, language, message, time) => 
  async (dispatch, getState) => {   
    
    code_situation = code_situation || Date.now().toString();
    
    const situation_using = (dictCode[code_situation]? dictCode[code_situation]['situation'] : "tip");
    const message_using = message || dictCode[code_situation]['message'][language];
    const idNotification_using = code_situation;
    
    dispatch( addNotification(situation_using, message_using, idNotification_using) );  
    
    const time_using = time || 3000;
    await awaitTime(time_using);
    
    dispatch( deleteNotification(idNotification_using) );
        
} // addRemoveNotification
    
export default  addDeleteNotification;
