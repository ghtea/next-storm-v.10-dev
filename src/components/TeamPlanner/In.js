import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { NavLink, useHistory } from 'react-router-dom';

import { connect } from "react-redux";
import readPlanTeam from "../../redux/thunks/readPlanTeam";

//import {replaceRerender} from "../../redux/store";
import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority} from "../../redux/actions/basic";

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';


import {Div, Input, Button} from '../../styles/DefaultStyles';
//import Player from '../components/Player'
import IconLoading from '../../svgs/basic/IconLoading'



import AddingPlayer from './In/AddingPlayer';
import Entry from './In/Entry';
import Option from './In/Option';
import Result from './In/Result';

import useAxiosGet from '../../tools/hooks/useAxiosGet';
import useInput from '../../tools/hooks/useInput';


const DivTeamPlanner = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  /*240px 240px 480px 480px;*/
  
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
  
  @media (min-width: ${props => props.theme.media.md }px ) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    
  }
`


const DivLoading = styled(Div)`
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Loading = () => {
  return (
    <DivLoading>   
      <IconLoading width={"30px"} height={"30px"} />
    </DivLoading>
  )
}


// https://ps.avantwing.com/team-Planner/sss?ooo 들어가 보기
const TeamPlanner = ({
  match, location
  , authority, language
  , loadingPlanTeam
  , readyPlanTeam
  , idPlanTeam, passwordPlanTeam
  
  //, rerenderPlanTeamA
  
  , readPlanTeam
  , replaceData
  ,replaceAuthority
  , addDeleteNotification
}) => {
  
  //const [rerender, SetRerender] = useState("");
  const history = useHistory();
  const isFirstRun = useRef(true);
  
  const idPlanTeamTrying = match.params.idPlanTeam;
  
  useEffect(()=>{
    console.log(idPlanTeamTrying);
    readPlanTeam(idPlanTeamTrying, language);
  }, []);
  
  
  // 처음 마운트 (loading X -> O) 는 무시, 뒤의 O -> X 일때 플랜 아이디 확인
  useEffect(()=>{
    if (isFirstRun.current) {isFirstRun.current = false; return; }
    
    if (!loadingPlanTeam && !readyPlanTeam)  {  // (readyPlanTeam === false)
      replaceAuthority("team_planner", "unknown");
      
      addDeleteNotification("tplan06", language);
      
      history.push(`/team-planner`);
    }
  }, [loadingPlanTeam]);
  
  
  // 처음 마운트는 무시, readyPlanTeam X -> O 일때 플랜 비번확인
  useEffect(()=>{
    
    const query = queryString.parse(location.search);
    const passwordPlanTeamTrying = query.pw;
    
    //if (isFirstRun.current) {isFirstRun.current = false; return; } // 처음 렌더링 넘어가기 (아직 스토어 업데이트 반영 잘 못해서..)
    // 참고1 https://stackoverflow.com/questions/53351517/react-hooks-skip-first-run-in-useeffect
    // 참고2 https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    
    
    if (!loadingPlanTeam && readyPlanTeam && (authority === "viewer") ) {
      
      if (!passwordPlanTeamTrying) {
        replaceAuthority("team_planner", "viewer");
        //addDeleteNotification("success", "welcome viewer!");
      }
      
      else if ( passwordPlanTeamTrying === passwordPlanTeam ) {
        replaceAuthority("team_planner", "administrator");
        addDeleteNotification("tplan13", language);
      }
      
      // 문제 정상적인 비번인데, 정보를 받는 과정에서 잠시동안 두 비번이 불일치 하는것으로 나와서 => plan 생성시에 조금 지연후에 이곳 페이지로 이동하는 등 시도 중
      // 정안되면 비번 틀린거는 알람이 아니라 일반 표시로 하기..
      // if password is wrong
      else {
        replaceAuthority("team_planner", "viewer");
        addDeleteNotification("tplan14", language);
      }
      
    }
    
  }, [loadingPlanTeam, readyPlanTeam] )
    
    
    
  useEffect(()=>{
    console.log("rerendered")
  } )
  
  
  if (loadingPlanTeam || !readyPlanTeam) {
    return (
      <DivTeamPlanner>
        
        <DivA style={{alignSelf:  "center"}} >
          < Loading />
        </DivA>
        
        <DivB style={{alignSelf:  "center"}} >
          < Loading />
        </DivB>
  
        
      </DivTeamPlanner>
    )
  } 
  
  else  { // (!loadingPlanTeam && readyPlanTeam) 
   return (
   <DivTeamPlanner>
      
      <DivA>
        <AddingPlayer />
        <Option /> 
      </DivA>
      
      <DivB>
        <Entry />
        <Result /> 
      </DivB>
  
    </DivTeamPlanner>
    )
  }

 
    
} //TeamPlanner



function mapStateToProps(state) { 
  return { 
    authority: state.basic.authority.team_planner
    , language: state.basic.language
    
    ,idPlanTeam: state.team_planner.ePlanTeam._id
    ,passwordPlanTeam: state.team_planner.ePlanTeam.password
    
    , loadingPlanTeam: state.basic.loading.planTeam
    , readyPlanTeam: state.basic.ready.planTeam
    
    //, rerenderPlanTeamA: state.rerender.planTeam.A
    
    //,loading: state.loading
    //,authority: state.authority
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam, language) => dispatch(readPlanTeam(idPlanTeam, language)) 
    //,replaceRerender: (which) => dispatch(replaceRerender(which))
    ,replaceData: (which, newData) => dispatch(replaceData(which, newData))
    ,replaceLoading: (which, true_false) => dispatch(replaceLoading(which, true_false)) 
    ,replaceReady: (which, true_false) => dispatch(replaceReady(which, true_false)) 
    ,replaceAuthority: (which, authority) => dispatch(replaceAuthority(which, authority))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamPlanner);
