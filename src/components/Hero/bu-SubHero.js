import React, {useEffect, useRef, useState} from 'react';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch, useLocation } from 'react-router-dom';

import * as config from '../../config';


import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../../redux/actions/basic";

import {replaceDataHots, replaceData2Hots} from "../../redux/actions/hots";


import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import {Div, Input, Button, NavLinkDefault} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/basic/IconLoading';

import IconLayers from '../../svgs/basic/IconLayers';
import IconSearch from '../../svgs/basic/IconSearch';
//import IconUsers from '../../svgs/basic/IconUsers';


const DivSubHero = styled(Div)`
  position: fixed;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  z-index: 10;
  
  top: 50px;
  width: 100%;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    background-color: transparent;
    border: none;
    
    top: 70px;
    width: auto;
    
    & > div:nth-child(n+2){
      margin-left: 10px;
    }
  }
`


const DivSubHeroMain = styled(Div)`

  
  
  color: ${props => props.theme.color_normal};
  
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  width: auto;
  height: 40px; 
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
  
    background-color: ${props => props.theme.COLOR_normal};
    border: 1px solid ${props => props.theme.color_very_weak};
    border-radius: 25px;
    
    width: auto;
  }
  
`


const DivSubHeroSub = styled(Div)`

  
  border: 2px solid ${props => props.active? props.theme.color_active : props.theme.color_weak};
  border-radius: 16px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  width: auto;
  height: 32px; 
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
  }
  
`

const activeClassName = 'nav-link-active';


const NavLinkStyled = styled(NavLinkDefault).attrs({ activeClassName })`
  
  font-size: 1rem;
  
  width: auto;
  
  margin-left: 8px;
  margin-right: 8px;
  
  &:first-child { margin-left: 16px; }
  &:last-child { margin-right: 16px; }
  
  color: ${props => props.theme.color_weak};
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
	
	
	&.${activeClassName} {
		color: ${props => props.theme.color_active};
		font-weight: bold;
	}
	
	
	& > div {
	  width: auto;
	  margin-left: 3px;
    margin-right: 3px;
    
	}
	
	/*hide text on mobile*/
	& > div:nth-child(2) {
	  display: none;
	  
	  @media (min-width:  ${props => (props.theme.media.md) }px) {
	    display: flex;
	    font-size: 0.9rem;
	  }
	}
	
`;



const checkActive = (regex) => {
  return regex.test(window.location.pathname);
}





const SubHero = ({
  
  
  
  authority, language
 
  , user
  , readyUser
  
  
  
  , focusingHero

  //, replaceAuthority
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  const location = useLocation();
  
  
  const [toBuildStats, setToBuildStats] = useState("/hero/builds-stats");
	useEffect(()=>{
	  if (focusingHero){
	    const focusingHeroEncoded = encodeURIComponent(focusingHero);
	    setToBuildStats ( `/hero/builds-stats/${focusingHeroEncoded}`);
	  }
	}, [focusingHero])
	

  
  
   return (
     
    <DivSubHero> 
     
      <DivSubHeroMain>
  		  
  		  <NavLinkStyled to={toBuildStats} isActive={()=>checkActive(/^(\/hero\/builds-stats)/)} 
  		    onClick={(event=>{replaceData2("ready", "heroBuildsStats", false);})}
  		  > 
          <IconLayers width={"22px"} height={"22px"} color={((/^(\/hero\/builds-stats)/).test(window.location.pathname))? "color_active" : "color_very_weak"} />
  				<Div> 
  				  {(() => {
              switch (language) {
                case 'ko': 
                  return '빌드';
                case 'ja': 
                  return 'ビルド';
                default: // eng
                  return 'Builds';
              }
            })()}  
          </Div> 
  			</NavLinkStyled>  
  			
      </DivSubHeroMain>
      
      
      <DivSubHeroSub active={( ( /(\/hero\/builds-stats)$/ ).test(window.location.pathname))} > 
      
      <NavLinkStyled to={'/hero/builds-stats'} isActive={()=>checkActive(/(\/hero\/builds-stats)$/)} 
  		  > 
        
        <IconSearch width={"18px"} height={"18px"} color={( ( /(\/hero\/builds-stats)$/ ).test(window.location.pathname))? "color_active" : "color_weak"} />
				<Div> 
				  {(() => {
            switch (language) {
              case 'ko': 
                return '영웅 선택';
              case 'ja': 
                return 'ヒーロー選択';
              default: // eng
                return 'Choose Hero';
            }
          })()}  
        </Div> 
          
  			</NavLinkStyled>  
  		</DivSubHeroSub>

    
    </DivSubHero> 
    
    )
}


function mapStateToProps(state) { 
  return { 
    user: state.auth.user
    , language: state.basic.language
    
    , readyUser: state.basic.ready.user
    
    , focusingHero: state.hero.focusingHero
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
  
    replaceDataHots : (which, replacement) => dispatch(replaceDataHots(which, replacement))
    ,replaceData2Hots : (which1, which2, replacement) => dispatch(replaceData2Hots(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(SubHero);

