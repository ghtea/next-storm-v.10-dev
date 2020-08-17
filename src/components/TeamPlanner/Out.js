import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';
import readPlanTeam from "../../redux/thunks/readPlanTeam";

import { useHistory } from 'react-router-dom';


import { replaceData2, replaceData } from "../../redux/actions/basic";
import { replacePlanTeam } from "../../redux/actions/team_planner";
import { replaceDataTeamPlanner, replaceData2TeamPlanner } from "../../redux/actions/team_planner";


import addDeleteNotification from "../../redux/thunks/addDeleteNotification";

import {Div, Input, Button, A} from '../../styles/DefaultStyles';
import Loading from '../_/Loading';
import NeedLogIn from '../_/NeedLogIn';
//import Player from '../components/Player'


import CreatingPlan from './Out/CreatingPlan';
import ListPlan from './Out/ListPlan';
//import Guide from './Out/Guide';


import useAxiosGet from '../../tools/hooks/useAxiosGet';
import useInput from '../../tools/hooks/useInput';



const DivTeamPlanner = styled(Div)`
  
  width: 360px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div:nth-child(1) {
    border-bottom: 2px solid ${props => props.theme.color_very_weak};
  }
  
  
`;

const Guide = styled(Div)`

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`


// https://ps.avantwing.com/team-Planner/sss?ooo 들어가 보기
const Out = ({
  
  user
  , readyUser
  
  , language
  
  , readyListPlanTeam
  , loadingListPlanTeam
  
  , replaceDataTeamPlanner
  , replaceData2TeamPlanner
  
  , replaceData2
  , replacePlanTeam
  , addDeleteNotification
  
}) => {
  
  const history = useHistory();
  
  useEffect(()=>{
    
    if (readyUser && !readyListPlanTeam) { 
      
     (async() => {
      
      try {
        
        const queryRequest = queryString.stringify({
          author: user._id
        });
          
        replaceData2("ready", "listPlanTeam", false);
        replaceData2("loading", "listPlanTeam", true);
        

        const {
          data
        } = await axios.get(`${config.URL_API_NS}/plan-team/?` + queryRequest);
        
        console.log(data)
        
        replaceDataTeamPlanner("listPlanTeam", data);
        replaceData2("loading", "listPlanTeam", false);
        replaceData2("ready", "listPlanTeam", true);
        
  
      } catch (error) {

        //addDeleteNotification("basic01", language);
        console.log(error)
      }
    
    })()
    
    } //if
  },[readyUser, readyListPlanTeam])
    
    return (
    
    <DivTeamPlanner>
      
      <CreatingPlan /> 
      
      
      { (!readyUser) && <NeedLogIn 
        destination={"/team-planner/"}
        dictMessage={{
          ko: '로그인/회원가입을 하시면, 만든 것들을 여기서 확인 가능합니다'
          , ja: 'ログイン/会員登録をしたら、作ったものをここで確認できます'
          , en: 'If you log-in/sign-up as a member, you can check what you made here.'
        }}
      />}
        
	      
      { (readyUser && loadingListPlanTeam ) && <Loading />}
      { (readyUser && !loadingListPlanTeam && readyListPlanTeam ) && <ListPlan />}
      
    </DivTeamPlanner>
    )
  

    
} //TeamPlanner



function mapStateToProps(state) { 
  return {
    
    user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , language: state.basic.language
    
    , readyListPlanTeam: state.basic.ready.listPlanTeam
    , loadingListPlanTeam: state.basic.loading.listPlanTeam
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replacePlanTeam: (newPlanTeam) => dispatch( replacePlanTeam(newPlanTeam) ) 
    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    
    , replaceDataTeamPlanner: (which, replacement) => dispatch(replaceDataTeamPlanner(which, replacement))
    , replaceData2TeamPlanner: (which1, which2, replacement) => dispatch(replaceData2TeamPlanner(which1, which2, replacement))


    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Out);
