import React from 'react';
import styled from 'styled-components';

import { connect } from "react-redux";
import {replaceData} from "../redux/actions/basic";


import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';

import IconLogo from '../svgs/brand/IconLogo';
import IconSun from '../svgs/IconSun';
import IconMoon from '../svgs/IconMoon';


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

const DivLogo = styled(Div)`
	margin-top: 20px;
	margin-bottom: 10px;
	
	@media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  	display: none;
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
	
	}
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
const Sub = ({match, location, replaceData, themeName}) => {
	
	const onClick_Slider = (event) => {
		if (themeName === "light") {
			replaceData("themeName", "dark")
		}
		else {
			replaceData("themeName", "light")
		}
	}
	
	
	return (
 
	
  <DivSub>
  	
  	
  	<DivLogo>
  	
  	<IconLogo width={"50px"} height={"50px"} />
  	
  	</DivLogo>
  	
  	

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
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData: (which, newThemeName) => dispatch( replaceData(which, newThemeName) ) 
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