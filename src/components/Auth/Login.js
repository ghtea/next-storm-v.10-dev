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




const DivLogin = styled(Div)`
  width: 300px;
  height:300px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;


const InputEmailStyled = styled(Input)`
  height: 30px;
`
const InputPasswordStyled = styled(Input)`
  height: 30px;
`

const ButtonLogin = styled(Button)`
  
`
const LinkRegister = styled(Link)`
  align-self: flex-end;
`



 const Login = ({
   
 }) => {

  const InputEmail = useInput(""); // {value, setValue, onChange};
  const InputPassword = useInput(""); // {value, setValue, onChange};
  
  const onClick_Login = (event) => {
    
  }
  
  return (
  
  <DivLogin>
    <Div> login </Div>
    <InputEmailStyled {...InputEmail}  placeholder="email"  />
    <InputPasswordStyled {...InputPassword}  placeholder="password" type="password" />
    <ButtonLogin onClick={onClick_Login}> login </ButtonLogin>
    
    <LinkRegister to="/auth/register"> to register </LinkRegister>
    
  </DivLogin>
  
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);