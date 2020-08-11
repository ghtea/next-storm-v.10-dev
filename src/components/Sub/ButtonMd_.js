import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Media from 'react-media';

import * as config from '../../config';

import { useCookies } from 'react-cookie';

import { connect } from "react-redux";
import {replaceData, replaceData2} from "../../redux/actions/basic";

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import { NavLink, useLocation  } from 'react-router-dom';
import {Div, Button, LinkDefault} from '../../styles/DefaultStyles';

import IconBars from '../../svgs/basic/IconBars';

import IconMoon from '../../svgs/basic/IconMoon';
import IconSun from '../../svgs/basic/IconSun';
import IconMoonSun from '../../svgs/basic/IconMoonSun';



const DivButtonMd_= styled(Div)`

	height:100%;
	margin-left: 10px; 
	margin-right: 10px;
		
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
	width: 120px; 
	
`;

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

// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const ButtonMd_ = ({
  
	match
	
	, language
	, auth     // 변화 잘 감지하기 위해서, readyUser 만 따로 빼놓기!
	//, loadingUser, readyUser
	
	, themeName
	, themeOption
	
	, replaceData
	, replaceData2
	
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
			setCookie('language', 'ko',{maxAge: 60 * 60 * 24 * 30});
		}
		else if (language === "ko") { 
			replaceData("language", "ja");
			setCookie('language', 'ja',{maxAge: 60 * 60 * 24 * 30});
		}
		else if (language === "ja") { 
			replaceData("language", "en");
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
    	setCookie('themeOption', 'light',{maxAge: 60 * 60 * 24 * 30});
    	replaceData("themeOption", 'light');
    	
      replaceData("themeName", 'light');
    }
    
	  else if (themeOption === 'light') { // 기존이 light 였으면 dark 로 변경
	  	setCookie('themeOption', 'dark',{maxAge: 60 * 60 * 24 * 30});
      replaceData("themeOption", 'dark');
      
      replaceData("themeName", 'dark');
    }
    
    else if (themeOption === "dark") { // 기존이 dark 였으면 auto 로 변경
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
 
	
  <DivButtonMd_>
    
    <ButtonLanguage onClick={(event) => onClick_Language(event, language)}> {dictLanguage[language]} </ButtonLanguage>
    
		<ButtonTheme onClick={(event) => onClick_Theme(event)}> { returnIconTheme() } </ButtonTheme>
		
	</DivButtonMd_>
	
	)
}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
    , themeOption: state.basic.themeOption
    
    , language: state.basic.language
 
    , auth: state.auth
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData: (which, newThemeName) => dispatch( replaceData(which, newThemeName) ) 
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(ButtonMd_);


