import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';

import { connect } from "react-redux";
import * as config from './config';
import replaceTheme from "./redux/thunks/replaceTheme";

import Sub from "./routes/Sub";
import Notification from "./routes/Notification";
import Home from "./routes/Home";
import Auth from "./routes/Auth";

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
  
  ,replaceDataAuth, replaceData2Auth
  , addRemoveNotification
}) => {
  
  
  useEffect(()=>{
    console.log(notification);
    const themeDeviceStr = isDarkMode() ? 'dark' : 'light';
    replaceTheme(themeDeviceStr);
  }, [])
  
  
  useEffect( () => { 
    (async () => {
    
    const loggedInfo = storage.get('loggedInfo'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
    if(!loggedInfo) {
      console.log("no logged info");
      return; // 로그인 정보가 없다면 여기서 멈춥니다.
    }; 
    
    replaceDataAuth("status", true)
    replaceDataAuth("email", loggedInfo.email)
    replaceDataAuth("_id", loggedInfo._id)
    
    try {
      const res = await axios.get(`${config.URL_API_NS}/auth-local/check`, {withCredentials: true});
      console.log("seems not error!")
    } catch (e) {
      storage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
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
      
      <Route path="/team-generator" exact={true} component={TeamGeneratorDoor} />
      <Route path="/team-generator/:idPlanTeam"  component={TeamGenerator} />
      
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