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

import { NavLink, useLocation  } from 'react-router-dom';
import {Div, Button} from '../../styles/DefaultStyles';

import IconBars from '../../svgs/basic/IconBars';

import More from './Button_Md/More'


const DivButton_Md= styled(Div)`

	height:100%;
	margin: 0;
		
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
	width: 32px; /*  icon */

	
	
	
`;


// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const Button_Md = ({
  
	match
	
	, language
	, auth     // 변화 잘 감지하기 위해서, readyUser 만 따로 빼놓기!
	//, loadingUser, readyUser
	
	, themeName
	
	}) => {
	
	const [showingMore, setShowingMore] = useState(false);
	
	const onClick_More = (event) => {
		setShowingMore(!showingMore);
	}
	
	
	
	return (
 
	
  <DivButton_Md onClick={onClick_More}>
    
    <IconBars width={"28px"} height={"28px"} color={"color_weak"} />
    
		{ showingMore && <More/>}
		 
	</DivButton_Md>
	
	
	
	)
}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
    , language: state.basic.language
 
    , auth: state.auth
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Button_Md);


