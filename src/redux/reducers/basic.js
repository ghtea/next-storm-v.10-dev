import {getTimeStamp} from '../../tools/vanilla/time'
import {toggleArrayElement} from '../../tools/vanilla/array'

import * as types from '../actions/ActionTypes';


const stateInitial = { 
    
    trigger : ""
    
    
    , ready : {
      
      planTeam: false
      , listPlanTeam: false
      
      
      , version: false
      , listAllHeroBasic: false
      , listAllHeroDetail: false
      
      , listAllMap: false
      , listMapStandardRanked: false
      
      ,listComp: false
      
      , focusingComp: false
      , focusingCompComment: false
      , focusingCompVideo: false
      
      , editingComp: false
      
      , listComment: false
      , listVideo: false
      
      ,user: false
      
      ,mmrUser: false
      
      , reactionToEdit: false
      
      
      
      , playerBattletag: false
      
      , playerGeneral: false
      , playerGeneralShowing: false
      
      , playerHeroes: false
      , playerHeroesShowing: false
      
      , focusingHero: false
      , heroBuildsStats: false
      
    }
    
    ,loading : {
      
      planTeam: false
      , listPlanTeam: false
      
      , listComp: false
      , focusingComp: false
      , focusingCompComment: false
      , focusingCompVideo: false
      , editingComp: false
      
      , listComment: false
      , listVideo: false
      
      , user: false
      
      , reactionToEdit: false
      
      
      , playerGeneral: false
      , playerHeroes: false
      
      , focusingHero: false
      , heroBuildsStats: false
    }
    
    
    ,working : {
      createPlan: false
      
      ,updateMmr: false
      
      ,addPlayer: false
      ,putPlayerMmr: false
      ,addPlayerToListPlayerEntry: false
      ,addPlayerMmrStandardToListPlayerEntry: false
    }
    
    ,notification : []
    
    
    ,themeName: "light"
    ,themeOption: "auto" // 처음 App mount 할때 쿠키를 이용해서 themeOption 을 설정하고 이후부터는 읽는 것은 redux store 의 themeOption 을 이용한다! 물론 변경할때는 cookie의 것도 같이 변경!
    
    ,language: "en" 
    // en English, ko Korean, ja Japanese // read from cookie
    // https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
  
    ,authority: {
      team_planner: "viewer" // "administrator" "viewer"
    }
    
    , versionDbLocal: {
      HeroBasic: {  }   
      , HeroDetail: {  }  
      
      , HeroStats: { }  
      , Map: {  }
    }
    
    , version: {
      
    }
    
  };



const basic = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    

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
        

      
      
    case types.REPLACE_READY:
      return {
      	...state, 
      	ready: {
      	  ...state.ready,
      	  [action.which]: action.true_false
      	}
      };
      
    case types.REPLACE_LOADING:
      return {
      	...state, 
      	loading: {
      	  ...state.loading,
      	  [action.which]: action.true_false
      	}
      };
      
    case types.REPLACE_WORKING:
      return {
      	...state, 
      	working: {
      	  ...state.working,
      	  [action.which]: action.true_false
      	}
      };
      
   case types.REPLACE_AUTHORITY:
    return {
    	...state, 
    	authority: {
    	  ...state.authority,
    	  [action.which]: action.authority
    	}
    };
      
    case types.ADD_NOTIFICATION:
      
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
      
      
    
    case types.DELETE_NOTIFICATION:
      return {
      	...state, 
      	notification: state.notification.filter(element => element.idNotification !== action.idNotification)
      };
    
    
      
       
      
    default:
      return state;
  }
};


export default basic;
