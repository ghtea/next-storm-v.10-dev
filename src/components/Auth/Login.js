import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../config';

import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceData2} from "../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../redux/actions/auth";


import { Link, NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import storage from '../../tools/vanilla/storage';
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
   addRemoveNotification
 }) => {

  const inputEmail = useInput(""); // {value, setValue, onChange};
  const inputPassword = useInput(""); // {value, setValue, onChange};
  
  const history = useHistory(); 
  
  
  const onClick_Login = async (event) => {
    
    try {
      if (inputEmail.value === "") {
        addRemoveNotification("error", "enter email")
      }
      /*
      else if (inputUsername.value === "") {
        addRemoveNotification("error", "enter username")
      }
      */
      else if (inputPassword.value === "") {
        addRemoveNotification("error", "enter passwords")
      }
    
      else {
        
        const tUser = {
          email: inputEmail.value
          , password: inputPassword.value
        }
        
        
        const res = await axios.post(`https://a-ns.avantwing.com/auth-local/login`, tUser, {withCredentials: true, credentials: 'include'});
        // https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275   we need extra setting for cookies
        console.log(res)
        
        // 내가 지정한 오류에 속한 결과이면...
        if (res.data.situation === "error") {
          addRemoveNotification("error", `${res.data.message}`);
        }
        
        // 성공시
        else if (res.status === 200) {
          
          console.log(res.data);
          
          const loggedInfo = {
            _id: res.data._id
            , email: res.data.email
          }
          
          
          storage.set('loggedInfo', loggedInfo);
          
          console.log(storage.get("loggedInfo"))
          addRemoveNotification("success", `you have logined successfully`);
          
          
          
          history.push('/');
        }
        
        // 그 외 (에러는 못받아들이는듯)
        else { console.log(res) };
      }
    } catch(error) {console.log(error)}
    
  }
  
  return (
  
  <DivLogin>
    <Div> login </Div>
    <InputEmailStyled {...inputEmail}  placeholder="email"  />
    <InputPasswordStyled {...inputPassword}  placeholder="password" type="password" />
    
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
    
    replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
    
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Login);