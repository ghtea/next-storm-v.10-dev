import dotenv from 'dotenv';
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

import {CopyToClipboard} from 'react-copy-to-clipboard';

import useInput from '../../tools/hooks/useInput';
import storage from '../../tools/vanilla/storage';


const DivForgotPassword = styled(Div)`

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
    
    margin-top: 40px;
    
  }
  
`;





 const ForgotPassword = ({
  
  location, language
   
   , replaceDataAuth
   , replaceData2
   , addDeleteNotification
 }) => {
  
  
  
  const onClick_Copy = async (event) => {
    
    
    addDeleteNotification("auth24", language);
     
    
  }
  

  
  
  return (
  
  <DivForgotPassword>
    
    <Div> 
    
      <Div> {(() => {
        switch (language) {
          case 'ko': 
            return '가입한 이메일을 사용해서, 관리자한테 이메일을 보내세요';
          case 'ja': 
            return '登録したメールアドレスを使って,  管理者にメールを送ってください';
          default: // eng
            return 'Send an email to administrator using your email address which you have registered';
        }
      })()} </Div>
      
      <Div> 
        <CopyToClipboard 
          text={"eiirwp@gmail.com"}
          onCopy={ () => {  
            addDeleteNotification("basic04", language); 
          } } >
          
          <Button > 
            {(() => {
              switch (language) {
                case 'ko': 
                  return '관리자 이메일 주소 복사';
                case 'ja': 
                  return 'ゲーム';
                default: // eng
                  return 'games';
              }
            })()}  
          </Button>
        </CopyToClipboard>
      </Div>
      
    </Div>
    
  
  </DivForgotPassword>
  
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);