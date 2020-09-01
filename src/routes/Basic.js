import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch } from 'react-router-dom';

import * as config from '../config';


import Library  from "../components/Basic/Library"
import Profiles  from "../components/Basic/Profiles"
import Setting  from "../components/Basic/Setting"
import SubBasic from "../components/Basic/SubBasic"

import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../redux/actions/basic";
import {replaceDataHots, replaceData2Hots} from "../redux/actions/hots";


import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import {Div, Input, Button} from '../styles/DefaultStyles';

import Loading from '../components/_/Loading'



const DivBasic = styled(Div)`
  width: 100%;
  /* height: 100%;  App의 DivContent 에서 height: calc(100vh - 50px); 로 설정해놨다 */
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    
  }
`;





const Main = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px; /* 여기서 부터 360 고정! */ 
  height: auto;
  
  
  margin-top: 50px; 
  
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
    width: 100%;
    margin-top: 60px; 
    /*height: calc(100vh - 120px);*/
    
    overflow: auto; /* important!!! */
    
  }
`




const Basic = ({
  
  match, location
  
  , authority, language
  
  , readyDictAllHeroBasic
  , readyListAllMap
  , readyListMapStandardRanked
  
  //, replaceAuthority
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  
  
   return (
   <DivBasic>
    
      <SubBasic/>
      
      <Main>
        <Switch>
          
          <Route path="/basic/library" component={Library} />
          <Route path="/basic/profiles" component={Profiles} />
          <Route path="/basic/setting" component={Setting} />
          
        </Switch>
      </Main>
  
    </DivBasic>
    )
}
  
 


function mapStateToProps(state) { 
  return { 
    
    user: state.auth.user
    , language: state.basic.language
    
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    //readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    
    //,replaceData: (which, newData) => dispatch(replaceData(which, newData))
    //,replaceLoading: (which, true_false) => dispatch(replaceLoading(which, true_false)) 
    //,replaceReady: (which, true_false) => dispatch(replaceReady(which, true_false)) 
    
    //replaceAuthority: (which, authority) => dispatch(replaceAuthority(which, authority))
    
    replaceDataHots : (which, replacement) => dispatch(replaceDataHots(which, replacement))
    ,replaceData2Hots : (which1, which2, replacement) => dispatch(replaceData2Hots(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Basic);

