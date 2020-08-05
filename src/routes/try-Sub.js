import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Media from 'react-media';

import * as config from '../config';

import { connect } from "react-redux";
import {replaceData} from "../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../redux/actions/auth";

import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import { NavLink } from 'react-router-dom';
import {Div, Button} from '../styles/DefaultStyles';
import themes from '../styles/themes';

import Md from "../components/Sub/Md";
import Lg from "../components/Sub/Lg";


const DivSub = styled(Div)`
	
	background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_strong};
  

  z-index: 100; 
  
  position: fixed;
  top: 0px;
  left:0px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  /* mobile first, 360~*/
  width: 100%;
	min-width: 360px;
	height: 50px; 
  
  
	@media (min-width:  ${props => (props.theme.media.md) }px) {
	  height: 60px; 
	}
	
	
	/* https://techbug.tistory.com/215 */
	& > *:nth-child(1) { 
		margin-left: 10px; 
		margin-right: 5px;
		
		width: 40px; /* only icon */
	}
	
	& > *:nth-child(2) { 
		margin-left: 5px; 
		margin-right: 5px;
		width: calc((100%-40px)*0.4);
	}
	
	
	& > *:nth-child(3) { 
		margin-left: 5px; 
		margin-right: 10px; 
		width: calc((100%-40px)*0.2);
	}
  
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
  
	  & > *:nth-child(1) {
			width: 40px; /* only icon */
	  }
	  
	}
`;




// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const Sub = ({
	match, location
	
	, language
	, auth     // 변화 잘 감지하기 위해서, readyUser 만 따로 빼놓기!
	, loadingUser, readyUser
	
	, themeName
	
	,replaceData, addDeleteNotification
	
	, replaceDataAuth, replaceData2Auth
	}) => {
	
	
	const [battletagName, setBattletagName] = useState("");
	const [battletagNumber, setBattletagNumber] = useState("");
	
	useEffect(()=>{
		if(readyUser === true && auth.battletag) {
			// 배틀태그를 아직 인증하지 않은 경우도 생각해야 한다. (그 경우 auth.battletag ="")
			
			const regexBattletag = /(#\d*)$/;
		  const listNumberBattletag = auth.battletag.match(regexBattletag);
		  
		  const battletagNameTemp = auth.battletag.replace(regexBattletag, "");
		  const battletagNumberTemp = listNumberBattletag[0];
		  
		  setBattletagName(battletagNameTemp)
		  setBattletagNumber(battletagNumberTemp)
		  //console.log(battletagName, battletagNumber);
		}
	}, [readyUser])
	
	
	/*
	sm: `(max-width: ${themes[themeName].media.sm -1}px)`
      ,md: `(min-width: ${themes[themeName].media.sm}px) and (max-width: ${themes[themeName].media.md - 1}px)`
      ,lg: `(min-width: ${themes[themeName].media.md}px)`
	*/
	return (
 
	
  <DivSub>
  	
	  <Media queries={{
      md: `(max-width: ${themes[themeName].media.md - 1}px)`
      ,lg: `(min-width: ${themes[themeName].media.md}px)`
    }}>
      {m => (
        <>
          {m.md && <Md/>}
          {m.lg && <Lg/>}
        </>
      )
      }
    </Media>

	</DivSub>
	
	)
}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
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
export default connect(mapStateToProps, mapDispatchToProps)(Sub);


/*
<DivTitle>
  		PARALLEL STORM
  	</DivTitle>
*/

/*

	<DivNavItem > <NavLinkNavItem to="/team-generator" 
										isActive={(location) => (location.pathname).match(/^(\/team-generator)/) }
									> Team Generator </NavLinkNavItem> </DivNavItem>
*/






// with logo images

/*
const DivLogo = styled(Div)`

  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  	width: 120px;
		heigth: 100%;
	
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
 
 @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	width: 100px;
	heigth: 250px;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	margin-top: 50px;
	margin-bottom:100px;
	
 }
`;

const DivLogoImg = styled(Div)`
	border-radius: 50%;
	
	@media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
		width: 40px;
		height: 40px;
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
		width: 80px;
		height: 80px;
	}
`;

const ImgLogo = styled.img`
	border-radius: 50%;
`

const DivLogoText = styled(Div)`
	height: 50px;
	text-align: center;
	
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  	display: none;
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	
	}
`;
*/


/*

<DivLogo>
	<DivLogoImg> 
	
		<ImgLogo src="" width="100%" height="100%" /> 
	</DivLogoImg>
	
	<DivLogoText> 
		Parallel Storm
	</DivLogoText> 
</DivLogo>
  	
*/