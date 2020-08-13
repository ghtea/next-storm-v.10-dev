import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Media from 'react-media';

import * as config from '../../../config';
import { useCookies } from 'react-cookie';

import { connect } from "react-redux";
import {replaceData} from "../../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../../redux/actions/auth";

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode';

import { NavLink } from 'react-router-dom';
import {Div, Button} from '../../../styles/DefaultStyles';

import IconMoon from '../../../svgs/basic/IconMoon';
import IconSun from '../../../svgs/basic/IconSun';
import IconMoonSun from '../../../svgs/basic/IconMoonSun';



const DivMore = styled(Div)`
	width: 100vw;
	height: calc(100vh - 51px);
	
	background-color: ${props => props.theme.COLOR_normal};
	
	position: fixed;
	top: 51px;
	left: 0;
	z-index: 100;
	
	
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`



const GroupNav = styled(Div)`
  
  height: 300px;
  
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`


const activeClassName = 'nav-link-active';


const NavLinkNavItem = styled(NavLink).attrs({ activeClassName })`
  width: 100%;
  height: 100px;
  
  margin-right: 10px;
  margin-left: 10px;
  
	color: ${props => props.theme.color_normal};
	font-weight: regular;
	
	text-decoration: none;
	text-align: center;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	&.${activeClassName} {
		color: ${props => props.theme.color_active};
		font-weight: bold;
	
	}
	
`

const GroupButton = styled(Div)`
  display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const ButtonLanguage = styled(Button)`
	font-size: 1rem;
	width: 70px;
	margin-left: 0px;
	margin-right: 5px;
	
	padding: 0;
`

const ButtonTheme = styled(Button)`
	width: 40px;
	margin-left: 5px;
	margin-right: 0px;
`



const checkActive = (regex) => {
    return regex.test(window.location.pathname);
}


// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const More = ({
	match, location
	
	, language
	, auth     // 변화 잘 감지하기 위해서, readyUser 만 따로 빼놓기!
	, loadingUser, readyUser
	
	, themeName
	, themeOption
	
	,replaceData, addDeleteNotification
	
	, replaceDataAuth, replaceData2Auth
	}) => {
	
	  const [cookies, setCookie, removeCookie] = useCookies(['logged', 'language', 'themeOption']);
	  
	  
	  const dictLanguage = {
  		en: "English"
  		, ko: "한국어"
  		, ja: "日本語"
  	}
  	
  	
  	const onClick_Language = (event, language) => {
  		if (language === "en") { 
  			replaceData("language", "ko");
  			removeCookie("language");
  			setCookie('language', 'ko',{maxAge: 60 * 60 * 24 * 30});
  		}
  		else if (language === "ko") { 
  			replaceData("language", "ja");
  			removeCookie("language");
  			setCookie('language', 'ja',{maxAge: 60 * 60 * 24 * 30});
  		}
  		else if (language === "ja") { 
  			replaceData("language", "en");
  			removeCookie("language");
  			setCookie('language', 'en',{maxAge: 60 * 60 * 24 * 30});
  		}
  	}
	  
	  const isDarkMode = () => {
  	  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  	    return true;
  	  }
  	  else {
  	    return false;
  	  }
  	}  
	
	
	const onClick_Theme = (event) => {
	
	  if (themeOption === "auto" ) {
	    removeCookie("themeOption");
    	setCookie('themeOption', 'light',{maxAge: 60 * 60 * 24 * 30});
    	replaceData("themeOption", 'light');
    	
      replaceData("themeName", 'light');
    }
    
	  else if (themeOption === 'light') { // 기존이 light 였으면 dark 로 변경
	    removeCookie("themeOption");
	  	setCookie('themeOption', 'dark',{maxAge: 60 * 60 * 24 * 30});
      replaceData("themeOption", 'dark');
      
      replaceData("themeName", 'dark');
    }
    
    else if (themeOption === "dark") { // 기존이 dark 였으면 auto 로 변경
      removeCookie("themeOption");
    	setCookie('themeOption', 'auto',{maxAge: 60 * 60 * 24 * 30});
    	replaceData("themeOption", 'auto');
    	
    	const themeNameNew = isDarkMode() ? 'dark' : 'light';
      replaceData("themeName", themeNameNew);
    }

	}
	
	
	const returnIconTheme = () => {
		
	  switch (themeOption) {
	    case 'light':
	      return <IconSun width={"32px"} height={"32px"} color={"color_very_weak"} />;
	    case 'dark':
	      return <IconMoon width={"25px"} height={"25px"} color={"color_very_weak"} />;
	    case 'auto':
	      return <IconMoonSun width={"36px"} height={"36px"} color={"color_very_weak"} />;
	    default:
	      return null;
	  }
	}
	
	
	const dictThemeOption = {
		en: "English"
		, ko: "한국어"
		, ja: "日本語"
	}
	
	
	return (
 
	
  <DivMore>
  
  <GroupNav>
  
		<NavLinkNavItem to="/" exact={true}> 
		{(() => {
      switch (language) {
        case 'ko': 
          return '홈';
        case 'ja': 
          return 'ホーム';
        default: // eng
          return 'Home';
      }
    })()} 
		</NavLinkNavItem> 

    
    <NavLinkNavItem to="/comp-gallery" isActive={()=>checkActive(/^(\/comp-gallery)/)} > 
		{(() => {
      switch (language) {
        case 'ko': 
          return '조합 갤러리';
        case 'ja': 
          return '構成ギャラリー';
        default: // eng
          return 'Comp Gallery';
      }
    })()} 
		</NavLinkNavItem> 


		<NavLinkNavItem to="/team-planner" isActive={()=>checkActive(/^(\/team-planner)/)} > 
		{(() => {
      switch (language) {
        case 'ko': 
          return '팀 나누기';
        case 'ja': 
          return 'チーム分け';
        default: // eng
          return 'Team Planner';
      }
    })()} 
     </NavLinkNavItem> 

    
  
  </GroupNav>
    
    
    <GroupButton>
      <ButtonLanguage onClick={(event) => onClick_Language(event, language)}> {dictLanguage[language]} </ButtonLanguage>
    
		  <ButtonTheme onClick={(event) => onClick_Theme(event)}> { returnIconTheme() } </ButtonTheme>
    </GroupButton>

	</DivMore>
	
	)
}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
    , themeOption: state.basic.themeOption

    
    , language: state.basic.language
 
    , auth: state.auth
    
    
    , loadingUser: state.basic.loading.user
    , readyUser: state.basic.ready.user
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
export default connect(mapStateToProps, mapDispatchToProps)(More);


