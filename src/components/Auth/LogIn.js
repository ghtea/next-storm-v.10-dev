
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';
import { useCookies } from 'react-cookie';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import {replaceData2} from "../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../redux/actions/auth";


import { Link, NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea, A, LinkDefault, NavLinkDefault} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import storage from '../../tools/vanilla/storage';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'




const DivLogIn = styled(Div)`
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
  width: 100%;
`
const InputPasswordStyled = styled(Input)`
  
`

const ButtonLogIn = styled(Button)`
  
`

const Link_Common = styled(LinkDefault)`
  width: auto;
  align-self: flex-end;
  text-decoration: underline;
  color: ${props => props.theme.color_weak};
  margin-top: 1px;
  margin-bottom: 1px;
`

const DivForgotPassword = styled(Div)`
  cursor: pointer;
  width: auto;
  align-self: flex-end;
  text-decoration: underline;
  color: ${props => props.theme.color_weak};
  margin-top: 1px;
  margin-bottom: 1px;
`



 const LogIn = ({
  
  location, language
   
   , replaceDataAuth
   , replaceData2
   , addDeleteNotification
 }) => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['logged']);
  
  const inputEmailBattletag = useInput(""); // {value, setValue, onChange};
  const inputPassword = useInput(""); // {value, setValue, onChange};
  
  const history = useHistory(); 
  
  
  
  
  const onClick_LogIn = async () => {
    
    try {
      if (inputEmailBattletag.value === "") {
        addDeleteNotification("auth11", language);
      }
      else if (inputPassword.value === "") {
        addDeleteNotification("auth12", language);
      }
    
      else {
        
        const inputUser = {
          identification: inputEmailBattletag.value
          , password: inputPassword.value
        }
        
        try {
          const res = await axios.post(`${config.URL_API_NS}/auth-local/log-in`, inputUser, {withCredentials: true, credentials: 'include'});
          // https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275   we need extra setting for cookies
          //console.log(res)
          
            // code_situation 가 존재하면 ( = 내가 지정한 오류에 속한 결과이면...)
          if (res.data.code_situation) {
            
            const code_situation = res.data.code_situation;
            replaceData2('loading', 'user', false);
            replaceData2('ready', 'user', false);
            
            removeCookie('logged');
            
            replaceDataAuth("user", {});
            
            
            if (code_situation === `alocal03`) { // '이 배틀태그는 아직 승인되지 않았습니다'
              
              const query = queryString.stringify({
                "code_situation": "alocal03"
              });
              
              window.location.href = (`${config.URL_THIS}/auth/apply-battletag?` + query);
              return;
              
            }
            
            else { // 다른 code_situation 이면
              addDeleteNotification(code_situation, language);
            }
            
          }
          
          // 성공시
          else if (res.status === 200) {
            
            setCookie('logged', "yes",{maxAge: 60 * 60 * 24 * 3});
            
            replaceDataAuth("user", res.data);
            
            replaceData2('loading', 'user', false);
            replaceData2('ready', 'user', true);
            
            
            const query = queryString.parse(location.search);
            if(query.destination !== undefined) {
              history.push(query.destination);
            }
            else if (query.shouldGoBack === "yes") {
              history.goBack();
            }
            else { history.push('/') }
            //addDeleteNotification("auth13", language);
          }
          
          
        }
        catch(error) {
          
          replaceData2('loading', 'user', false);
          replaceData2('ready', 'user', false);
          
          removeCookie('logged');
          
          replaceDataAuth("user", {});

          addDeleteNotification("auth14", language);
        }
        
 
      }
    } catch(error) {console.log(error)}
    
  }
  
  const onKeyPress_LogIn = async (event) => {
    if (event.key === "Enter") {
      onClick_LogIn();
    }
    
  }
  
  
  
  
  return (
  
  <DivLogIn>
    
    <Div>
      <DivLabel> {(() => {
              switch (language) {
                case 'ko': 
                  return '이메일 또는 배틀태그';
                case 'ja': 
                  return 'メールまたはバトルタグ';
                default: // eng
                  return 'Email or Battletag'
              }
            })()}  </DivLabel>
      <InputCommon {...inputEmailBattletag}  placeholder="email or battletag"  
        onKeyPress={onKeyPress_LogIn}
      />
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
      <InputCommon {...inputPassword}  placeholder="password" type="password" 
        onKeyPress={onKeyPress_LogIn}
      />
    </Div>
    
    <ButtonLogIn 
      onClick={onClick_LogIn}
      > {(() => {
              switch (language) {
                case 'ko': 
                  return '로그인';
                case 'ja': 
                  return 'ログイン';
                default: // eng
                  return 'Log In'
              }
            })()}  </ButtonLogIn>
    
    
    <Link_Common to="/auth/forgot-password">  {(() => {
              switch (language) {
                case 'ko': 
                  return '비밀번호를 잊어버렸나요?';
                case 'ja': 
                  return 'パスワードをお忘れですか?';
                default: // eng
                  return 'Forgot Password?';
              }
            })()} </Link_Common>
    <Link_Common to="/auth/sign-up">  {(() => {
              switch (language) {
                case 'ko': 
                  return '회원가입';
                case 'ja': 
                  return '会員加入';
                default: // eng
                  return 'Sign Up';
              }
            })()} </Link_Common>
    <Link_Common to="/auth/apply-battletag"> {(() => {
              switch (language) {
                case 'ko': 
                  return '배틀태그 등록';
                case 'ja': 
                  return 'バトルタグ登録';
                default: // eng
                  return 'Register Battletag';
              }
            })()} </Link_Common>
    
  </DivLogIn>
  
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
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);