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
import {getTimeStamp} from '../../tools/vanilla/time';



const DivSignUp = styled(Div)`
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



const ButtonSignUp = styled(Button)`
  
`


const Link_Common = styled(LinkDefault)`
  align-self: flex-end;
  text-decoration: underline;
  color: ${props => props.theme.color_weak};
  margin-top: 1px;
  margin-bottom: 1px;
`



 const SignUp = ({
   language
   , addDeleteNotification
 }) => {

  const [cookies, setCookie, removeCookie] = useCookies(['logged']);

  const inputEmail1 = useInput(""); // {value, setValue, onChange};
  const inputEmail2 = useInput(""); // {value, setValue, onChange};
  
  //const inputUsername = useInput(""); 
  
  const inputPassword1 = useInput(""); 
  const inputPassword2 = useInput(""); 
  
  const inputBattletagPending1 = useInput(""); 
  const inputBattletagPending2 = useInput(""); 
  
  
  
  const onClick_SignUp = async (event) => {
    
    const regexBattletag = /.*#.*/;
    const resultTestBattletag = regexBattletag.test(inputBattletagPending1.value)
    
    try {
      if (inputEmail1.value === "" || inputEmail2.value === "") {
        addDeleteNotification("auth01", language);
      }
      else if (inputEmail1.value !== inputEmail2.value) {
        addDeleteNotification("auth02", language);
      }
      else if ( !(/\S+@\S+\.\S+/).test(inputEmail1.value) ){
        addDeleteNotification("auth021", language);
      }
      
      else if (inputPassword1.value === "" || inputPassword2.value === "") {
        addDeleteNotification("auth03", language);
      }
      else if (inputPassword1.value !== inputPassword2.value) {
        addDeleteNotification("auth04", language);
      }
      else if (inputBattletagPending1.value === "" || inputBattletagPending2.value === "") {
        addDeleteNotification("auth05", language);
      }
      else if (inputBattletagPending1.value !== inputBattletagPending2.value) {
        addDeleteNotification("auth06", language);
      }
      else if (!resultTestBattletag) {
        addDeleteNotification("auth07", language);
      }
      
      else {
        
        //const _id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5);
        const inputUser = {
          _id: uuid()
          , email: inputEmail1.value
          , password: inputPassword1.value
          , battletagPending: inputBattletagPending1.value
        }
        
        try {
          const res = await axios.post(`${config.URL_API_NS}/auth-local/sign-up`, inputUser);
          
           // code_situation 가 존재하면 ( = 내가 지정한 오류에 속한 결과이면...)
          if (res.data.code_situation) {
            
            const code_situation = res.data.code_situation;
            removeCookie('logged');
            addDeleteNotification(code_situation, language);
          }
          
          // 성공시
          else if (res.status === 200) {
            addDeleteNotification("auth08", language);
            
            // 배틀태그 확인하러 여행!
            window.location.href = `${config.URL_API_NS}/auth-bnet/`;
          }
          
          // 그 외 (에러는 못받아들이는듯)
          else { console.log(res) };
        }
        catch (error) {
          console.log(error);
          addDeleteNotification("auth09", language);
        }
        
      } // else
    } catch(error) {console.log(error); return;}  // 

  }
  
  /* <InputCommon {...inputUsername}  placeholder="username" /> */
  return (
  
  <DivSignUp>
     
    
    
    <Div>
      <DivLabel> {(() => {
              switch (language) {
                case 'ko': 
                  return '이메일 주소';
                case 'ja': 
                  return 'メールアドレス';
                default: // eng
                  return 'Email Address';
              }
            })()} </DivLabel>
      <InputCommon {...inputEmail1}  placeholder="example@gmail.com"  />
      <InputCommon {...inputEmail2}  placeholder="again"  />
    </Div>
    
    <Div>
      <DivLabel> {(() => {
              switch (language) {
                case 'ko': 
                  return '비밀번호';
                case 'ja': 
                  return 'パスワード';
                default: // eng
                  return 'Password';
              }
            })()}  </DivLabel>
      <InputCommon {...inputPassword1}  placeholder="password" type="password" />
      <InputCommon {...inputPassword2}  placeholder="again" type="password" />
    </Div>
    
    <Div>
      <DivLabel> {(() => {
              switch (language) {
                case 'ko': 
                  return '배틀태그';
                case 'ja': 
                  return 'バトルタグ';
                default: // eng
                  return 'Battletag';
              }
            })()}  </DivLabel>
      <InputCommon {...inputBattletagPending1}  placeholder="exmaple#1234"/>
      <InputCommon {...inputBattletagPending2}  placeholder="again"/>
    </Div>
    
    
    <ButtonSignUp onClick={onClick_SignUp}> {(() => {
              switch (language) {
                case 'ko': 
                  return '회원가입';
                case 'ja': 
                  return '会員加入';
                default: // eng
                  return 'Sign Up';
              }
            })()}  </ButtonSignUp>
    
    <Link_Common to="/auth/log-in"> {(() => {
              switch (language) {
                case 'ko': 
                  return '로그인';
                case 'ja': 
                  return 'ログイン';
                default: // eng
                  return 'Log In'
              }
            })()} </Link_Common>
    
  </DivSignUp>
  
  )

}
  
  


function mapStateToProps(state) { 
  return { 
    language: state.basic.language
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);