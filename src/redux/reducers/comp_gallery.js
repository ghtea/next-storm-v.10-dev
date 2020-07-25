import {getTimeStamp} from '../../tools/vanilla/time'
import {toggleArrayElement} from '../../tools/vanilla/array'

import * as types from '../actions/ActionTypes';


const stateInitial = { 

      
    gallery : {
      listComp: [] // searching
      , fComp: {} // FOCUS a comp
    }
    
    , create : {
      
      listMap: []
      , listPosition: [ { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] }]
      , listTag: ["ToWin", "Kill"]
      
      
      , whichAdding: "Hero"
      
      , locationAddingMap: [0]
      , locationAddingHero: [0,0]
      
      , triggerPosition: ""
      , triggerMap: ""
      //, triggerTag: ""
      //, idMapChosen: ""
      //, idHeroChosen: ""
      
    }
    
};



const comp_gallery = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    
    case types.REPLACE_DATA_COMP_GALLERY:
      
      if ( (!!action.replacement) && (action.replacement.constructor === Array) ) {
        return {
      	...state, 
      	[action.which]: [...action.data]
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
    //REPLACE_DATA_HOTS
      
    
    case types.REPLACE_DATA_2_COMP_GALLERY:
      
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
    // REPLACE_DATA_2_HOTS
      
      
    case types.REPLACE_LIST_POSITION:
      return {
      	...state, 
      	create: {
      	  ...state.create
      	  , listPosition: action.replacement
      	}
      } // return
      
      
      
      
    default:
      return state;
  }
};


export default comp_gallery;
