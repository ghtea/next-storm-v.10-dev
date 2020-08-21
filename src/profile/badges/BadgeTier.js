import React from 'react';
import styled from 'styled-components';

import themes from "../../styles/themes"
import { connect } from "react-redux";

import {Div} from '../../styles/DefaultStyles';
import palettesTier from '../../styles/palettes/tier'




const DivContainer = styled(Div)`
	position: absolute;
	left: 50%;
	top: 50%;
	
	width: ${props=>props.width};
	height: ${props=>props.height};
`;



// badge-solid

// fill={ themes[themeName][color] }


// 당분간 보류 ㅠㅠ
const BadgeTier = ({
	width, height, badge
	, themeName
	
}) => {
	
	
	const tier = badge;
	console.log(tier)
	
	return (
		
	<DivContainer  width={width} height={height} >
		<svg 
			className="icon"
			xmlns="http://www.w3.org/2000/svg" 
			
			width="100%"
			height="100%"
			viewBox="0 0 512 512"
			>
			
			<defs>
				<linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
	        <stop offset="0%" stopColor={palettesTier[tier][0]}/>
	        <stop offset="50%" stopColor={palettesTier[tier][1]}/>
	        <stop offset="100%" stopColor={palettesTier[tier][2]}/>
	     </linearGradient>
	    </defs>
			
			<path 
				fill="url(#gradient)"
				fill={palettesTier[tier][1]}
d="M512 256c0-37.7-23.7-69.9-57.1-82.4 14.7-32.4 8.8-71.9-17.9-98.6-26.7-26.7-66.2-32.6-98.6-17.9C325.9 23.7 293.7 0 256 0s-69.9 23.7-82.4 57.1c-32.4-14.7-72-8.8-98.6 17.9-26.7 26.7-32.6 66.2-17.9 98.6C23.7 186.1 0 218.3 0 256s23.7 69.9 57.1 82.4c-14.7 32.4-8.8 72 17.9 98.6 26.6 26.6 66.1 32.7 98.6 17.9 12.5 33.3 44.7 57.1 82.4 57.1s69.9-23.7 82.4-57.1c32.6 14.8 72 8.7 98.6-17.9 26.7-26.7 32.6-66.2 17.9-98.6 33.4-12.5 57.1-44.7 57.1-82.4z">
			</path>
				
		</svg>
	</DivContainer>
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

export default connect(mapStateToProps)(BadgeTier);