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


import useInput from '../../tools/hooks/useInput';
import storage from '../../tools/vanilla/storage';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'



const DivApplyBattletag = styled(Div)`
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




const InputCommon = styled(Input)`
  width: 100%;
`

/*
const InputPasswordStyled = styled(Input)`
  height: 30px;
`

const InputBattletagStyled = styled(Input)`
  height: 30px;
`

const ButtonApplyBattletag = styled(Button)`
  
`
*/

const DivLabel = styled(Div)`
  width: auto;
  margin-left: 8px;
`

const Link_Common = styled(LinkDefault)`
  align-self: flex-end;
  text-decoration: underline;
  color: ${props => props.theme.color_weak};
  margin-top: 1px;
  margin-bottom: 1px;
`



 const ApplyBattletag = ({
  
  location, language
   
   , replaceDataAuth
   , replaceData2
   , addRemoveNotification
 }) => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['logged']);
  
  
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
        addDeleteNotification("auth21", language);
      }
      else if (inputPassword.value === "") {
        addDeleteNotification("auth12", language);
      }
      else if (inputBattletag.value === "") {
        addDeleteNotification("auth22", language);
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
          
           // code_situation 가 존재하면 ( = 내가 지정한 오류에 속한 결과이면...)
          if (res.data.code_situation) {
            
            const code_situation = res.data.code_situation;
            
            replaceData2('loading', 'user', false);
            replaceData2('ready', 'user', false);
            
            removeCookie('logged');

            replaceDataAuth("_id", "");
            replaceDataAuth("email", "");
            replaceDataAuth("battletag", "");
            
            
          
            addDeleteNotification(code_situation, language);
            
          }
          
          // 성공시
          else if (res.status === 200) {
            
            setCookie('logged', "yes",{maxAge: 60 * 60 * 24 * 3});
            
            replaceDataAuth("_id", res.data._id)
            replaceDataAuth("email", res.data.email)
            replaceDataAuth("battletag", res.data.battletagConfirmed)
            
            replaceData2('loading', 'user', false);
            replaceData2('ready', 'user', true);
            
            addDeleteNotification("auth23", language);
            
            // 배틀태그 확인하러 여행!
            window.location.href = `${config.URL_API_NS}/auth-bnet/`;
          }
          
          
        }
        catch(error) {
          replaceData2('loading', 'user', false);
          replaceData2('ready', 'user', false);
          
          removeCookie('logged');
          
          replaceDataAuth("_id", "");
          replaceDataAuth("email", "");
          replaceDataAuth("battletag", "");
          
          addDeleteNotification("auth24", language);
        }
        
 
      }
    } catch(error) {console.log(error)}
    
  }
  

  
  
  return (
  
  <DivApplyBattletag>
    
    <Div> 
      <DivLabel> Email Address </DivLabel>
      <InputCommon {...inputEmail}  placeholder="example@gmail.com"  />
    </Div>
    
    <Div> 
      <DivLabel> Password </DivLabel>
      <InputCommon {...inputPassword}  placeholder="password" type="password" />
    </Div>
    
    <Div> 
      <DivLabel> Battletag </DivLabel>
      <InputCommon {...inputBattletag}  placeholder="exmaple#1234"  />
    </Div>
    
    <Button onClick={onClick_ApplyBattletag}> APPLY BATTLETAG </Button>
    
    <Link_Common to="/auth/sign-up"> to Sign Up </Link_Common>
    
  </DivApplyBattletag>
  
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
export default connect(mapStateToProps, mapDispatchToProps)(ApplyBattletag);