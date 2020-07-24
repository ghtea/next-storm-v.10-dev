import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { NavLink, useHistory } from 'react-router-dom';

import { connect } from "react-redux";
import readPlanTeam from "../redux/thunks/readPlanTeam";

//import {replaceRerender} from "../redux/store";
import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority} from "../redux/actions/basic";

import addRemoveNotification from "../redux/thunks/addRemoveNotification";


import {Div, Input, Button} from '../styles/DefaultStyles';
//import Player from '../components/Player'
import IconLoading from '../svgs/basic/IconLoading'



import CreatingPlan from '../components/TeamGenerator/CreatingPlan';
import SearchingPlan from '../components/TeamGenerator/SearchingPlan';

import AddingPlayer from '../components/TeamGenerator/AddingPlayer';
import Entry from '../components/TeamGenerator/Entry';
import Option from '../components/TeamGenerator/Option';
import Result from '../components/TeamGenerator/Result';

import useAxiosGet from '../tools/hooks/useAxiosGet';
import useInput from '../tools/hooks/useInput';


const DivTeamGenerator = styled(Div)`
  width: 100%;
  height: 100%;
  
  display: grid;
  align-items: start;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    grid-template-columns: 1fr;
    grid-template-rows: 240px 240px 480px 480px;
    grid-template-areas: 
      "A"
      "B"
      "C"
      "D"
  }
 

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 240px 1fr;
    grid-template-areas: 
      "A B"
      "C D";
  }

`;


const DivA = styled(Div)`
  grid-area: A;
  
  align-self: center;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    height: 240px;
  }
  
`
const DivB = styled(Div)`
  grid-area: B;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    height: 240px;
  }
`
const DivC = styled(Div)`
  grid-area: C;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    height: 480px;
  }
`
const DivD = styled(Div)`
  grid-area: D;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    height: 480px;
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


// https://ps.avantwing.com/team-generator/sss?ooo 들어가 보기
const TeamGenerator = ({
  match, location
  , authority
  , loadingPlanTeam
  , readyPlanTeam
  , idPlanTeam, passwordPlanTeam
  
  //, rerenderPlanTeamA
  
  , readPlanTeam
  , replaceData
  ,replaceAuthority
  , addRemoveNotification
}) => {
  
  //const [rerender, SetRerender] = useState("");
  const history = useHistory();
  const isFirstRun = useRef(true);
  
  const idPlanTeamTrying = match.params.idPlanTeam;
  
  useEffect(()=>{
    readPlanTeam(idPlanTeamTrying);
  }, []);
  
  
  // 처음 마운트 (loading X -> O) 는 무시, 뒤의 O -> X 일때 플랜 아이디 확인
  useEffect(()=>{
    if (isFirstRun.current) {isFirstRun.current = false; return; }
    
    if (!loadingPlanTeam && !readyPlanTeam)  {  // (readyPlanTeam === false)
      replaceAuthority("team_generator", "unknown");
      addRemoveNotification("error", "plan id is wrong");
      
      history.push(`/team-generator`);
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
        replaceAuthority("team_generator", "viewer");
        addRemoveNotification("success", "welcome viewer!");
      }
      
      else if ( passwordPlanTeamTrying === passwordPlanTeam ) {
        replaceAuthority("team_generator", "administrator");
        addRemoveNotification("success", "welcome administrator!");
      }
      
      // 문제 정상적인 비번인데, 정보를 받는 과정에서 잠시동안 두 비번이 불일치 하는것으로 나와서 => plan 생성시에 조금 지연후에 이곳 페이지로 이동하는 등 시도 중
      // 정안되면 비번 틀린거는 알람이 아니라 일반 표시로 하기..
      // if password is wrong
      else {
        replaceAuthority("team_generator", "viewer");
        addRemoveNotification("error", "password is wrong");
      }
      
    }
    
  }, [loadingPlanTeam, readyPlanTeam] )
    
    
    
  useEffect(()=>{
    console.log("rerendered")
  } )
  
  
  if (loadingPlanTeam || !readyPlanTeam) {
    return (
      <DivTeamGenerator>
        
        <DivA style={{alignSelf:  "center"}} >
          < Loading />
        </DivA>
        
        <DivB style={{alignSelf:  "center"}} >
          < Loading />
        </DivB>
      
      
        <DivC style={{alignSelf:  "center"}} >
          < Loading />
        </DivC>
      
      
        <DivD style={{alignSelf:  "center"}} >
          < Loading />
        </DivD>
        
      </DivTeamGenerator>
    )
  } 
  
  else  { // (!loadingPlanTeam && readyPlanTeam) 
   return (
   <DivTeamGenerator>
      
      <DivA>
        <AddingPlayer />
      </DivA>
      
      <DivB>
        <Option /> 
      </DivB>
    
    
      <DivC>
        <Entry />
      </DivC>
    
    
      <DivD>
        <Result /> 
      </DivD>
    
    </DivTeamGenerator>
    )
  }

 
    
} //TeamGenerator



function mapStateToProps(state) { 
  return { 
    authority: state.basic.authority.team_generator
    
    ,idPlanTeam: state.team_generator.ePlanTeam._id
    ,passwordPlanTeam: state.team_generator.ePlanTeam.password
    
    , loadingPlanTeam: state.basic.loading.planTeam
    , readyPlanTeam: state.basic.ready.planTeam
    
    //, rerenderPlanTeamA: state.rerender.planTeam.A
    
    //,loading: state.loading
    //,authority: state.authority
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    //,replaceRerender: (which) => dispatch(replaceRerender(which))
    ,replaceData: (which, newData) => dispatch(replaceData(which, newData))
    ,replaceLoading: (which, true_false) => dispatch(replaceLoading(which, true_false)) 
    ,replaceReady: (which, true_false) => dispatch(replaceReady(which, true_false)) 
    ,replaceAuthority: (which, authority) => dispatch(replaceAuthority(which, authority))
    
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TeamGenerator);
