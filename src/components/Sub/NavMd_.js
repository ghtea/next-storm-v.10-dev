import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Media from 'react-media';

import * as config from '../../config';

import { connect } from "react-redux";
import {replaceData, replaceData2} from "../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../redux/actions/auth";

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import { NavLink } from 'react-router-dom';
import {Div, Button} from '../../styles/DefaultStyles';



const DivNavMd_ = styled(Div)`
	width: auto;
	
	margin: 0;
	
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`




const activeClassName = 'nav-link-active';


const NavLinkNavItem = styled(NavLink).attrs({ activeClassName })`
  width: auto;
  height: 100%;
  
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
  
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;


	&.${activeClassName} {
		color: ${props => props.theme.color_active};
		font-weight: bold;
		border-bottom: 2px solid ${props => props.theme.color_active};
		
	}
	
`;

const checkActive = (regex) => {
    return regex.test(window.location.pathname);
}


// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const NavMd_ = ({
	match, location
	
	, language
	 
	, user
	, readyUser
	
	, focusingHero
	
	, themeName
	
	,replaceData, replaceData2
	, addDeleteNotification
	
	, replaceDataAuth, replaceData2Auth
	}) => {
	
	
	const [toPlayerGeneral, setToPlayerGeneral] = useState("/player/general/undefined");
	useEffect(()=>{
	  if (readyUser && user.battletag){
	    //replaceData2('ready', 'playerGeneralShowing', false);
	    setToPlayerGeneral ( `/player/general/${encodeURIComponent(user.battletag)}`);
	  }
	}, [readyUser])
	
	
	const [toHero, setToHero] = useState("/hero/builds-stats");
	useEffect(()=>{
	  if ( focusingHero !== "" ){
	    const focusingHeroEncoded = encodeURIComponent(focusingHero);
	    setToHero ( `/hero/builds-stats/${focusingHeroEncoded}`);
	  }
	  else {
	    setToHero ( `/hero/builds-stats`);
	  }
	}, [focusingHero])
	
	
	
	return (
 
	
  <DivNavMd_>
  

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
    
		
		<NavLinkNavItem to={toPlayerGeneral} isActive={()=>checkActive(/^(\/player)/)} > 
		{(() => {
      switch (language) {
        case 'ko': 
          return '플레이어';
        case 'ja': 
          return 'プレーヤー';
        default: // eng
          return 'Player';
      }
    })()} 
		</NavLinkNavItem> 
		
		
		<NavLinkNavItem to={toHero} isActive={()=>checkActive(/^(\/hero)/)} > 
		{(() => {
      switch (language) {
        case 'ko': 
          return '영웅';
        case 'ja': 
          return 'ヒーロー';
        default: // eng
          return 'Hero';
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
	

	</DivNavMd_>
	
	)
}


/*

    {(readyUser) &&
      <NavLinkNavItem to="/my" isActive={()=>checkActive(/^(\/my)/)} > 
  		{(() => {
        switch (language) {
          case 'ko': 
            return '나';
          case 'ja': 
            return '私';
          default: // eng
            return 'My';
        }
      })()} 
  		</NavLinkNavItem> 
    }
		
*/

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
    , language: state.basic.language
 
    , user: state.auth.user
    
    , readyUser: state.basic.ready.user
    
    , focusingHero: state.hero.focusingHero
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData: (which, newThemeName) => dispatch( replaceData(which, newThemeName) ) 
    , replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
    , replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    , replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(NavMd_);


