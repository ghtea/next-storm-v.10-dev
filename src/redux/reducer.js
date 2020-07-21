import {getTimeStamp} from '../tools/vanilla/time'
import {toggleArrayElement} from '../tools/vanilla/array'


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


const stateInitial = { 
    
    ready : {
      planTeam: false
      ,objAllHeroBasic: false
    }
    
    ,loading : {
      planTeam: false
    }
    
    
    ,working : {
      createPlan: false
      
      ,addPlayer: false
      ,putPlayerMmr: false
      ,addPlayerToListPlayerEntry: false
      ,addPlayerMmrStandardToListPlayerEntry: false
    }
    
    ,notification : []
    
    
    ,themeName: "light"
    
  
    
    
    
    
    
   
    ,authority: {
      team_generator: "viewer" // "administrator" "viewer"
      , comp_gallery: "viewer" // "master" "viewer"
    }
    
    
    // team-generator
    ,idPlanTeam: ""
    ,planTeam: {
      _id:"_id"
      ,password:"password"
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
    
    
    // comp-gallery
    ,comp_gallery: {
      
      listComp : []  // searching
      , vComp: {} // VIEW a comp
      
      , aComp: {} // ADD a comp
    }
    
    // common
    , hots: {
      objAllHeroBasic: {}
    }
    
  };



const reducer = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    
    /*
    case REPLACE_RERENDER:
      return {
      	...state, 
      	rerender: {
      	  ...state.rerender
      	  ,[action.which]: getTimeStamp()
      	}
      };
      */
      
    case REPLACE_DATA:
      
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
      
    
    case REPLACE_DATA_2:
      
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
        

      
      
    case REPLACE_READY:
      return {
      	...state, 
      	ready: {
      	  ...state.ready,
      	  [action.which]: action.true_false
      	}
      };
      
    case REPLACE_LOADING:
      return {
      	...state, 
      	loading: {
      	  ...state.loading,
      	  [action.which]: action.true_false
      	}
      };
      
    case REPLACE_WORKING:
      return {
      	...state, 
      	working: {
      	  ...state.working,
      	  [action.which]: action.true_false
      	}
      };
      
   case REPLACE_AUTHORITY:
    return {
    	...state, 
    	authority: {
    	  ...state.authority,
    	  [action.which]: action.authority
    	}
    };
      
    case ADD_NOTIFICATION:
      
      const listIdNotification = state.notification.map(element => element.idNotification); // list of idNotification
      if ( !(listIdNotification.includes(action.idNotification)) ) {  // 기존에 동일한 아이디의 알림이 없어야 추가
        return {
      	...state, 
      	
      	notification: [
      	  {
      	    situation: action.situation
      	    ,message: action.message
      	    ,idNotification: action.idNotification
      	  }
      	  , ...state.notification
      	]
      	
        };
      }
      else {return state}
      
      
    
    case REMOVE_NOTIFICATION:
      return {
      	...state, 
      	notification: state.notification.filter(element => element.idNotification !== action.idNotification)
      };
    
    
    case ADD_RESULT:
      
      // 같은 id의 result 가 이미 존재하면 그거 먼저 빼놓기
      
      const listResultAlreday = state.planTeam.listResult.filter(element => element._id === action.result._id);
      const listResultOthers = state.planTeam.listResult.filter(element => element._id !== action.result._id);
      
    
      const listResultAll = [action.result, ...listResultOthers];
      
      const listResultLocal = listResultAll.filter(element => element._id === "local");
      const listResultNotLocal = listResultAll.filter(element => element._id !== "local");
      
      const listResultAllSorted = [...listResultLocal, ...listResultNotLocal];
      
      return {
      	...state, 
      	planTeam: {
      	  ...state.planTeam
      	  , listResult: [...listResultAllSorted]
      	}
      } // return
      
      
    case DELETE_RESULT:
      
      const listResultFiltered = state.planTeam.listResult.filter(element => element._id !== action.idResult);
      
      return {
      	...state, 
      	planTeam: {
      	  ...state.planTeam
      	  , listResult: [...listResultFiltered]
      	}
      } // return
      
      
    case REPLACE_REGION:
      return {
      	...state, 
      	
      	planTeam: {
      	  ...state.planTeam
      	  , option: {
      	    ...state.planTeam.option
      	    , region: action.region
      	  }
      	}
      	
      };
      
    case REPLACE_NUMBER:
      
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
          planTeam: {
            ...state.planTeam
        	  , option: {
        	    ...state.planTeam.option
        	    , [whichNumber]: 0
        	  }
          }
        }
      }
      else if  (action.how === "plus") {
        return {
          ...state,
          planTeam: {
            ...state.planTeam
        	  , option: {
        	    ...state.planTeam.option
        	    , [whichNumber]: ( (state.planTeam.option)[whichNumber] + 1)
        	  }
          }
        }
      }
      else if  (action.how === "minus" && !(valueCurrent == 0)) {
        return {
          ...state,
          planTeam: {
            ...state.planTeam
        	  , option: {
        	    ...state.planTeam.option
        	    , [whichNumber]: ( (state.planTeam.option)[whichNumber] - 1)
        	  }
          }
        }
      }
      else if  (action.how === "minus" && (valueCurrent == 0)) {
        return {
          ...state,
          planTeam: {
            ...state.planTeam
        	  , option: {
        	    ...state.planTeam.option
        	    , [whichNumber]: 0
        	  }
          }
        }
      }
       
      
    case REPLACE_PLAYER_TAGS:
      
      const index1 = (state.planTeam.listPlayerEntry).findIndex( objPlayer => objPlayer._id === action.battletag);
      
      
      return {
        ...state, 
      	
      	planTeam: {
      	  ...state.planTeam
      	  
      	  , listPlayerEntry: state.planTeam.listPlayerEntry.map(
      	      objPlayer => (objPlayer._id === action.battletag)? 
      	        {...objPlayer, tags:toggleArrayElement(state.planTeam.listPlayerEntry[index1]["tags"], action.tag, action.true_false) }
      	        : objPlayer
      	    )
      	}
      }
    
    case REPLACE_PLAYER_STATUS:
      

      return {
        ...state, 
      	
      	planTeam: {
      	  ...state.planTeam
      	  
      	  , listPlayerEntry: state.planTeam.listPlayerEntry.map(
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


export default reducer;
