import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';
import { uuid } from 'uuidv4'

import { connect } from "react-redux";
import * as config from '../config';

import addRemoveNotification from "../redux/thunks/addRemoveNotification";
import {replaceData2} from "../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery} from "../redux/actions/comp_gallery";


import { Link, NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea} from '../styles/DefaultStyles';


import useInput from '../tools/hooks/useInput';
import {getTimeStamp} from '../tools/vanilla/time';

import IconWorking from '../svgs/basic/IconWorking'




const DivSignUp = styled(Div)`
  width: 300px;
  height:300px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;


const InputCommon = styled(Input)`
  height: 30px;
  margin-top: 2px;
  margin-bottom: 2px;
`
/*
const InputEmailStyled = styled(Input)`
  height: 30px;
`
const InputPasswordStyled = styled(Input)`
  height: 30px;
`
*/
const ButtonRegister = styled(Button)`
  
`
const LinkLogin = styled(Link)`
  align-self: flex-end;
`



 const SignUp = ({
   addRemoveNotification
 }) => {

  const inputEmail1 = useInput(""); // {value, setValue, onChange};
  const inputEmail2 = useInput(""); // {value, setValue, onChange};
  
  //const inputUsername = useInput(""); 
  
  const inputPassword1 = useInput(""); 
  const inputPassword2 = useInput(""); 
  
  const inputBattletagPending = useInput(""); 
  
  
  
  const onClick_SignUp = async (event) => {
    
    const regexBattletag = /.*#.*/;
    const resultTestBattletag = regexBattletag.test(inputBattletagPending.value)
    
    try {
      if (inputEmail1.value === "" || inputEmail2.value === "") {
        addRemoveNotification("error", "enter both emails")
      }
      else if (inputEmail1.value !== inputEmail2.value) {
        addRemoveNotification("error", "2 emails are different")
      }
      else if (inputPassword1.value === "" || inputPassword2.value === "") {
        addRemoveNotification("error", "enter both passwords")
      }
      else if (inputPassword1.value !== inputPassword2.value) {
        addRemoveNotification("error", "2 passwords are different")
      }
      else if (inputBattletagPending.value === "") {
        addRemoveNotification("error", "enter battletag")
      }
      else if (!resultTestBattletag) {
        addRemoveNotification("error", "add '# and numbers' to battletag")
      }
      
      else {
        
        //const _id = Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5);
        const inputUser = {
          _id: uuid()
          , email: inputEmail1.value
          , password: inputPassword1.value
          , battletagPending: inputBattletagPending.value
        }
        
        try {
          const res = await axios.post(`${config.URL_API_NS}/auth-local/sign-up`, inputUser);
          
          // 내가 지정한 오류에 속한 결과이면...
          if (res.data.situation === "error") {
            addRemoveNotification("error", `${res.data.message}`);
          }
          
          // 성공시
          else if (res.status === 200) {
            addRemoveNotification("success", `you registered successfully`);
            
            // 배틀태그 확인하러 여행!
            window.location.href = `${config.URL_API_NS}/auth-bnet/`;
          }
          
          // 그 외 (에러는 못받아들이는듯)
          else { console.log(res) };
        }
        catch (error) {
          console.log(error);
          addRemoveNotification("error", "failed in signing up")
        }
        
      } // else
    } catch(error) {console.log(error); return;}  // 

  }
  
  /* <InputCommon {...inputUsername}  placeholder="username" /> */
  return (
  
  <DivSignUp>
    <Div>  </Div>
    
    <InputCommon {...inputEmail1}  placeholder="email"  />
    <InputCommon {...inputEmail2}  placeholder="email again"  />
    
    <InputCommon {...inputPassword1}  placeholder="password" type="password" />
    <InputCommon {...inputPassword2}  placeholder="password again" type="password" />
    
    <InputCommon {...inputBattletagPending}  placeholder="battletag#1234"/>
    
    
    <ButtonRegister onClick={onClick_SignUp}> SIGN UP </ButtonRegister>
    
    <LinkLogin to="/login"> to login </LinkLogin>
    
  </DivSignUp>
  
  )

}
  
  


function mapStateToProps(state) { 
  return { 
   
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return {
    
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);