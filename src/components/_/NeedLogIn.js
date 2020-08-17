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


const DivNeedLogIn = styled(Div)`
  
  width: 300px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  margin: 20px;
  
  border-radius: 15px;
  border: 2px solid ${props => props.theme.COLOR_normal};
`;



const DivA = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  margin: 0;
  padding: 0;
    
  & > *:nth-child(1) {
    width: 100%;
    border-radius: 15px 15px 0 0;
    background-color: ${props => props.theme.COLOR_middle};
    
    border: 2px solid ${props => props.theme.COLOR_normal};
    border-bottom: none;
    
    margin: 0;
    padding: 0;
    
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
  }
`


const DivB = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  margin: 0;
  padding: 0;
  
  
  & > *:nth-child(1) {
    width: 50%;
    border-radius: 0 0 0 15px;
    background-color: ${props => props.theme.COLOR_normal};
    
    margin: 0;
    padding: 0;
    
    border-right: 2px solid ${props => props.theme.COLOR_middle};
    
  }
  
  & > *:nth-child(2) {
    width: 50%;
    border-radius: 0 0 15px 0;
    background-color: ${props => props.theme.COLOR_normal};
    
    margin: 0;
    padding: 0;
    
    border-left: 2px solid ${props => props.theme.COLOR_middle};
    
  }
`


// https://ps.avantwing.com/team-Planner/sss?ooo 들어가 보기
const NeedLogIn = ({
  
  user
  , readyUser
  
  , language
  
  
  , destination
  
  , dictMessage
  
  , replaceData2
  , addDeleteNotification
  
}) => {
  
  const history = useHistory();
  
  
    return (
    
  <DivNeedLogIn>
      
      <DivA>
      
        <Div> {(() => {
          switch (language) {
            case 'ko': 
              return dictMessage['ko'];
            case 'ja': 
              return dictMessage['ja'];
            default: // eng
              return dictMessage['en'];
          }
        })()} </Div>
        
      </DivA>
      
      
      <DivB>
      
        <Button 
          onClick={(event)=>{
            const query = queryString.stringify({
              destination: destination
            });
            history.push('/auth/log-in?' + query)
          }} > {(() => {
            switch (language) {
              case 'ko': 
                return '로그인';
              case 'ja': 
                return 'ログイン';
              default: // eng
                return 'Log In';
            }
          })()}  </Button>
        
        <Button 
          onClick={(event)=>{history.push(`/auth/sign-up`)}} > {(() => {
          switch (language) {
            case 'ko': 
              return '회원가입';
            case 'ja': 
              return '会員登録';
            default: // eng
              return 'Sign Up';
          }
        })()}  </Button>
        
        
      </DivB>
  
    
  </DivNeedLogIn>
    
  )
} 



function mapStateToProps(state) { 
  return {
    
    user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , language: state.basic.language
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
     replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(NeedLogIn);
