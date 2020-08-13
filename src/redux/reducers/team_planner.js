import {getTimeStamp} from '../../tools/vanilla/time'
import {toggleArrayElement} from '../../tools/vanilla/array'

import * as types from '../actions/ActionTypes';


const stateInitial = { 
  
    listPlan: []
    
    , ePlanTeam: {  // editing
      _id:"_id"
      ,password:"password"
      
      , listAuthor: []
      
      ,title:"title"
      ,listResult:[]
      ,listPlayerEntry: [
        {
          _id: "test"
          , tags: []
        }
      ]
      , option: {}
    }
 
    
  };



const team_planner = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    
    case types.REPLACE_DATA_TEAM_PLANNER:
      
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
      
    
    case types.REPLACE_DATA_2_TEAM_PLANNER:
      
      let replacementState = {};
      if ( (!!action.replacement) && (action.replacement.constructor === Array) ) {
        
        replacementState = {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: [...action.replacement]
        	}
        }
      }
      
      else if ( (!!action.replacement) && (action.replacement.constructor === Object) ) {
        replacementState = {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: {...action.replacement}
        	}
        }
      }
      
      else {
        replacementState = {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: action.replacement
        	}
        }
      }
       
      return replacementState;
      
      
      
      

    case types.REPLACE_PLAN_TEAM:
      return {
      	...state, 
      	ePlanTeam: {...action.newPlanTeam}
        }

    
      
    case types.ADD_RESULT:
      
      // 같은 id의 result 가 이미 존재하면 그거 먼저 빼놓기
      
      const listResultAlreday = state.ePlanTeam.listResult.filter(element => element._id === action.result._id);
      const listResultOthers = state.ePlanTeam.listResult.filter(element => element._id !== action.result._id);
      
    
      const listResultAll = [action.result, ...listResultOthers];
      
      const listResultLocal = listResultAll.filter(element => element._id === "local");
      const listResultNotLocal = listResultAll.filter(element => element._id !== "local");
      
      const listResultAllSorted = [...listResultLocal, ...listResultNotLocal];
      
      return {
      	...state, 
      	ePlanTeam: {
      	  ...state.ePlanTeam
      	  , listResult: [...listResultAllSorted]
      	}
      } // return
      
      
    case types.DELETE_RESULT:
      
      const listResultFiltered = state.ePlanTeam.listResult.filter(element => element._id !== action.idResult);
      
      return {
      	...state, 
      	ePlanTeam: {
      	  ...state.ePlanTeam
      	  , listResult: [...listResultFiltered]
      	}
      } // return
      
      
      
      
    case types.REPLACE_REGION:
      return {
      	...state, 
      	
      	ePlanTeam: {
      	  ...state.ePlanTeam
      	  , option: {
      	    ...state.ePlanTeam.option
      	    , region: action.region
      	  }
      	}
      	
      };
      
    case types.REPLACE_NUMBER:
      
      let whichNumber;
      let valueCurrent;
      
      if (action.which === "team") {
        whichNumber = "numberTeams"
        valueCurrent = action.pairNumber[0];
      }
      else if (action.which === "group") {
        whichNumber = "numberGroups"
        valueCurrent = action.pairNumber[1];
      }
      
      
        
      if (action.how === "center") {
        return {
          ...state,
          ePlanTeam: {
            ...state.ePlanTeam
        	  , option: {
        	    ...state.ePlanTeam.option
        	    , [whichNumber]: 0
        	  }
          }
        }
      }
      else if  (action.how === "plus") {
        return {
          ...state,
          ePlanTeam: {
            ...state.ePlanTeam
        	  , option: {
        	    ...state.ePlanTeam.option
        	    , [whichNumber]: ( (state.ePlanTeam.option)[whichNumber] + 1)
        	  }
          }
        }
      }
      else if  (action.how === "minus" && !(valueCurrent == 0)) {
        return {
          ...state,
          ePlanTeam: {
            ...state.ePlanTeam
        	  , option: {
        	    ...state.ePlanTeam.option
        	    , [whichNumber]: ( (state.ePlanTeam.option)[whichNumber] - 1)
        	  }
          }
        }
      }
      else if  (action.how === "minus" && (valueCurrent == 0)) {
        return {
          ...state,
          ePlanTeam: {
            ...state.ePlanTeam
        	  , option: {
        	    ...state.ePlanTeam.option
        	    , [whichNumber]: 0
        	  }
          }
        }
      }
       
      
      
      
    case types.REPLACE_PLAYER_TAGS:
      
      const index1 = (state.ePlanTeam.listPlayerEntry).findIndex( objPlayer => objPlayer._id === action.battletag);
      
      return {
        ...state, 
      	
      	ePlanTeam: {
      	  ...state.ePlanTeam
      	  
      	  , listPlayerEntry: state.ePlanTeam.listPlayerEntry.map(
      	      objPlayer => (objPlayer._id === action.battletag)? 
      	        {...objPlayer, tags:toggleArrayElement(state.ePlanTeam.listPlayerEntry[index1]["tags"], action.tag, action.true_false) }
      	        : objPlayer
      	    )
      	}
      }
    
    case types.REPLACE_PLAYER_STATUS:
      

      return {
        ...state, 
      	
      	ePlanTeam: {
      	  ...state.ePlanTeam
      	  
      	  , listPlayerEntry: state.ePlanTeam.listPlayerEntry.map(
      	      objPlayer => (objPlayer._id === action.battletag)? 
      	        {...objPlayer, status:action.status }
      	        : objPlayer
      	    )
      	}
      }
      
    default:
      return state;
  }
};


export default team_planner;


/*
    case types.REPLACE_DATA:
      
      if ( (!!action.data) && (action.data.constructor === Array) ) {
        return {
      	...state, 
      	[action.which]: [...action.data]
        }
      }
      
      else if ( (!!action.data) && (action.data.constructor === Object) ) {
        return {
      	...state, 
      	[action.which]: {...action.data}
        }
      }
      else {
        return {
        	...state, 
        	[action.which]: action.data
        }
      }
      
    
    case types.REPLACE_DATA_2:
      
      if ( (!!action.data) && (action.data.constructor === Array) ) {
        return {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: [...action.data]
        	}
        }
      }
      
      else if ( (!!action.data) && (action.data.constructor === Object) ) {
        return {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: {...action.data}
        	}
        }
      }
        
      
      else {
        return {
        	...state, 
        	[action.which1]: {
        	  ...state[action.which1]
        	  ,[action.which2]: action.data
        	}
        }
      } 
        
        
    */