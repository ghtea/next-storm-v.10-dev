import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import * as config from '../config';

import { connect } from "react-redux";
import {replaceData} from "../redux/actions/basic";
import addRemoveNotification from "../redux/thunks/addRemoveNotification";
import {replaceDataAuth, replaceData2Auth} from "../redux/actions/auth";



import { NavLink } from 'react-router-dom';
import {Div, Button} from '../styles/DefaultStyles';

import IconLogo from '../svgs/brand/IconLogo';
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
  
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  
  	width: 100%;
  	min-width: 360px;
  	height: 50px; 
  	
  	flex-direction: row;
  	border-bottom: 1px solid ${props => props.theme.color_very_weak};
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
		width: 120px;
	  height: 100%;
	 
		flex-direction: column;
		justify-content: flex-start;
		
		border-right: 1px solid ${props => props.theme.color_very_weak};
	 }
  
`;

const DivProfileContainer = styled(Div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
		
	@media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  	display: none;
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
		margin-top: 20px;
		margin-bottom: 10px;
	
		width: 80px;
		height: 80px;
		
	}
`

const DivProfileLoading = styled(Div)`
	
	background-color: ${props => props.theme.color_very_weak};
	
	width: 100%;
	height: 100%;
	border-radius: 50%;
	
	& div {
		color: ${props => props.theme.COLOR_normal};
		
		width: auto;
		height: auto;
		margin-top: 2px;
		margin-bottom: 2px;
	}
`


const DivProfileLoggedOut = styled(Div)`
	
	background-color: ${props => props.theme.color_very_weak};
	
	width: 100%;
	height: 100%;
	border-radius: 50%;
	
	& a {
		text-decoration: none;
		
		width: 100%;
		height: 100%;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	& a > div {
		color: ${props => props.theme.COLOR_normal};
		text-decoration: none;
		
		width: auto;
		height: auto;
		margin-top: 2px;
		margin-bottom: 2px;
	}
`

const DivProfileLoggedIn = styled(Div)`
	
	background-color: ${props => props.theme.color_very_weak};
	
	width: 100%;
	height: 100%;
	border-radius: 50%;
	
	& a {
		text-decoration: none;
		
		width: 100%;
		height: 100%;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	& a > div { 
		color: ${props => props.theme.COLOR_normal};

	}
`

const NavLinkStyled = styled(NavLink)`
	
`

const DivBattletagName = styled(Div)`
	width: auto;
	
	font-size: 1rem;
	margin-bottom: 0px;
	
	display: block;
	text-algin: left;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`
const DivBattletagNumber = styled(Div)`
	width: auto;
	
	font-size: 0.8rem;
	margin-top: 0px;
	
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

/*
const DivTitle = styled(Div)`
	
	height: 160px;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	text-align: center;
	font-size: 1.3rem;
	font-family: 'Noto Sans KR', 'Noto Sans JP', sans-serif;
	font-weight: medium;
	
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  	display: none;
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	
	}
`
*/


const DivNavItem = styled(Div)`
	
	width:100%;
	height: auto; 
	
	padding-top: 5px;
  padding-bottom: 5px;
  
  margin-top: 5px;
  margin-bottom: 5px;
	
	
	font-size: 1.1rem;
	line-height: 1.1rem;

  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	 }
`;


const activeClassName = 'nav-link-active';

const NavLinkNavItem = styled(NavLink).attrs({ activeClassName })`
  width: 90%;
  height: auto;
  
  
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
		font-weight: medium;
	}
	
`;

const checkActive = (regex) => {
    
    return regex.test(window.location.pathname);
}


const DivButtonToggleMode = styled(Div)`
	height: 120px;
`

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
//transform: ${ props => (props.themeName === "light")? 'translateX(0)' : 'translateX(36px)'};





// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const Sub = ({
	match, location
	
	, statusAuth, auth     // 변화 잘 감지하기 위해서, statusAuth 만 따로 빼놓기!
	, loadingUser, readyUser
	
	, themeName
	
	,replaceData, addRemoveNotification
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
  	
  	
  	<DivProfileContainer>
  	
  		{ ( function() {
        if (loadingUser) {
        	return (
        		<DivProfileLoading> 
        			<Div> loading </Div>
        		</DivProfileLoading>
        	);
      	}
      	else if (!loadingUser && !readyUser) {
        	return (
	        	<DivProfileLoggedOut>
							<NavLinkStyled to="/auth/log-in" > 
								<Div> Log In </Div> 
							</NavLinkStyled> 
						</DivProfileLoggedOut>
					);
      	}
      	else {
      		return (
	      		<DivProfileLoggedIn>
	      			<NavLinkStyled to="/" >
	      				{(auth.battletag)?
	      					<>
			      				<DivBattletagName> {battletagName} </DivBattletagName>
										<DivBattletagNumber> {battletagNumber} </DivBattletagNumber>
									</>
									: <DivEmail> {auth.email} </DivEmail>
	      				}
	      			</NavLinkStyled>
						</DivProfileLoggedIn>
					)
      	}
      	
  		} )() }
  	
  	</DivProfileContainer>
  	
  	

		<DivNavItem > <NavLinkNavItem to="/" exact={true}> Home </NavLinkNavItem> </DivNavItem>
		
		<DivNavItem > <NavLinkNavItem to="/team-generator" isActive={()=>checkActive(/^(\/team-generator)/)} > Team Generator </NavLinkNavItem> </DivNavItem>
		<DivNavItem > <NavLinkNavItem to="/comp-gallery" isActive={()=>checkActive(/^(\/comp-gallery)/)} > Comp Gallery </NavLinkNavItem> </DivNavItem>
		
		
		
		<DivButtonToggleMode>
		
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
			
		</DivButtonToggleMode>
		
	</DivSub>
	
	)
}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
    , statusAuth: state.auth.status
    , auth: state.auth
    
    , loadingUser: state.basic.loading.user
    , readyUser: state.basic.ready.user
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData: (which, newThemeName) => dispatch( replaceData(which, newThemeName) ) 
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
    
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