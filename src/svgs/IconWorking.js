import React from 'react';
import styled, {keyframes} from 'styled-components';

import themes from "../styles/themes"
import { connect } from "react-redux";
import {Div} from '../styles/DefaultStyles';


// 100% { -moz-transform: rotate(360deg); }
const keyframesSpin = keyframes`
  0% { transform: rotate(-15deg); }
  
  50% { transform: rotate(75deg); }
 
  100% { transform: rotate(-15deg); }
`;

/*

0% { transform: rotate(0deg); }
  10% { transform: rotate(0deg); }
  20% { transform: rotate(0deg); }
  30% { transform: rotate(25deg); }
  40% { transform: rotate(50deg); }
  50% { transform: rotate(75deg); }
  60% { transform: rotate(50deg); }
  70% { transform: rotate(25deg); }
  80% { transform: rotate(0deg); }
  90% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }

*/



const DivContainer1 = styled(Div)`
	position: relative;
  
  animation: ${keyframesSpin} 1s linear infinite;
`;

const DivContainer2 = styled(Div)`
	position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  width: 100%;
  height: 100%;
`;


// size, w : h = 9 : 8
const IconWorking = ({width, height, themeName}) => {

	return (
		
	<DivContainer1 style= {{ width: `${width}`, height:`${height}` }} >
		<DivContainer2  >
		<svg 
			
			className="icon"
			xmlns="http://www.w3.org/2000/svg" 
			
			width="100%"
			height="100%"
			viewBox="0 0 576 512"
			
			fill={ themes[themeName]["color_very_weak"] }
			>
			
			<path
				d="M571.31 193.94l-22.63-22.63c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31-28.9-28.9c5.63-21.31.36-44.9-16.35-61.61l-45.25-45.25c-62.48-62.48-163.79-62.48-226.28 0l90.51 45.25v18.75c0 16.97 6.74 33.25 18.75 45.25l49.14 49.14c16.71 16.71 40.3 21.98 61.61 16.35l28.9 28.9-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63l22.63 22.63c6.25 6.25 16.38 6.25 22.63 0l90.51-90.51c6.23-6.24 6.23-16.37-.02-22.62zm-286.72-15.2c-3.7-3.7-6.84-7.79-9.85-11.95L19.64 404.96c-25.57 23.88-26.26 64.19-1.53 88.93s65.05 24.05 88.93-1.53l238.13-255.07c-3.96-2.91-7.9-5.87-11.44-9.41l-49.14-49.14z">
			</path>
			
		</svg>
		</DivContainer2 >
	</DivContainer1 >
	)
}


function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
  }; 
} 

/*
function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
  }; 
}
*/

export default connect(mapStateToProps)(IconWorking);


/*
normal stars

viewBox="0 0 512 512"
	<path 
				d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z">
				</path>
*/