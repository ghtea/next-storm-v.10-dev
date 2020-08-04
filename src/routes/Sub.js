import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import * as config from '../config';

import { connect } from "react-redux";
import {replaceData} from "../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../redux/actions/auth";

import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import { NavLink } from 'react-router-dom';
import {Div, Button} from '../styles/DefaultStyles';

import IconLogo from '../svgs/brand/IconLogo';

import IconLoading from '../svgs/basic/IconLoading';
import IconLogIn from '../svgs/basic/IconLogIn';
import IconUser from '../svgs/basic/IconUser';


import IconSun from '../svgs/basic/IconSun';
import IconMoon from '../svgs/basic/IconMoon';

import storage from '../tools/vanilla/storage';


/*
	background-image: url("https://www.transparenttextures.com/patterns/worn-dots.png"), linear-gradient(-10deg, hsl(210,100%,33%) 50%, hsl(210,100%,25%) 100%);
	background-color: ${props => props.theme.COLOR_normal};
	background-color: #22a7f0;
	background-image: linear-gradient(-20deg, hsl(233,60%,50%) 50%,hsl(233,60%,45%) 100%);
	hsl(233,60%,50%) 
*/

// SubCompGallery 의 z-index 가 1

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
		
		width: calc( (100%-40px)*0.2 );
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
  
`;


const ContainerProfile = styled(Div)`
	height:100%;
	display: none;
	
	
	@media (min-width: ${props => props.theme.media.md}px ) {
  	display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
 
	
	& > * {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		
		& > * {
			margin-left: 3px;
			margin-right: 3px;
		}
		
	}
	
	& > a {
		color:  ${props => props.theme.color_normal };
		text-decoration: none;
		font-weight: bold;
	}
	
`

const DivIconProfile = styled(Div)`
	width: 40px;
	height: 40px;
`

const GroupNavItem = styled(Div)`
	width: auto;

`


const NavLinkStyled = styled(NavLink)`
	
`

const DivBattletag = styled(Div)`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	
	& > div {
		margin-left: 2px;
		margin-right: 2px;
	}
`

const DivBattletagName = styled(Div)`
	width: auto;
	
	font-size: 1rem;
	
	display: block;
	text-algin: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	
	
`
const DivBattletagNumber = styled(Div)`
	width: auto;
	padding-top: 1px;
	
	font-size: 0.8rem;
	
	display: block;
	text-algin: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`

const DivEmail = styled(Div)`
	width: 70px;
	
	font-size: 0.8rem;
	
	display: block;
	text-algin: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`




const DivNavItem = styled(Div)`
	
	height: 100%; 
  
  margin-right: 10px;
  margin-left: 10px;
	
	font-size: 1rem;
	/* line-height: 1rem; */

  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	 }
`;


const activeClassName = 'nav-link-active';

const NavLinkNavItem = styled(NavLink).attrs({ activeClassName })`
  width: auto;
  height: 100%;
  
  
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
		border-bottom: 2px solid ${props => props.theme.color_active};
	}
	
`;

const checkActive = (regex) => {
    
    return regex.test(window.location.pathname);
}




const GroupButton = styled(Div)`
	
`


const DivLanguage = styled(Div)`
	height: 36px;
	width: 36px;
	
	border-radius: 50%;
	border: 1px solid ${props => props.theme.color_very_weak};
	background-color: ${props => props.theme.COLOR_normal};
	
	cursor: pointer;
`

const DivTheme = styled(Div)`
	height: 36px;
	width: 36px;
	
	border-radius: 50%;
	border: 1px solid ${props => props.theme.color_very_weak};
	background-color: ${props => props.theme.COLOR_normal};
	
	cursor: pointer;
`

/*
const ContainerSlider = styled(Div)`

	position: relative;
	height: 30px;
	width: 72px;
	
	border-radius: 15px;
	
	background-color: ${props => props.theme.COLOR_bg};
`

const Slider = styled(Div)`
	
	position: absolute;
	
	top: -3px;
	left: 0px;
	
	height: 36px;
	width: 36px;
	
	border-radius: 50%;
	border: 1px solid ${props => props.theme.color_very_weak};
	background-color: ${props => props.theme.COLOR_normal};
	
	cursor: pointer;
	transition: transform 0.4s linear;
	transform: ${props => (props.theme.name === "light")? 'translateX(0)' : 'translateX(36px)'};
	
`
*/
//transform: ${ props => (props.themeName === "light")? 'translateX(0)' : 'translateX(36px)'};





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
	
	
	const onClick_Slider = (event) => {
		if (themeName === "light") {
			replaceData("themeName", "dark")
		}
		else {
			replaceData("themeName", "light")
		}
	}
	
	
	
	
	
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
	const onClick_LogIn = async (event) => {
		try {
		
			await axios.get (`${config.URL_API_NS}/auth/bnet`);
			
		}
		catch (error) {
			console.log("error in authorize")
		}
	}
	*/
	
	// <Button> <a href={`${config.URL_API_NS}/auth/bnet`}>Log In</a> </Button>
	return (
 
	
  <DivSub>
  	
  	
  	<ContainerProfile>
  	
  		{ ( function() {
        if (loadingUser) {
        	return (
        		<Div>
	        		<DivIconProfile> <IconLoading width={"25px"} height={"25px"} color={"color_weak"} /> </DivIconProfile>
	        		<Div> loading </Div>
	        	</Div>
        	);
      	}
      	else if (!loadingUser && !readyUser) {
        	return (
						<NavLinkStyled to="/auth/log-in" > 
							<DivIconProfile> <IconLogIn width={"25px"} height={"25px"} color={"color_weak"} /> </DivIconProfile>
							<Div> Log In </Div> 
						</NavLinkStyled> 

					);
      	}
      	else {
      		return (
  			<NavLinkStyled to="/" >
  					<DivIconProfile> <IconUser width={"40px"} height={"40px"} color={"color_weak"} /> </DivIconProfile>
  				{(auth.battletag)?
    				<DivBattletag> <DivBattletagName> {battletagName} </DivBattletagName> <DivBattletagNumber> {battletagNumber} </DivBattletagNumber> </DivBattletag> 
					: <DivEmail> {auth.email} </DivEmail>
  				}
  			</NavLinkStyled>
					)
      	}
      	
  		} )() }
  	
  	</ContainerProfile>
  	
  	
		<GroupNavItem>
			<DivNavItem > 
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
			</DivNavItem>
			
			<DivNavItem > 
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
		  </DivNavItem>
			
			
			<DivNavItem > 
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
			</DivNavItem>
		</GroupNavItem>
		
		
		
		
		
		<GroupButton>
			
			
			<Div> {language} </Div>
			
			<Div
				style= {{ transform: `${ props => (props.themeName === "dark")? 'translateX(0)' : 'translateX(36px)'}` }}
			>
				{
					(themeName === 'light')? <IconSun width={"25px"} height={"25px"} /> : <IconMoon width={"25px"} height={"25px"} /> 
				}
			</Div>
			
			
		</GroupButton>
		
	</DivSub>
	
	)
}

/*

<ContainerSlider onClick={onClick_Slider} >
				<Slider >
					
					<Div
						style= {{ transform: `${ props => (props.themeName === "dark")? 'translateX(0)' : 'translateX(36px)'}` }}
					>
						{
							(themeName === 'light')? <IconSun width={"25px"} height={"25px"} /> : <IconMoon width={"25px"} height={"25px"} /> 
						}
					</Div>
					
				</Slider>
			</ContainerSlider>

*/
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