import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import shapes from "../../../profile/shapes";
import palettes from "../../../profile/palettes";
import borders from "../../../profile/borders";

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
	
	let paletteUsing = {};
	if (palettes[palette]) { paletteUsing = palettes[palette] }
	else { paletteUsing = palettes['Default'] }
	
	let shapeUsing = {};
	if (shapes[shape]) { shapeUsing = shapes[shape] }
	else { shapeUsing = shapes['Default'] }
	
	return (
		
		
	<DivContainer width={width} height={height} colorMain={ paletteUsing['colorMain']} colorBack={ paletteUsing['colorBack'] }  >
		<svg 
			
			className="icon"
			xmlns="http://www.w3.org/2000/svg" 
			
			width={shapeUsing['size']}
			height={shapeUsing['size']}
			viewBox={shapeUsing['viewBox']}
			>
			
		<path fill={ paletteUsing['colorMain']} 
		d={shapeUsing['d']} ></path></svg>

	</DivContainer>
	)
}
	
export default Icon;
