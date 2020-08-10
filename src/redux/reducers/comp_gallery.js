import {getTimeStamp} from '../../tools/vanilla/time'
import {toggleArrayElement} from '../../tools/vanilla/array'
import storage from '../../tools/vanilla/storage';

import * as types from '../actions/ActionTypes';


const stateInitial = { 

      
    gallery : {
      listComp: [] // searching
    
      , option: "small" // small, middle, big, list
      
      , listAllTag: ["ToWin", "ForFun", "Kill", "Push", "Combo", "Theme"] //, "Early", "Late"
      
      , filterSize: [2,3,5]
      , filterTag: ["ToWin", "ForFun", "Kill", "Push", "Combo", "Theme"] //, "Early", "Late"
      , filterMap: []
    }
    
    
    
    , create : {
      
      title: ""
      , listIdMap: []
      , listPosition: [ { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] } ]
      , listTag: ["ToWin", "Kill"]
      
      , comment: ""
      , video: ""
      
      , whichAdding: "Hero"
      
      , locationAddingMap: [0]
      , locationAddingHero: [0,0]
      
      , triggerPosition: ""
      , triggerMap: ""
      //, triggerTag: ""
      //, idMapChosen: ""
      //, idHeroChosen: ""
      
    }
    
    , videos: {
      listVideo: [] 
    }
    
    , focus: {
      
      comp: {
        listIdMap: []
        , listPosition: [ { listIdHero: [] } ]
      }
      
      , author: {}
      
      , comment: ""  // 대표 1 코맨트
      , video: ""
      , link: ""
      
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
    //REPLACE_DATA_HOTS
      
    
    case types.REPLACE_DATA_2_COMP_GALLERY:
      
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
       
      // 작성중 comp 안날라가게!
      if (action.which1 === "create") {
        storage.set("comp-creating", replacementState["create"]);
      }
      
      return replacementState;
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
