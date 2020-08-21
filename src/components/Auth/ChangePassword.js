import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { uuid } from 'uuidv4'
import queryString from 'query-string';
import { useCookies } from 'react-cookie';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import {replaceData2} from "../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../redux/actions/auth";


import { Link, NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea, LinkDefault, NavLinkDefault} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';



const DivChangePassword = styled(Div)`
  margin-top: 20px;
  width: 300px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    
    margin-top: 4px;
    margin-bottom: 4px;
    
    & > div {
      margin-top: 1px;
      margin-bottom: 1px;
    }
    
  }
  
`;



const DivLabel = styled(Div)`
  width: auto;
  margin-left: 8px;
`



const InputCommon = styled(Input)`
  width: 100%
`



const ButtonChangePassword = styled(Button)`
  
`





 const ChangePassword = ({
   
   user
   , readyUser
   , language
   
   
   , addDeleteNotification
 }) => {

  const history = useHistory();
  
  const inputPasswordCurrent = useInput(""); 
  
  const inputPassword1 = useInput(""); 
  const inputPassword2 = useInput(""); 
  
  
  const onClick_ChangePassword = async (event) => {
    
    
    try {
      if (!readyUser) {
        addDeleteNotification("auth31", language);
        history.push('/auth/log-in');
      }
      else if (inputPasswordCurrent.value === "") {
        addDeleteNotification("auth031", language);
      }
      else if (inputPassword1.value === "" || inputPassword2.value === "") {
        addDeleteNotification("auth03", language);
      }
      else if (inputPassword1.value !== inputPassword2.value) {
        addDeleteNotification("auth04", language);
      }
      
      else {
        
        //const _id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5);
        const inputUser = {
          _id: user._id
          , passwordCurrent: inputPasswordCurrent.value
          , passwordNew: inputPassword1.value
        }
        
        try {
          const res = await axios.put(`${config.URL_API_NS}/auth-local/change-password`, inputUser);
          
           // code_situation 가 존재하면 ( = 내가 지정한 오류에 속한 결과이면...)
          if (res.data.code_situation) {
            
            const code_situation = res.data.code_situation;
            addDeleteNotification(code_situation, language);
          }
          
          // 성공시   
          else if (res.status === 200) {
            addDeleteNotification("auth51", language);
            history.push('/');
          }
          // 그 외 (에러는 못받아들이는듯)
          else { console.log(res) };
        }
        catch (error) {
          console.log(error);
          addDeleteNotification("auth52", language);
        }
        
      } // else
    } catch(error) {console.log(error); return;}  // 

  }
  
  
  return (
  
  <DivChangePassword>
     
    
    <Div>
      <DivLabel> {(() => {
              switch (language) {
                case 'ko': 
                  return '현재 비밀번호';
                case 'ja': 
                  return '現在のパスワード';
                default: // eng
                  return 'Current Password';
              }
            })()}  </DivLabel>
      <InputCommon {...inputPasswordCurrent}  placeholder="password" type="password" />
    </Div>
    
    <Div>
      <DivLabel> {(() => {
              switch (language) {
                case 'ko': 
                  return '새 비밀번호';
                case 'ja': 
                  return '新しいパスワード';
                default: // eng
                  return 'New Password';
              }
            })()}  </DivLabel>
      <InputCommon {...inputPassword1}  placeholder="password" type="password" />
      <InputCommon {...inputPassword2}  placeholder="again" type="password" />
    </Div>
    
    
    
    <ButtonChangePassword onClick={onClick_ChangePassword}> {(() => {
        switch (language) {
          case 'ko': 
            return '변경';
          case 'ja': 
            return '変更';
          default: // eng
            return 'Change';
        }
      })()}  </ButtonChangePassword>
    
    
    
  </DivChangePassword>
  
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
    
    replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
    
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);