import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

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

import IconUserCircleRegular from '../../svgs/basic/IconUserCircleRegular';


import IconVideo from '../../svgs/basic/IconVideo';
import IconComment from '../../svgs/basic/IconComment';

import IconSetting from '../../svgs/basic/IconSetting';
import IconCabinetRegular from '../../svgs/basic/IconCabinetRegular';
import IconList from '../../svgs/basic/IconList';
import IconEye from '../../svgs/basic/IconEye';
import IconEdit from '../../svgs/basic/IconEdit';

const DivSubMy = styled(Div)`

  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  color: ${props => props.theme.color_normal};
  
  
  position: fixed;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  z-index: 10;
  
  top: 50px;
  
  width: 100%;
  /*max-width: 360px;*/
  
  height: 40px; 
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    top: 70px;
    width: auto;
    
    border: 1px solid ${props => props.theme.color_very_weak};
    
    border-radius: 25px;
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





const SubMy = ({
  
  
  
  authority, language
 
  
  //, replaceAuthority
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  const location = useLocation();
  
   return (
     
    <DivSubMy>
		  
		  <NavLinkStyled to="/my" exact={true}>
        <IconCabinetRegular width={"24px"} height={"24px"} color={(location.pathname==="/my")?"color_active": "color_very_weak"} />
				<Div> 
				  {(() => {
            switch (language) {
              case 'ko': 
                return '보관함';
              case 'ja': 
                return 'ライブラリー';
              default: // eng
                return 'Library';
            }
          })()}  
        </Div> 
			</NavLinkStyled> 
		  
		  <NavLinkStyled to="/my/profiles" isActive={()=>checkActive(/^(\/my\/profiles)/)} > 
        <IconUserCircleRegular width={"26px"} height={"26px"} color={(location.pathname==="/my/profiles")?"color_active": "color_very_weak"} />
				<Div> 
				  {(() => {
            switch (language) {
              case 'ko': 
                return '프로필';
              case 'ja': 
                return 'プロフィール';
              default: // eng
                return 'Profiles';
            }
          })()}  
				</Div> 
			</NavLinkStyled> 
			
			<NavLinkStyled to="/my/setting" isActive={()=>checkActive(/^(\/my\/setting)/)} > 
        <IconSetting width={"22px"} height={"22px"} color={(location.pathname==="/my/setting")?"color_active": "color_very_weak"} />
				<Div> 
				  {(() => {
            switch (language) {
              case 'ko': 
                return '설정';
              case 'ja': 
                return '設定';
              default: // eng
                return 'Setting';
            }
          })()}   
				</Div> 
			</NavLinkStyled> 
			
    </DivSubMy>
      
    )
}


function mapStateToProps(state) { 
  return { 
    user: state.auth.user
    , language: state.basic.language
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
export default connect(mapStateToProps, mapDispatchToProps)(SubMy);

