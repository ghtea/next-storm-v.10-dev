import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { NavLink, useHistory } from 'react-router-dom';

import * as config from '../config';
import { connect } from "react-redux";
import readPlanTeam from "../redux/thunks/readPlanTeam";
import { useCookies } from 'react-cookie';

import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import {replaceData, replaceData2} from "../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../redux/actions/auth";


import {Div, Input, Button, A, LinkDefault} from '../styles/DefaultStyles';
//import Player from '../components/Player'
import IconHandHeart from '../svgs/basic/IconHandHeart'
import IconPenBrush from '../svgs/basic/IconPenBrush'
import IconLink from '../svgs/basic/IconLink';
import IconSun from '../svgs/basic/IconSun';
import IconMoon from '../svgs/basic/IconMoon';
import IconMoonSun from '../svgs/basic/IconMoonSun';


//import Guide from '../components/Home/Guide';


import useAxiosGet from '../tools/hooks/useAxiosGet';
import useInput from '../tools/hooks/useInput';
import storage from '../tools/vanilla/storage';


const DivHome = styled(Div)`
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

`;


const DivA = styled(Div)`
  height: 240px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`




const DivB = styled(Div)`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > div {
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const DivMain = styled(Div)`
  
  & > div:nth-child(1){
    font-size: 2.4rem;
    font-weight: bold;
  }
  & > div:nth-child(2){
    font-size: 1rem;
    font-weight: normal;
    color: ${props => props.theme.color_weak};
  }
`

const DivButtons = styled(Div)`
  margin-top: 10px;
  margin-bottom: 10px;
  & > button {
    
  }
`




const DivWho = styled(Div)`
  color: ${props => props.theme.color_weak};
  
  margin-top: 3px;
  margin-bottom: 3px;

`

const DivPeople = styled(Div)`
  width: 100%;
  
`

const isDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  else {
    return false;
  }
}  



const Home= ({
  readyUser
  , user
  
  , theme
  , language
  
  , addDeleteNotification
  , replaceData
  , replaceData2
  
  , replaceDataAuth
  
}) => {
    
  const [cookies, setCookie, removeCookie] = useCookies(['logged', 'language', 'themeOption']);
	
	const history = useHistory();
	
	const onClick_LogOut = async (event) => {
		try {
			const res = await axios.post(`${config.URL_API_NS}/auth-local/log-out`, {withCredentials: true, credentials: 'include'});
		}
		catch (error) {  console.log(error); }
		
		removeCookie('logged'); // 사실 무조건 로그아웃 가능하다. (그래서 위의 catch 에서 알림 설정 안한다)
		
		replaceData2('loading', 'user', false);
    replaceData2('ready', 'user', false);
    
    replaceDataAuth("_id", "");
    replaceDataAuth("email", "");
    replaceDataAuth("battletag", "");
    replaceDataAuth("mmr", {});
    
    window.location.reload(true);
	}
	
	const onClick_LogIn = (event) => {
	  history.push("/auth/log-in");
	}
	
	const onClick_ApplyBattletag = (event) => {
	  history.push("auth/apply-battletag");
	}
    
    return (
    
    <DivHome>
      
      <DivA>
        
        <DivMain>
          <Div> NEXT STORM </Div>
          <Div> v0.9 (2020. 8. 16.)  </Div>
        </DivMain>
        
        <DivButtons>
          {(!readyUser)? <Button onClick={onClick_LogIn} >  {(() => {
              switch (language) {
                case 'ko': 
                  return '로그인';
                case 'ja': 
                  return 'ログイン';
                default: // eng
                  return 'Log In'
              }
            })()} </Button> 
            : <Button onClick={onClick_LogOut} >  {(() => {
              switch (language) {
                case 'ko': 
                  return '로그아웃';
                case 'ja': 
                  return 'ログアウト';
                default: // eng
                  return 'Log Out'
              }
            })()}  </Button> 
            }
          
          {(readyUser && !user.battletag) && 
            <Button onClick={onClick_ApplyBattletag} >  {(() => {
              switch (language) {
                case 'ko': 
                  return '배틀태그 등록';
                case 'ja': 
                  return 'バトルタグ登録';
                default: // eng
                  return 'Register Battletag';
              }
            })()}  </Button> 
          }
        </DivButtons>
        
      </DivA>
      
      <DivB>
      

        <Div>
          <IconPenBrush width={"64px"} height={"64px"} color="color_weak" />
          <DivWho> developed & designed by </DivWho>
          <DivPeople> <A href="https://twitter.com/mbcat_hots" > @mbcat_hots </A>  </DivPeople>
        </Div>
        
        <Div>
          <IconHandHeart width={"56px"} height={"64px"} color="color_weak" />
          <DivWho> thanks to </DivWho>
          <DivPeople> Heroes Profile API </DivPeople>
          <DivPeople>  Madosan </DivPeople>
        </Div>
        
      </DivB>
      
      
    
    </DivHome>
    )
  

    
} //Home




function mapStateToProps(state) { 
  return { 
    readyUser: state.basic.ready.user
    , user: state.auth.user
    
    , theme: state.basic.theme
    , language: state.basic.language
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Home);
