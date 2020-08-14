import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Media from 'react-media';

import * as config from '../../config';

import { connect } from "react-redux";
import {replaceData} from "../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../redux/actions/auth";

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import { NavLink, useLocation  } from 'react-router-dom';
import {Div, Button} from '../../styles/DefaultStyles';




const DivNav_Md= styled(Div)`
	width: auto;
	
	font-size: 1.1rem;
	
	margin: 0;
	
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
	color: ${props => props.theme.color_normal};
	font-weight: bold;
	/*border-bottom: 2px solid ${props => props.theme.color_active};*/
		
	}
	
`;


// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const Nav_Md = ({
  
	match
	
	, language
	, auth     // 변화 잘 감지하기 위해서, readyUser 만 따로 빼놓기!
	//, loadingUser, readyUser
	
	, themeName
	
	}) => {
	
	const location = useLocation(); // https://css-tricks.com/the-hooks-of-react-router/
	//console.log(location.pathname);
	
	//const [pathname, setPathname] = useState("/");
	const [title, setTitle] = useState("");
	
	const dictTitle = {
	  "home": {
	    en: "Home" 
	    , ko: "홈"
	    , ja: "ホーム"
	  }
	  ,"my": {
	    en: "my" 
	    , ko: "나"
	    , ja: "私"
	  }
	  ,"team-planner": {
	    en: "Team Planner" 
	    , ko: "팀 나누기"
	    , ja: "チーム分け"
	  }
	  ,"comp-gallery": {
	    en: "Comp Gallery" 
	    , ko: "조합 갤러리"
	    , ja: "構成ギャラリー"
	  }
	}
	
	
	useEffect( () => {
	  if (location.pathname === "/" || location.pathname === "") {
	    setTitle( dictTitle["home"][language] )
	  }
	  else if ( (/^(\/my)/).test(location.pathname) ) {
	    setTitle( dictTitle["my"][language] )
	  }
	  else if ( (/^(\/team-planner)/).test(location.pathname) ) {
	    setTitle( dictTitle["team-planner"][language] )
	  }
	  else if ( (/^(\/comp-gallery)/).test(location.pathname) ) {
	    setTitle( dictTitle["comp-gallery"][language] )
	  }
	}, [location.pathname, language])
	
	
	return (
 
	
  <DivNav_Md>
    
    {title}  

	</DivNav_Md>
	
	)
}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
    , language: state.basic.language
 
    , auth: state.auth
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData: (which, newThemeName) => dispatch( replaceData(which, newThemeName) ) 
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
    ,replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Nav_Md);


