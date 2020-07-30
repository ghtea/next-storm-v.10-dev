import React, {useEffect} from 'react';
import {Route, Switch, useHistory } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from './config';
import replaceTheme from "./redux/thunks/replaceTheme";
import { useCookies } from 'react-cookie';

import Sub from "./routes/Sub";
import Notification from "./routes/Notification";
import Home from "./routes/Home";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import SetMode from "./routes/SetMode";

import TeamGenerator from "./routes/TeamGenerator";
import TeamGeneratorDoor from "./routes/TeamGeneratorDoor";

import CompGallery from "./routes/CompGallery";

import addRemoveNotification from "./redux/thunks/addRemoveNotification";
import {replaceData, replaceData2} from "./redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "./redux/actions/auth";
import storage from './tools/vanilla/storage';


import {ThemeProvider } from 'styled-components';
import themes from "./styles/themes"
import { GlobalStyle, Div} from './styles/DefaultStyles';
import fonts from './styles/fonts';


// env 사용할때 각변수 앞에 REACT_APP_ 를 붙혀야한다 https://hello-bryan.tistory.com/134

const DivContent = styled(Div)`
  
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    margin-top: 50px; /* height of sub */
  	
	}
 
	 @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	  margin-left: 120px; /* width of sub */
	 
		
	 }
  
`;


const isDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  else {
    return false;
  }
}  


const App = ({
  themeName, replaceTheme, notification
  
  , match, location
  
  ,replaceDataAuth, replaceData2Auth
  , addRemoveNotification
}) => {
  
  const history = useHistory();
  
  
  // 테마 설정
  useEffect(()=>{
    console.log(notification);
    const themeDeviceStr = isDarkMode() ? 'dark' : 'light';
    replaceTheme(themeDeviceStr);
  }, [])
  
  
  // 토큰이 들어온다면 (배틀넷 인증 했다는 뜻) 내 custom api '/check' 로 내 서버에서 정보 확인해서 프론트로 가져와주기
  useEffect(()=>{
    (async () => {
      
    const query = queryString.parse(location.search);
    const token = query.token;
    
    if (token) {
      const res = await axios.get(`${config.URL_API_NS}/auth-bnet/check`);
      console.log(res.data);
      
      const resUser = res.data;
      
      storage.set('_id', resUser._id);
      storage.set('battletag', resUser.battletag);
    }
    
    }) () //async
  }, [])
  
  
  
  useEffect( () => { 
    (async () => {
    
    const mode = storage.get('mode'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    const updated = new Date(storage.get('updated'))
    //console.log(updated)
    
    if(!mode) {
      
      console.log("no mode");
      
      // 초기화
      storage.set('_id', "");
      storage.set('battletag', "");
        
      history.push("/set-mode"); // mode 설정하는 페이지로 가기  // 거기서 updated 도 입력하기
      return; // 로그인 정보가 없다면 여기서 멈춥니다.
    }
    else if (mode === "view") {
      
      console.log("pass as view mode");
      
      // 초기화
      storage.set('_id', "");
      storage.set('battletag', "");
      
    }
    else if (mode === "auto") {
      
      const now = Date.now();
      
      if (updated && (now - updated <= 1000 * 60 * 30) ) { 
        console.log("pass as checked");
      }
      
      // 최근 업데이트가 30분이 넘었으면 재 확인
      else if (!updated || (now - updated > 1000 * 60 * 30) ) {
        
        // 초기화
        storage.set('_id', "");
        storage.set('battletag', "");
        
        console.log("should check login")
        storage.set('updated', Date.now());
        window.location.href = `${config.URL_API_NS}/auth-bnet/login`;
      }
      
    }
    
    }) () //async
  
  },[]) // useEffect
  
  
  
  return (
    <>
    
    <ThemeProvider theme={themes[themeName]}>
    
    
    <GlobalStyle/>
    
 
      
      <Route path="/" component={Sub} />
      <Route path="/" component={Notification} />
      
      <DivContent>
      <Switch >
      <Route path="/" exact={true} component={Home} />
      
      <Route path="/log-in" component={Login} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/set-mode" component={SetMode} />
      
      <Route path="/team-generator" exact={true} component={TeamGeneratorDoor} />
      <Route path="/team-generator/:idPlanTeam"  component={TeamGenerator} />
      
      <Route path="/comp-gallery" component={CompGallery} />
      
      </Switch >
      </DivContent>
      

    </ThemeProvider>
    </>
  );

}


function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName,
    notification: state.basic.notification
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceTheme: (themeName) => dispatch(replaceTheme(themeName)) 
    
    ,replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}

// Home 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(App);