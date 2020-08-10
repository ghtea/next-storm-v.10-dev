import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Media from 'react-media';

import * as config from '../../../config';

import { connect } from "react-redux";
import {replaceData} from "../../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../../redux/actions/auth";

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode';

import { NavLink } from 'react-router-dom';
import {Div, Button} from '../../../styles/DefaultStyles';



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
	
`;

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
	
	,replaceData, addDeleteNotification
	
	, replaceDataAuth, replaceData2Auth
	}) => {
	
	
	
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


	</DivMore>
	
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
export default connect(mapStateToProps, mapDispatchToProps)(More);


