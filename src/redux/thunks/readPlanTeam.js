import axios from 'axios';
import dotenv from 'dotenv';

import * as types from '../actions/ActionTypes';
import { replaceReady, replaceLoading, replaceData, addNotification, removeNotification} from '../actions/basic'
import { replacePlanTeam } from '../actions/team_generator'

import addRemoveNotification from "./addRemoveNotification";



// functions that dispatch actions which are from return fundamental action creators
const readPlanTeam = (idPlanTeam) => {   
  
  return async (dispatch, getState, axios) => { 

    const onSuccess = (newPlanTeam) => { 
      
      dispatch( replacePlanTeam(newPlanTeam) );  // 이게 먼저 돼고, 아래 loading, ready 수정해 주어야 한다!!!
      //dispatch( replaceData("idPlanTeam", newPlanTeam._id) );
      
      dispatch( replaceReady("planTeam", true) );
      dispatch( replaceLoading("planTeam", false) ); 
      
      
    } 


    const onError = (error) =>{ 
      
      dispatch( replacePlanTeam({}) );  
      //dispatch( replaceData("idPlanTeam", "") );
      
      dispatch( replaceReady("planTeam", false) );
      dispatch( replaceLoading("planTeam", false) ); 
      
      addRemoveNotification("error", "Reading planTeam has failed", 4000);
      
      //dispatch( replaceRerender("planTeam") );
    } 


    try { 
      
      dispatch( replaceReady("planTeam", false) );
      dispatch( replaceLoading("planTeam", true) ); 
      
      const response = await axios.get( `${process.env.REACT_APP_URL_AHR}/plan-team/${idPlanTeam}`);
      
      const newPlanTeam = response.data;
      
      
      onSuccess(newPlanTeam);
  
    } // try
    
    catch (error) { 
      onError(error); 
    } //catch

  } 
} // readPlanTeam
    
export default  readPlanTeam;