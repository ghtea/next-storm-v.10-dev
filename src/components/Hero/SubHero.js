import React, {useEffect, useRef, useState} from 'react';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch, useLocation, useHistory } from 'react-router-dom';

import * as config from '../../config';


import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../../redux/actions/basic";

import {replaceDataHots, replaceData2Hots} from "../../redux/actions/hots";


import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import {Div, Input, Button, NavLinkDefault, Img} from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/basic/IconLoading';

import IconLayers from '../../svgs/basic/IconLayers';
import IconSearch from '../../svgs/basic/IconSearch';
//import IconUsers from '../../svgs/basic/IconUsers';
import * as imgHero from '../../images/heroes'


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
const DivFocusingHero = styled(Div)`
  background-color: ${props => props.theme.COLOR_normal};
  
  width: auto;
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    width: auto;
    margin-left: 6px;
  }
  
  & > div:first-child {
    margin-left: 0px;
  }
  
  & > div:last-child {
    margin-right: 12px;
  }
  
  
  
  /*hide text on mobile*/
	& > div:nth-child(2) {
	  display: none;
	}
	
	& > div:nth-child(3) {
	  /*border: 2px solid ${props => props.theme.color_weak};*/
    border-radius: 50%;
    width: 32px;
    height: 32px;
	}
	
  @media (min-width:  ${props => (props.theme.media.md) }px) {
  
    border: 1px solid ${props => props.theme.color_very_weak};
    border-radius: 20px;
    
    width: auto;
    
    & > div:nth-child(2) {
      display: flex;
	    font-size: 0.9rem;
	    margin-left: 4px;
    }
  }
  
`

const ImgHero = styled(Img)`
  border: 1px solid ${props => props.theme.color_weak};
  border-radius: 50%;
  
  object-fit: cover;
  width: 32px;
  height: 32px;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    width: 36px;
    height: 36px;
    object-fit: cover;
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
    border-radius: 20px;
    
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
	  
	}
	
	/*hide text on mobile*/
	& > div:nth-child(2) {
	  display: none;
	  
	  @media (min-width:  ${props => (props.theme.media.md) }px) {
	    display: flex;
	    font-size: 0.9rem;
	    margin-left: 4px;
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
  
  , listAllHeroBasic

  //, replaceAuthority
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  const location = useLocation();
  const history =  useHistory();
  
  const [toBuildStats, setToBuildStats] = useState("/hero/builds-stats");
  const [key_HeroesTalents, setKey_HeroesTalents] = useState("");
  const [nameHero, setNameHero] = useState("");
  
	useEffect(()=>{
	  if (focusingHero){
	    const focusingHeroEncoded = encodeURIComponent(focusingHero);
	    setToBuildStats ( `/hero/builds-stats/${focusingHeroEncoded}`);
	    
	    const tHeroBasic = listAllHeroBasic.find(element=>element._id === focusingHero);
	    console.log(tHeroBasic)
	    
	    setKey_HeroesTalents(tHeroBasic['key_HeroesTalents']);
	    
	    setNameHero(tHeroBasic['translations'][language]);
	  }
	}, [focusingHero, language])
	

  console.log(nameHero)
  
   return (
     
    <DivSubHero> 
      
      { focusingHero !=="" &&
        (<DivFocusingHero>  
        
          <Div> <ImgHero src={imgHero[key_HeroesTalents]} /> </Div>
          <Div> {nameHero} </Div>
          <Div
            onClick={event=>{history.push('/hero/builds-stats')}}
            > 
            <IconSearch width={"18px"} height={"18px"} color={( ( /(\/hero\/builds-stats)$/ ).test(window.location.pathname))? "color_active" : "color_weak"} /> 
          </Div>
          
        </DivFocusingHero>)
      }
     
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
      
      
      

    
    </DivSubHero> 
    
    )
}

/*
<Div> 
				  {(() => {
            switch (language) {
              case 'ko': 
                return '선택';
              case 'ja': 
                return '選択';
              default: // eng
                return 'Choose';
            }
          })()}  
        </Div> 
*/

function mapStateToProps(state) { 
  return { 
    user: state.auth.user
    , language: state.basic.language
    
    , readyUser: state.basic.ready.user
    
    , focusingHero: state.hero.focusingHero
    , listAllHeroBasic: state.hots.listAllHeroBasic
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

