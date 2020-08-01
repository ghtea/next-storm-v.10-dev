import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';

import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceData2} from "../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../redux/actions/auth";


import { Link, NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea, A} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import storage from '../../tools/vanilla/storage';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'




const DivApplyBattletag = styled(Div)`
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

const InputBattletagStyled = styled(Input)`
  height: 30px;
`

const ButtonApplyBattletag = styled(Button)`
  
`
const LinkRegister = styled(Link)`
  align-self: flex-end;
`



 const ApplyBattletag = ({
  
  location
   
   , replaceDataAuth
   , replaceData2
   , addRemoveNotification
 }) => {

  const inputEmail = useInput(""); // {value, setValue, onChange};
  const inputPassword = useInput(""); // {value, setValue, onChange};
  const inputBattletag = useInput("");
  
  const history = useHistory(); 
  
  /*
  useEffect(()=>{
    const query = queryString.parse(location.search);
    if(query.expired !== undefined) {
      addRemoveNotification("error", "please log in again");
    }
  },[])
  */
  
  const onClick_ApplyBattletag = async (event) => {
    
    try {
      if (inputEmail.value === "") {
        addRemoveNotification("error", "enter email")
      }
      else if (inputPassword.value === "") {
        addRemoveNotification("error", "enter passwords")
      }
      else if (inputBattletag.value === "") {
        addRemoveNotification("error", "enter battletag")
      }
    
      else {
        
        const inputUser = {
          identification: inputEmail.value
          , password: inputPassword.value
          , battletagPending: inputBattletag.value
        }
        
        try {
          const res = await axios.post(`https://a-ns.avantwing.com/auth-local/apply-battletag`, inputUser, {withCredentials: true, credentials: 'include'});
          // https://www.zerocho.com/category/NodeJS/post/5e9bf5b18dcb9c001f36b275   we need extra setting for cookies
          //console.log(res)
          
            // 내가 지정한 오류에 속한 결과이면...
          if (res.data.situation === "error") {
            
            storage.remove('loggedUser');
            
            replaceDataAuth("status", false);
            replaceDataAuth("_id", "");
            replaceDataAuth("email", "");
            replaceDataAuth("battletag", "");
            
            replaceData2('loading', 'user', false);
            replaceData2('ready', 'user', false);
          
            addRemoveNotification("error", `${res.data.message}`);
            
          }
          
          // 성공시
          else if (res.status === 200) {
            
            console.log(res.data);
            
            const loggedUser = {
              _id: res.data._id
            }
            
            
            storage.set('loggedUser', loggedUser);
            
            replaceDataAuth("_id", res.data._id)
            replaceDataAuth("email", res.data.email)
            replaceDataAuth("battletag", res.data.battletagConfirmed)
            replaceDataAuth("status", true)
            
            replaceData2('loading', 'user', false);
            replaceData2('ready', 'user', true);
        
            addRemoveNotification("success", `moving to check battletag`);
            
            // 배틀태그 확인하러 여행!
            window.location.href = `${config.URL_API_NS}/auth-bnet/`;
          }
          
          
        }
        catch(error) {
          storage.remove('loggedUser');
          
          replaceDataAuth("status", false);
          replaceDataAuth("_id", "");
          replaceDataAuth("email", "");
          replaceDataAuth("battletag", "");
      
          replaceData2('loading', 'user', false);
          replaceData2('ready', 'user', false);
          
          addRemoveNotification("error", `failed in log in`);
        }
        
 
      }
    } catch(error) {console.log(error)}
    
  }
  

  
  
  return (
  
  <DivApplyBattletag>
    <Div>  </Div>
    <InputEmailStyled {...inputEmail}  placeholder="email"  />
    <InputPasswordStyled {...inputPassword}  placeholder="password" type="password" />
    
    <InputBattletagStyled {...inputBattletag}  placeholder="battletag"  />
    
    <ButtonApplyBattletag onClick={onClick_ApplyBattletag}> apply battletag </ButtonApplyBattletag>
    
    <LinkRegister to="/sign-up"> to Sign Up </LinkRegister>
    
  </DivApplyBattletag>
  
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
export default connect(mapStateToProps, mapDispatchToProps)(ApplyBattletag);