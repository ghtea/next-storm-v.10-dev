import axios from 'axios';
import dotenv from 'dotenv';
import * as config from '../../config';

import * as types from '../actions/ActionTypes';
import { replaceReady, replaceLoading, replaceData, addNotification, removeNotification} from '../actions/basic'
import { replacePlanTeam } from '../actions/team_planner'

import addDeleteNotification from "./addDeleteNotification";



// functions that dispatch actions which are from return fundamental action creators
const readPlanTeam = (idPlanTeam, language) => {   
  
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
      
      
      addDeleteNotification("tplan15", language);
      
      //dispatch( replaceRerender("planTeam") );
    } 


    try { 
      
      dispatch( replaceReady("planTeam", false) );
      dispatch( replaceLoading("planTeam", true) ); 
      
      
      
      const response = await axios.get( `${config.URL_API_NS}/plan-team/${idPlanTeam}`);
      
      const newPlanTeam = response.data;
      
      
      // leave record of when is the latest access
      await axios.put (`${config.URL_API_NS}/plan-team/`,
        {
          filter: {_id: idPlanTeam}
          , update : {
            $set: { "accessed": Date.now() }
          }
        }
      );
      
      onSuccess(newPlanTeam);
  
    } // try
    
    catch (error) { 
      onError(error); 
    } //catch

  } 
} // readPlanTeam
    
export default  readPlanTeam;