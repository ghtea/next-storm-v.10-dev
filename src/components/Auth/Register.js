import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../config';

import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceData2} from "../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery} from "../../redux/actions/comp_gallery";


import { Link, NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'




const DivRegister = styled(Div)`
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



 const Register = ({
   addRemoveNotification
 }) => {

  const inputEmail = useInput(""); // {value, setValue, onChange};
  
  const inputUsername = useInput(""); 
  
  const inputPassword1 = useInput(""); 
  const inputPassword2 = useInput(""); 
  
  const onClick_Register = async (event) => {
    
     try {
      if (inputEmail.value === "") {
        addRemoveNotification("error", "enter email")
      }
      else if (inputUsername.value === "") {
        addRemoveNotification("error", "enter username")
      }
      else if (inputPassword1.value === "" || inputPassword2.value === "") {
        addRemoveNotification("error", "enter passwords")
      }
      else if (inputPassword1.value !== inputPassword2.value) {
        addRemoveNotification("error", "2 passwords are different")
      }
      else {
        
      }
    
    
    if (InputPassword1 ==)
    let registerUser = {
      
    }
    
    await axios.post(`https://a-ns.avantwing.com/auth-local/register`, tUser);
  }
  
  return (
  
  <DivRegister>
    <Div> register </Div>
    
    <InputCommon {...inputEmail}  placeholder="email"  />
    
    <InputCommon {...inputUsername}  placeholder="username" />
    
    <InputCommon {...inputPassword1}  placeholder="password" type="password" />
    <InputCommon {...inputPassword2}  placeholder="password again" type="password" />
    
    
    <ButtonRegister onClick={onClick_Register}> register </ButtonRegister>
    
    <LinkLogin to="/auth/login"> to login </LinkLogin>
    
  </DivRegister>
  
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);