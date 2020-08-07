import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import readPlanTeam from "../../redux/thunks/readPlanTeam";

import {replaceRerender, replaceWorking, replaceLoading, replaceReady, replaceData} from "../../redux/actions/basic";


import addDeleteNotification from "../../redux/thunks/addDeleteNotification";

import {Div, Input, Button, A} from '../../styles/DefaultStyles';
//import Player from '../components/Player'
import IconHandsHeart from '../../svgs/basic/IconHandsHeart'
import IconPenBrush from '../../svgs/basic/IconPenBrush'
import IconLink from '../../svgs/basic/IconLink';


import CreatingPlan from './Out/CreatingPlan';
import SearchingPlan from './Out/SearchingPlan';
import Guide from './Out/Guide';


import useAxiosGet from '../../tools/hooks/useAxiosGet';
import useInput from '../../tools/hooks/useInput';


const DivTeamPlanner = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  
`;

const DivA = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  height: 480px; /* 240 * 2 */
  
  @media (min-width: ${props => props.theme.media.md }px ) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    
    height: 240px; 
  
  }
  
  & > div {
    border-bottom: 2px solid ${props => props.theme.color_very_weak};
    height: 100%;
  }
`

const DivB = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  height: auto;
  
  & > div {
    width: 100%;
  }
  
  @media (min-width: ${props => props.theme.media.md }px ) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    
    & > div {
      width: 50%;
    }
  }
`




// https://ps.avantwing.com/team-Planner/sss?ooo 들어가 보기
const TeamPlannerFront = ({
  
  addDeleteNotification
  
}) => {
  

    
    return (
    
    <DivTeamPlanner>
      
      <DivA>
        <CreatingPlan /> 
      </DivA>
      
      
      
      <DivB>
        <SearchingPlan  /> 
        <Guide />
      </DivB>
    
    </DivTeamPlanner>
    )
  

    
} //TeamPlanner



function mapStateToProps(state) { 
  return { 
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamPlannerFront);
