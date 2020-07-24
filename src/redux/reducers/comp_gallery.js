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
      , listPosition: [[], [], [], [], []]
      
      , locationAddingMap: [0]
      , locationAddingHero: [0,0]
    }
    
};



const comp_gallery = (
  
  // 기본값 설정
  state = stateInitial, 
  
  // 액션별로 새로운 state 반환하기
  action) => {
    
  switch (action.type) {
    

      
    default:
      return state;
  }
};


export default comp_gallery;
