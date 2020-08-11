import React from 'react';
import styled from 'styled-components';

import shapes from "../../../profile/shapes";
import palettes from "../../../profile/palettes";

import {Div} from '../../../styles/DefaultStyles';


const DivContainer = styled(Div)`
	background-color: ${props => props.colorBack};
	width: ${props => props.width};
	height: ${props => props.height};
	
	border-radius: 5px;
`;


const Icon = ({
	
	shape
	, palette
	
	, width, height
	
}) => {
	
	return (
		
	<DivContainer width={width} height={height} colorBack={palettes[palette]['colorBack']} >
		<svg 
			
			className="icon"
			xmlns="http://www.w3.org/2000/svg" 
			
			width={shapes[shape]['size']}
			height={shapes[shape]['size']}
			viewBox={shapes[shape]['viewBox']}
			>
			
		<path fill={palettes[palette]['colorMain']} 
		d={shapes[shape]['d']} ></path></svg>

	</DivContainer>
	)
}
	
export default Icon;
