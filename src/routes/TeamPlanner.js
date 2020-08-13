import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch } from 'react-router-dom';

import * as config from '../config';

import Out from "../components/TeamPlanner/Out"
import In  from "../components/TeamPlanner/In"
import SubTeamPlanner from "../components/TeamPlanner/SubTeamPlanner"

import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../redux/actions/basic";

import {replaceDataHots, replaceData2Hots} from "../redux/actions/hots";


import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import {Div, Input, Button} from '../styles/DefaultStyles';

import IconLoading from '../svgs/basic/IconLoading'



const DivTeamPlanner = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`;



const Main = styled(Div)`
  
 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 100%;
  
  margin-top: 50px; 
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
    margin-top: 60px;
    
  }
`




const TeamPlanner = ({
  
  
}) => {
  
  
   return (
   <DivTeamPlanner>
    
    <SubTeamPlanner/>
      
    <Main>
      <Switch>
        <Route path="/team-planner" exact={true} component={Out} />
        <Route path="/team-planner/:idPlanTeam"  component={In} />
      </Switch>
    </Main>
  
    </DivTeamPlanner>
    )
}
  
 
    
 //TeamPlanner



function mapStateToProps(state) { 
  return { 
    authority: state.basic.authority.comp_gallery
    , language: state.basic.language
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replaceDataHots : (which, replacement) => dispatch(replaceDataHots(which, replacement))
    ,replaceData2Hots : (which1, which2, replacement) => dispatch(replaceData2Hots(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamPlanner);

