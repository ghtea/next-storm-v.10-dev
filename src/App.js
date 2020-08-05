import React, {useEffect} from 'react';
import {  BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from './config';
import replaceTheme from "./redux/thunks/replaceTheme";
import { useCookies } from 'react-cookie';
import dictCode from './others/dictCode'

import Sub from "./routes/Sub";
import Notification from "./routes/Notification";
import Home from "./routes/Home";

import Auth from "./routes/Auth";

import TeamPlanner from "./routes/TeamPlanner";

import CompGallery from "./routes/CompGallery";

import addDeleteNotification from "./redux/thunks/addDeleteNotification";
import {replaceData, replaceData2} from "./redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "./redux/actions/auth";
//import storage from './tools/vanilla/storage';

import {language_browser_to_ISO_639_1} from './tools/vanilla/language';
import {ThemeProvider } from 'styled-components';
import themes from "./styles/themes"
import { GlobalStyle, Div} from './styles/DefaultStyles';


// env 사용할때 각변수 앞에 REACT_APP_ 를 붙혀야한다 https://hello-bryan.tistory.com/134

const DivContent = styled(Div)`
  
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  margin-top: 50px; /* height of sub */
  height: calc(100vh - 50px);
  
	@media (min-width:  ${props => (props.theme.media.md) }px) {
	 margin-top: 60px; /* height of sub */
	 height: calc(100vh - 60px);
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
  notification
  
  ,match, location, history
  
  , themeName, language
  
  ,replaceDataAuth, replaceData2Auth
  ,replaceData, replaceData2
  
  , addDeleteNotification
}) => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['logged', 'language', 'themeOption']);
  
  // check cookie 'language', 'theme'
  useEffect(()=>{
    
    const language_browser = navigator.language || navigator.userLanguage;
    console.log(language_browser);
    const language_cookie = cookies.language;
    
    // https://www.metamodpro.com/browser-language-codes
    // https://gist.github.com/wpsmith/7604842
    if (!language_cookie && language_browser) {
      const language_redux = language_browser_to_ISO_639_1(language_browser);
      console.log('language_redux');
      console.log(language_redux);
      replaceData("language", language_redux);
    }
    else if (language_cookie) {
      const language_redux = language_cookie;
      replaceData("language", language_redux);
    }
    
    
    
    const themeOption_cookie = cookies.themeOption;
    if (themeOption_cookie === 'auto' || !themeOption_cookie) {
      const themeName = isDarkMode() ? 'dark' : 'light';
      replaceData("themeOption", 'auto');
      replaceData("themeName", themeName);
    }
    else {
      replaceData("themeOption", themeOption_cookie);
      replaceData("themeName", themeOption_cookie);
    }
    
  },[])
  
  // check query for code_situation
  useEffect(()=>{
    const { code_situation, ...rest } = queryString.parse(location.search);
    
    if (code_situation) {
      
      addDeleteNotification(code_situation, language);
      
      const search = queryString.stringify(rest);
      history.replace({
        ...location,
        search
      });
      /*
      const location = Object.assign({}, browserHistory.getCurrentLocation());
      queryNames.forEach(q => delete location.query[q]);
      browserHistory.push(location);
      */
    }
    
  },[])
  
  
  
  
  // 새로고침할 때마다, 로그인의 흔적이 있으면 감춰진 토큰 이용해서 로그인
  useEffect( () => { 
    (async () => {
      
    replaceData2('loading', 'user', true);
    replaceData2('ready', 'user', false);
    
    const logged = cookies.logged; // 로그인 정보를 로컬스토리지에서 가져옵니다.
    // 참고로 localStorage 에는 user의 _id 만 저장한다!!! 
    
    if(!logged) {
      console.log("no logged user");
      
      replaceDataAuth("_id", "");
      replaceDataAuth("email", "");
      replaceDataAuth("battletag", "");
      replaceDataAuth("mmr", {});
      
      replaceData2('loading', 'user', false);
      replaceData2('ready', 'user', false);
    
      return; // 로그인 정보가 없다면 여기서 멈춥니다.
    }; 
    
    
    
    try {
      // 토큰 확인해서 바로 유저 정보 부여!
      const res = await axios.get(`${config.URL_API_NS}/auth-local/check`, {withCredentials: true, credentials: 'include'});
      //console.log("seems not error!")
      
      console.log(res.data);
      
      replaceDataAuth("_id", res.data._id)
      replaceDataAuth("email", res.data.email)
      replaceDataAuth("battletag", res.data.battletagConfirmed)
      replaceDataAuth("mmr", res.data.mmr)
      
      replaceData2('loading', 'user', false);
      replaceData2('ready', 'user', true);
      
    } catch (e) { // token 정보가 잘못되었었으면 여기로 이동
      removeCookie('logged');
      window.location.href = '/log-in?reason=wrong-token';
    }
    
    }) ()
  
  },[])
  
  
  
  return (
    <>
    
    <ThemeProvider theme={themes[themeName]}>
    

    <GlobalStyle/>
    
    <BrowserRouter>
      
      
      <Route path="/" component={Sub} />
      <Route path="/" component={Notification} />
      
      
      
      <DivContent>
      <Switch >
      
      <Route path="/" exact={true} component={Home} />
      
      <Route path="/auth" component={Auth} />
      
      <Route path="/team-planner" component={TeamPlanner} />
      
      <Route path="/comp-gallery" component={CompGallery} />
      
      </Switch >
      </DivContent>
      
      
      
    </BrowserRouter>
    
    
    </ThemeProvider>
    </>
  );

}


function mapStateToProps(state) { 
  return { 
    notification: state.basic.notification
    
    , themeName: state.basic.themeName
    , language: state.basic.language
   
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceTheme: (themeName) => dispatch(replaceTheme(themeName)) 
    
    ,replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    ,addDeleteNotification: (code_situation, language, message, time) => dispatch( addDeleteNotification(code_situation, language, message, time))
  }; 
}

// Home 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(App);