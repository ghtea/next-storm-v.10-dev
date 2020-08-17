import {getTimeStamp} from '../../tools/vanilla/time'
import {toggleArrayElement} from '../../tools/vanilla/array'

import * as types from '../actions/ActionTypes';


const stateInitial = { 
    
    user: {}
    
  
  };



const auth = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    

    case types.REPLACE_DATA_AUTH:
      
      if ( (!!action.replacement) && (action.replacement.constructor === Array) ) {
        return {
      	...state, 
      	[action.which]: [...action.replacement]
        }
      }
      
      else if ( (!!action.replacement) && (action.replacement.constructor === Object) ) {
        return {
      	...state, 
      	[action.which]: {...action.replacement}
        }
      }
      else {
        return {
        	...state, 
        	[action.which]: action.replacement
        }
      }
      
    
    case types.REPLACE_DATA_2_AUTH:
      
      if ( (!!action.replacement) && (action.replacement.constructor === Array) ) {
        return {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: [...action.replacement]
        	}
        }
      }
      
      else if ( (!!action.replacement) && (action.replacement.constructor === Object) ) {
        return {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: {...action.replacement}
        	}
        }
      }
        
      
      else {
        return {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: action.replacement
        	}
        }
      } 
        


       
      
    default:
      return state;
  }
};


export default auth;
