import React, {useState, useEffect} from 'react';
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

import SubBasic from "../components/Basic/SubBasic"



//import Player from '../components/Player'
import IconHandHeart from '../svgs/basic/IconHandHeart'
import IconPenBrush from '../svgs/basic/IconPenBrush'
import IconLink from '../svgs/basic/IconLink';
import IconSun from '../svgs/basic/IconSun';
import IconMoon from '../svgs/basic/IconMoon';
import IconMoonSun from '../svgs/basic/IconMoonSun';

import IconUpload from '../svgs/basic/IconUpload';
import IconPaperPlane from '../svgs/basic/IconPaperPlane';


//import Guide from '../components/Home/Guide';


import useAxiosGet from '../tools/hooks/useAxiosGet';
import useInput from '../tools/hooks/useInput';
import storage from '../tools/vanilla/storage';


const DivHome = styled(Div)`
  width: 350px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

`;


const Main = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px; /* 여기서 부터 360 고정! */ 
  height: auto;
  
  
  margin-top: 50px; 
  
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
    width: 100%;
    margin-top: 60px; 
    /*height: calc(100vh - 120px);*/
    
    overflow: auto; /* important!!! */
    
  }
`




const DivA = styled(Div)`
  
  height: 240px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`




const DivB = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    
    &:nth-child(n+2){margin-top: 20px;}
    width: auto;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    & > div {
      width: 170px;
      height: 120px;
      &:nth-child(n+2){margin-left: 10px;}
    }
  }
`




const DivMain = styled(Div)`
  
  & > div:nth-child(1){
    font-size: 2.4rem;
    font-weight: bold;
  }
  & > div:nth-child(2), & > div:nth-child(3){
    font-size: 1rem;
    font-weight: normal;
    color: ${props => props.theme.color_weak};
  }
`

const DivButtons = styled(Div)`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  margin-top: 20px;
  margin-bottom: 10px;
  & > button {
    width: auto;
  }
`


const DivIcon = styled(Div)`
  width: 80px;
  height: 80px;
`

const DivWho = styled(Div)`
  width: auto;
  color: ${props => props.theme.color_weak};
  
  margin-top: 3px;
  margin-bottom: 3px;

`

const DivPeople = styled(Div)`
  width: auto;
  
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
  , version
  
  , theme
  , language
  
  , addDeleteNotification
  , replaceData
  , replaceData2
  
  , replaceDataAuth
  
}) => {
    
  const [cookies, setCookie, removeCookie] = useCookies(['logged', 'language', 'themeOption']);
	const [textVersion, setTextVersion] = useState("");
	const [textUpdated, setTextUpdated] = useState("");
	
	const history = useHistory();
	
	
	useEffect(()=>{
	  const date = new Date(1598314473037);
	  const region = Intl.DateTimeFormat().resolvedOptions().timeZone;
	  
	  setTextVersion('v1.032')
	  setTextUpdated(`${date.getFullYear()}. ${(date.getMonth() + 1)}. ${date.getDate()}. ${date.getHours()}:00 (${region})`);
	},[])
	
	
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
	
	const onClick_SignUp = (event) => {
	  history.push("/auth/sign-up");
	}
	
	const onClick_ApplyBattletag = (event) => {
	  history.push("auth/apply-battletag");
	}
    
    return (
    
    <DivHome>
      
      {readyUser && <SubBasic/>}
      
      <Main>
      
        <DivA>
          
          <DivMain>
            <Div> NEXT STORM </Div>
            <Div> {`v${version['NextStorm'][config.STATUS]['version']}`} </Div>
            <Div> {version['NextStorm'][config.STATUS]['message']['content'][language]} </Div>
          </DivMain>
          
          <DivButtons>
            {(!readyUser) && <Button onClick={onClick_LogIn} >  {(() => {
                switch (language) {
                  case 'ko': 
                    return '로그인';
                  case 'ja': 
                    return 'ログイン';
                  default: // eng
                    return 'Log In'
                }
              })()} </Button>  }
            
            {(!readyUser) && <Button onClick={onClick_SignUp} >  {(() => {
              switch (language) {
                case 'ko': 
                  return '회원가입';
                case 'ja': 
                  return '会員加入';
                default: // eng
                  return 'Sign Up';
              }
            })()} </Button> }
            
            
            
            {(readyUser) && <Button onClick={onClick_LogOut} >  {(() => {
              switch (language) {
                case 'ko': 
                  return '로그아웃';
                case 'ja': 
                  return 'ログアウト';
                default: // eng
                  return 'Log Out'
              }
            })()}  </Button> }
            
            
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
            <Div> <A href="https://api.heroesprofile.com/upload" >
              <DivIcon> <IconUpload width={"72px"} height={"72px"} color="color_weak" /></DivIcon> 
              <Div>  {(() => {
                  switch (language) {
                    case 'ko': 
                      return '리플레이 업로드';
                    case 'ja': 
                      return 'リプレイ·アップロード';
                    default: // eng
                      return 'Upload Replays';
                  }
                })()}  </Div>
           </A> </Div>
            
            
            <Div> <A href="https://forms.gle/55en1pMgT6EBspuf9" >
              <DivIcon> <IconPaperPlane width={"56px"} height={"56px"} color="color_weak" /></DivIcon> 
              <Div>  {(() => {
                  switch (language) {
                    case 'ko': 
                      return '의견/에러';
                    case 'ja': 
                      return '意見·エラー';
                    default: // eng
                      return 'Opinion/Error';
                  }
                })()} </Div>
            </A> </Div>
          </Div>
          
          
          
          <Div>
            <Div>
              <DivWho> {(() => {
                switch (language) {
                  case 'ko': 
                    return '개발/디자인';
                  case 'ja': 
                    return '開発·デザイン';
                  default: // eng
                    return 'Made by';
                }
              })()}  </DivWho>
              <DivPeople> mbcat#1703  </DivPeople>
            </Div>
            
            <Div>
              <DivWho> thanks to </DivWho>
              <DivPeople> Heroes Profile API </DivPeople>
              <DivPeople>  Madosan </DivPeople>
            </Div>
          </Div>
          
          
        </DivB>
      
      </Main>
      
    
    </DivHome>
    )
  

    
} //Home




function mapStateToProps(state) { 
  return { 
    readyUser: state.basic.ready.user
    , user: state.auth.user
    
    , version: state.basic.version
    
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
