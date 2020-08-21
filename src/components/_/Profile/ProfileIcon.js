import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import shapes from "../../../profile/shapes";
import palettes from "../../../profile/palettes";
import Badge from "../../../profile/Badge";

import {Div} from '../../../styles/DefaultStyles';


const ContainerAll = styled(Div)`
	
	width: ${props => props.width};
	height: ${props => props.height};
	
	position: relative;
	
`;

const ContainerMain = styled(Div)`
	background-color: ${props => props.colorBack};
	
	width: 100%;
	height:  100%;
	
	border-radius: 5px;
`;

const ContainerBadge = styled(Div)`
	position: relative;
	width: auto;
	z-index: 10px;
`




const ProfileIcon = ({
	
	shape
	, palette
	, badge
	
	, width, height
	
}) => {
	
	let paletteUsing = {};
	if (palettes[palette]) { paletteUsing = palettes[palette] }
	else { paletteUsing = palettes['Default'] }
	
	let shapeUsing = {};
	if (shapes[shape]) { shapeUsing = shapes[shape] }
	else { shapeUsing = shapes['Default'] }
	
	
	
	/*
		<ContainerBadge>
			<Badge badge={badge} />
		</ContainerBadge>
	*/
	
	return (
		
	<ContainerAll
		width={width} height={height} 
	>
	
	
		<ContainerMain width={width} height={height} colorMain={ paletteUsing['colorMain']} colorBack={ paletteUsing['colorBack'] }  >
			<svg 
				className="icon"
				xmlns="http://www.w3.org/2000/svg" 
				
				width={shapeUsing['size']}
				height={shapeUsing['size']}
				viewBox={shapeUsing['viewBox']}
				>
				
			<path fill={ paletteUsing['colorMain']} 
			d={shapeUsing['d']} ></path></svg>
		</ContainerMain>
		
	</ContainerAll>
	)
}
	
export default ProfileIcon;
