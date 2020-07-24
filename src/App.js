import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import { connect } from "react-redux";
import replaceTheme from "./redux/thunks/replaceTheme";

import Sub from "./routes/Sub";
import Notification from "./routes/Notification";
import Home from "./routes/Home";

import TeamGenerator from "./routes/TeamGenerator";
import TeamGeneratorDoor from "./routes/TeamGeneratorDoor";

import CompGallery from "./routes/CompGallery";



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


const App = ({themeName, replaceTheme, notification}) => {
  
  
  useEffect(()=>{
    console.log(notification);
    const themeDeviceStr = isDarkMode() ? 'dark' : 'light';
    replaceTheme(themeDeviceStr);
  }, [])
  
  
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
  }; 
}

// Home 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(App);