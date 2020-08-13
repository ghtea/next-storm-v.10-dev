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
import storage from '../tools/vanilla/storage';

import ProfileMd_ from '../components/Sub/ProfileMd_';
import Profile_Md from '../components/Sub/Profile_Md';

import NavMd_ from '../components/Sub/NavMd_';
import Nav_Md from '../components/Sub/Nav_Md';

import Button_Md from '../components/Sub/Button_Md';
import ButtonMd_ from '../components/Sub/ButtonMd_';


const DivSub = styled(Div)`
	
	background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_strong};
  

  z-index: 200; 
  
  position: fixed;
  top: 0px;
  left:0px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  
  width: 100%;
	min-width: 360px;
	height: 50px; 
  
  
	@media (min-width:  ${props => (props.theme.media.md) }px) {
	  height: 60px; 
	}
  
 `




const DivSub_Md = styled(Div)`
	width: 100%;
	
	display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
	@media (min-width:  ${props => (props.theme.media.md) }px) {
	  display: none;
	}
`

const DivSubMd_ = styled(Div)`
	display: none;
  
	@media (min-width:  ${props => (props.theme.media.md) }px) {
		width: 100%;
		
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	}
`


// small
const DivProfile_Md = styled(Div)`
	margin-left: 10px;
	
	width: 40px;
`
const DivNav_Md = styled(Div)`
	
	width: calc(100% - 80px - 20px);
`
const DivButton_Md = styled(Div)`

	margin-right: 10px;
	
	width: 40px;
`


// big
const DivProfileMd_ = styled(Div)`
	margin-left: 10px;

	width: 150px;
`
const DivNavMd_ = styled(Div)`
	
	width: calc(100% - 300px - 20px); /* minus(-) needs space around it !!!  ex: -20px not work... */
`
// 전체가 360 ~ 768 이니깐
// 240 ~ 648

const DivButtonMd_ = styled(Div)`
	
	margin-right: 10px;
	
	width: 150px;
`



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
	
	
	return (
 
	
  <DivSub>
  	
  	<DivSub_Md>
	  	<DivProfile_Md> <Profile_Md/> </DivProfile_Md>
	  	<DivNav_Md> <Nav_Md/> </DivNav_Md>
	  	<DivButton_Md> <Button_Md/> </DivButton_Md>
  	</DivSub_Md>
  	
  	<DivSubMd_>
	  	<DivProfileMd_> <ProfileMd_/> </DivProfileMd_>
	  	<DivNavMd_>  <NavMd_/> </DivNavMd_>
	  	<DivButtonMd_> <ButtonMd_/> </DivButtonMd_>
	  </DivSubMd_>
		
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
