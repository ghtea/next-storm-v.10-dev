import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Media from 'react-media';

import * as config from '../../config';

import { connect } from "react-redux";
import {replaceData} from "../../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../../redux/actions/auth";

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode';

import { NavLink, useHistory } from 'react-router-dom';
import themes from "../../styles/themes"
import {Div, Button, A, NavLinkDefault} from '../../styles/DefaultStyles';

import Profile from '../_/Profile';

import ProfileIcon from "../_/Profile/ProfileIcon";

import IconLoading from '../../svgs/basic/IconLoading';
import IconLogIn from '../../svgs/basic/IconLogIn';




const DivProfileMd_ = styled(Div)`
	
	height:100%;
	margin: 0;
		
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	
	width: 120px; /*  icon + text */
	
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
		width: auto;
	  height: 100%;
	  
	  
		color: ${props => props.theme.color_normal};
		font-weight: regular;
		
		text-decoration: none;
		text-align: center;
		
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	
		color:  ${props => props.theme.color_normal };
		text-decoration: none;
		font-weight: bold;
	}
	
	/* 글자도 표시 */
	& > * > *:nth-child(2) {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	
`


const DivIconCommon = styled(Div)`
  
  width: 40px;
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`

const DivProfileIcon = styled(Div)`
  
  width: ${props => props.size};
  height: ${props => props.size};
  
  border-radius: 6px; 
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`

const DivCommon = styled(Div)`
	width:auto;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
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

const DivApplyBattletag = styled(Div)`
	cursor: pointer;
	font-weight: normal;
	text-decoration: underline;l
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


const NavLinkStyled = styled(NavLinkDefault)`
  display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	
	cursor: pointer;
	width: auto;
`;




// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const ProfileMd_ = ({
	match, location
	
	, language
	, user     // 변화 잘 감지하기 위해서, readyUser 만 따로 빼놓기!
	, loadingUser, readyUser
	
	, themeName
	
	,replaceData, addDeleteNotification
	
	, replaceDataAuth, replaceData2Auth
	}) => {
	
	const history = useHistory();
	
	const [battletagName, setBattletagName] = useState("");
	const [battletagNumber, setBattletagNumber] = useState("");
 
	
	useEffect(()=>{
		if(readyUser === true && user.battletag) {
			// 배틀태그를 아직 인증하지 않은 경우도 생각해야 한다. (그 경우 user.battletag ="")
			
			const regexBattletag = /(#\d*)$/;
		  const listNumberBattletag = user.battletag.match(regexBattletag);
		  
		  const battletagNameTemp = user.battletag.replace(regexBattletag, "");
		  const battletagNumberTemp = listNumberBattletag[0];
		  
		  setBattletagName(battletagNameTemp)
		  setBattletagNumber(battletagNumberTemp)
		  //console.log(battletagName, battletagNumber);
		}
	}, [readyUser])
	

	return (
 
	
  <DivProfileMd_>

  	
		{ ( function() {
      if (loadingUser) {
      	return (
      		<A>
        		<DivIconCommon> <IconLoading width={"25px"} height={"25px"} color={"color_weak"} /> </DivIconCommon>
        		<DivCommon> loading </DivCommon>
        	</A>
      	);
    	}
    	else if (!loadingUser && !readyUser) {
      	return (
					<NavLinkStyled to="/auth/log-in" > 
						<DivIconCommon> <IconLogIn width={"25px"} height={"25px"} color={"color_weak"} /> </DivIconCommon>
						<DivCommon> Log In </DivCommon> 
					</NavLinkStyled> 

				);
    	}
    	else {
    		
    		return (
			<NavLinkStyled to={(readyUser && !user.battletag)? '/auth/apply-battletag' : '/'  } >
			
					<DivProfileIcon size={"40px"} > 
						<ProfileIcon 
              width = { "34px" } height = { "34px" } 
              shape={user.profile.listIdShape[0]} 
              palette={user.profile.listIdPalette[0]} 
              badge={user.profile.listIdBadge[0]} 
            />
          </DivProfileIcon>
          
				{(user.battletag)&& <DivBattletag> <DivBattletagName> {battletagName} </DivBattletagName> <DivBattletagNumber> {battletagNumber} </DivBattletagNumber> </DivBattletag>  }
				{(!user.battletag) && <DivApplyBattletag >  {(() => {
              switch (language) {
                case 'ko': 
                  return '배틀태그를 등록하세요!';
                case 'ja': 
                  return 'バトルタグを登録してください！';
                default: // eng
                  return 'register battletag!'
              }
            })()}  </DivApplyBattletag>   }
			</NavLinkStyled>
				)
    	}
    	
		} )() }
  	
		
	</DivProfileMd_>
	
	)
}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
    , language: state.basic.language
    
    , user: state.auth.user
    

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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileMd_);

